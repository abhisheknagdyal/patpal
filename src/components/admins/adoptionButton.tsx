import { PetsFormConfig } from '@/config/forms/petsFormConfig.ts';
import { PetSchema } from '@/utils/types.ts';
import { PawPrint } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';

import FormModal from '@/components/form-components/formModal.tsx';
import { createAdoption } from '@/redux/reducers/pets/createAdoptionReducer.ts';
import { Dispatch, SetStateAction, useState } from 'react';
import { z } from 'zod';
import { Refresh } from '@/pages/admins/adminPage.tsx';

const AdoptionButton = ({
	setParentRefresh,
}: {
	setParentRefresh: Dispatch<SetStateAction<Refresh>>;
}) => {
	const [open, setOpen] = useState(false);

	const dispatch = useAppDispatch();
	const { loading } = useAppSelector((state) => state.pets.createAdoption);

	const onSubmit = (values: z.infer<typeof PetSchema>) => {
		dispatch(createAdoption(values)).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setOpen(false);
				setParentRefresh((prevState) => ({
					...prevState,
					adoption: !prevState.adoption,
				}));
			}
		});
	};

	return (
		<FormModal
			headerTitle="Add a Pet for Adoption"
			buttonTitle="Add a Pet for Adoption"
			desc="Use this form to enter the details of your new pet. Click 'Save' when you’re finished."
			config={PetsFormConfig}
			schema={PetSchema}
			onSubmit={onSubmit}
			Icon={PawPrint}
			isLoading={loading}
			open={open}
			setOpen={setOpen}
		/>
	);
};

export default AdoptionButton;
