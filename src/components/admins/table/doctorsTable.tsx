import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { z } from 'zod';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import useUrlDispatch from '@/hooks/useUrlDispatch.ts';

import TableLayout from '@/components/admins/table/tableLayout.tsx';
import Paginator from '@/components/paginator/paginator.tsx';
import GenericEditForm from '@/components/admins/genericEditForm.tsx';
import Spinner from '@/components/spinner.tsx';

import { updateDoctor } from '@/redux/reducers/doctors/editDoctorsReducer.ts';
import { getDoctors } from '@/redux/reducers/doctors/fetchDoctorsReducer.ts';
import { deleteDoctor } from '@/redux/reducers/doctors/deleteDoctorReducer.ts';

import doctorsTableConfig from '@/config/tables/doctorsTableConfig.ts';
import { DoctorsFormConfig } from '@/config/forms/doctorFormConfig.ts';
import { DoctorSchema } from '@/utils/types.ts';
import { PAGINATION_CHANGED } from '@/hooks/urlReducer.ts';
import { isEmpty } from '@/utils/lodash.ts';
import { convertToTimeHHMM } from '@/utils/time.ts';
import { Refresh } from '@/pages/admins/adminPage.tsx';

const getFormattedDefaultValues = (defaultValues: any) => {
	if (!defaultValues) return;
	const { availability, ...rest } = defaultValues;
	return {
		...rest,
		availability: {
			...availability,
			timeSlots: {
				from: convertToTimeHHMM(availability.timeSlots[0]),
				to: convertToTimeHHMM(availability.timeSlots[1]),
			},
		},
	};
};

const DoctorsTable = ({
	parentRefresh,
}: {
	parentRefresh: Refresh['doctors'];
}) => {
	const appDispatch = useAppDispatch();
	const [showModal, setShowModal] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [editId, setEditId] = useState('');
	const { dispatch } = useUrlDispatch({ replace: true });
	const query = queryString.parse(location.search);

	const { loading, doctors } = useAppSelector(
		(state) => state.doctors.fetchDoctors
	);
	const { loading: editDoctorLoading } = useAppSelector(
		(state) => state.doctors.editDoctor
	);
	const { loading: deletingDoctor, idInState } = useAppSelector(
		(state) => state.doctors.deleteDoctor
	);

	const showCaption = !loading && doctors.count < 10;

	const setPagination = (pagination: number) => {
		dispatch({
			type: PAGINATION_CHANGED,
			payload: {
				skip: pagination,
				customField: 'doctorsSkip',
			},
		});
	};

	const onSubmitEdit = (values: z.infer<typeof DoctorSchema>) => {
		appDispatch(updateDoctor({ body: values, id: editId })).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setShowModal(false);
				setRefresh((prevState) => !prevState);
			}
		});
	};

	const onDelete = (id: string) => {
		appDispatch(deleteDoctor(id)).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setRefresh((prevState) => !prevState);
			}
		});
	};

	const onEditClicked = (id: string) => {
		setEditId(id);
		setShowModal(true);
	};

	useEffect(() => {
		appDispatch(getDoctors({ skip: Number(query.doctorsSkip) || 0 }));
	}, [appDispatch, query.doctorsSkip, refresh, parentRefresh]);

	return (
		<div className="w-full">
			<TableLayout
				title="Doctors"
				tableCaption="A list of all doctors registered on app."
				tableConfig={doctorsTableConfig}
				data={doctors.results}
				loading={loading}
				showTableCaption={showCaption}
				hasEdit
				onEdit={onEditClicked}
				hasDelete
				onDelete={onDelete}
				deleteLoading={deletingDoctor}
				deleteStateId={idInState}
			/>
			{loading && isEmpty(doctors.results) && (
				<div className="w-full flex justify-center items-center mt-5">
					<Spinner />
				</div>
			)}
			<Paginator
				count={doctors.count}
				skip={Number(query.doctorsSkip) || 0}
				setPagination={setPagination}
			/>
			<GenericEditForm
				open={showModal}
				setOpen={setShowModal}
				config={DoctorsFormConfig}
				schema={DoctorSchema}
				headerTitle={`Edit Doctor - ${
					(doctors.results.find((it) => (it as any)._id === editId) as any)
						?.name
				}`}
				desc={
					"Use this form to edit the details of this registered doctor. Click 'Submit' when you’re finished."
				}
				onSubmit={onSubmitEdit}
				loading={editDoctorLoading}
				defaultValues={getFormattedDefaultValues(
					doctors.results.find((it) => (it as any)._id === editId)
				)}
			/>
		</div>
	);
};

export default DoctorsTable;
