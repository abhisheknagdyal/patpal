import { Stethoscope } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { z } from 'zod';
import { DoctorSchema } from '@/utils/types.ts';
import FormModal from '@/components/form-components/formModal.tsx';
import { DoctorsFormConfig } from '@/config/forms/doctorFormConfig.ts';
import { createDoctor } from '@/redux/reducers/doctors/createDoctorReducer.ts';
import { Refresh } from '@/pages/admins/adminPage.tsx';

const AddDoctorsButton = ({
	setParentRefresh,
}: {
	setParentRefresh: Dispatch<SetStateAction<Refresh>>;
}) => {
	const [open, setOpen] = useState(false);

	const dispatch = useAppDispatch();
	const { loading } = useAppSelector((state) => state.doctors.createDoctor);

	const onSubmit = (values: z.infer<typeof DoctorSchema>) => {
		dispatch(createDoctor(values)).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setOpen(false);
				setParentRefresh((prevState) => ({
					...prevState,
					doctors: !prevState.doctors,
				}));
			}
		});
	};

	return (
		<FormModal
			headerTitle="Add a Doctor"
			buttonTitle="Add a Doctor"
			desc="Use this form to enter the details of a new Product. Click 'Save' when you’re finished."
			config={DoctorsFormConfig}
			schema={DoctorSchema}
			onSubmit={onSubmit}
			Icon={Stethoscope}
			isLoading={loading}
			open={open}
			setOpen={setOpen}
		/>
	);
};

export default AddDoctorsButton;
