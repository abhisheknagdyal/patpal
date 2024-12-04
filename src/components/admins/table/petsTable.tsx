import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';

import TableLayout from '@/components/admins/table/tableLayout.tsx';
import Spinner from '@/components/spinner.tsx';
import Paginator from '@/components/paginator/paginator.tsx';
import GenericEditForm from '@/components/admins/genericEditForm.tsx';

import useUrlDispatch from '@/hooks/useUrlDispatch.ts';
import petsTableConfig from '@/config/tables/petsTableConfig.ts';
import { getAdoptionPets } from '@/redux/reducers/admin/adoptionPetsReducer.ts';
import { PAGINATION_CHANGED } from '@/hooks/urlReducer.ts';
import { isEmpty } from '@/utils/lodash.ts';
import { z } from 'zod';

import { PetsFormConfig } from '@/config/forms/petsFormConfig.ts';
import { PetSchema } from '@/utils/types.ts';
import { updateAdoption } from '@/redux/reducers/pets/editAdoptionPetReducer.ts';
import { deleteAdoption } from '@/redux/reducers/pets/deleteAdoptionPetReducer.ts';
import { Refresh } from '@/pages/admins/adminPage.tsx';

const getFormattedDefaultValues = (defaultValues: any) => {
	if (!defaultValues) return;
	const { last_checkup_date, ...rest } = defaultValues;
	return {
		...rest,
		...(last_checkup_date
			? { last_checkup_date: new Date(last_checkup_date!) }
			: {}),
	};
};

const PetsTable = ({
	parentRefresh,
}: {
	parentRefresh: Refresh['adoption'];
}) => {
	const appDispatch = useAppDispatch();
	const [showModal, setShowModal] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [editId, setEditId] = useState('');
	const { dispatch } = useUrlDispatch({ replace: true });
	const query = queryString.parse(location.search);
	const { loading, adoptions } = useAppSelector(
		(state) => state.admin.adoptablePets
	);
	const { loading: editPetLoading } = useAppSelector(
		(state) => state.pets.editAdoption
	);
	const { loading: deletingPet, idInState } = useAppSelector(
		(state) => state.pets.deleteAdoption
	);
	const showCaption = !loading && adoptions.count < 10;

	const setPagination = (pagination: number) => {
		dispatch({
			type: PAGINATION_CHANGED,
			payload: {
				skip: pagination,
				customField: 'petsSkip',
			},
		});
	};

	const onEditClicked = (id: string) => {
		setEditId(id);
		setShowModal(true);
	};

	const onSubmitEdit = (values: z.infer<typeof PetSchema>) => {
		appDispatch(updateAdoption({ petData: values, id: editId })).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setShowModal(false);
				setRefresh((prevState) => !prevState);
			}
		});
	};

	const onDelete = (id: string) => {
		appDispatch(deleteAdoption(id)).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setRefresh((prevState) => !prevState);
			}
		});
	};

	useEffect(() => {
		appDispatch(getAdoptionPets({ skip: Number(query.petsSkip) || 0 }));
	}, [appDispatch, query.petsSkip, refresh, parentRefresh]);

	return (
		<div className="w-full">
			<TableLayout
				title="Pets"
				tableCaption="A list of all pets available for adoption."
				tableConfig={petsTableConfig}
				data={adoptions.results}
				loading={loading}
				showTableCaption={showCaption}
				hasEdit
				onEdit={onEditClicked}
				hasDelete
				onDelete={onDelete}
				deleteLoading={deletingPet}
				deleteStateId={idInState}
			/>
			{loading && isEmpty(adoptions.results) && (
				<div className="w-full flex justify-center items-center mt-5">
					<Spinner />
				</div>
			)}
			<Paginator
				count={adoptions.count}
				skip={Number(query.petsSkip) || 0}
				setPagination={setPagination}
			/>
			<GenericEditForm
				open={showModal}
				setOpen={setShowModal}
				onSubmit={onSubmitEdit}
				loading={editPetLoading}
				defaultValues={getFormattedDefaultValues(
					adoptions.results.find((it) => (it as any)._id === editId)
				)}
				headerTitle={`Edit Pet - ${
					(adoptions.results.find((it) => (it as any)._id === editId) as any)
						?.name
				}`}
				config={PetsFormConfig}
				schema={PetSchema}
				desc={
					"Use this form to edit the details of a your Adoption. Click 'Submit' when you’re finished."
				}
			/>
		</div>
	);
};

export default PetsTable;
