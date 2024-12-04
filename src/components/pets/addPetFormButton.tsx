import { z } from 'zod';
import { useState, type Dispatch, SetStateAction } from 'react';

import { PetsFormConfig } from '@/config/forms/petsFormConfig.ts';
import { PetSchema } from '@/utils/types.ts';
import { PawPrint } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';

import FormModal from '@/components/form-components/formModal.tsx';
import { createMyPet } from '@/redux/reducers/pets/createMyPetReducer.ts';

const AddPetFormButton = ({
	setRefresh,
}: {
	setRefresh?: Dispatch<SetStateAction<boolean>>;
}) => {
	const { loading } = useAppSelector((state) => state.pets.createMyPet);
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);
	const onSubmit = (values: z.infer<typeof PetSchema>) => {
		const newBody = {
			...values,
			photo_url: values.photo_url[0]?.data,
		};
		dispatch(createMyPet(newBody)).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setOpen(false);
				if (setRefresh) setRefresh((prevState) => !prevState);
			}
		});
	};

	return (
		<FormModal
			headerTitle="Add a New Pet"
			buttonTitle="Register your Pet"
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
export default AddPetFormButton;
