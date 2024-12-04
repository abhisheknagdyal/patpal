import { PetSchema } from '@/utils/types.ts';
import FormModal from '@/components/form-components/formModal.tsx';
import { type Dispatch, SetStateAction, useState } from 'react';
import { Pencil } from 'lucide-react';
import { PetsFormConfig } from '@/config/forms/petsFormConfig.ts';
import { z } from 'zod';
import { useAppDispatch } from '@/hooks/reduxHooks.ts';
import { updateMyPet } from '@/redux/reducers/pets/updateMyPetReducer.ts';
import { isEmpty, omit } from '@/utils/lodash.ts';

type TypePetSchema = z.infer<typeof PetSchema> & { _id?: string };

type Props = {
	defaultValues: TypePetSchema;
	setRefresh?: Dispatch<SetStateAction<boolean>>;
};

const EditPetButton = ({ defaultValues, setRefresh }: Props) => {
	const [open, setOpen] = useState(false);

	const dispatch = useAppDispatch();
	const onFormSubmit = (values: TypePetSchema) => {
		let petData;
		if (isEmpty(values.photo_url)) {
			petData = omit<TypePetSchema>(values, ['photo_url']);
		} else {
			petData = {
				...values,
				photo_url: values.photo_url[0].data,
			};
		}
		dispatch(updateMyPet({ petData, id: defaultValues._id! })).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setOpen(false);
				if (setRefresh) setRefresh((prevState) => !prevState);
			}
		});
	};

	const { last_checkup_date, ...rest } = defaultValues;
	const formattedDefault = {
		...rest,
		...(last_checkup_date
			? { last_checkup_date: new Date(last_checkup_date!) }
			: {}),
	};

	return (
		<>
			<FormModal
				headerTitle="edit your pet"
				buttonTitle=""
				desc="you can edit your pet here"
				config={PetsFormConfig}
				schema={PetSchema}
				onSubmit={onFormSubmit}
				isLoading={false}
				open={open}
				setOpen={setOpen}
				variant="secondary"
				Icon={Pencil}
				defaultValues={formattedDefault}
			/>
		</>
	);
};

export default EditPetButton;
