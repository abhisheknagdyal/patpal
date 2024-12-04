import { useState } from 'react';
import { z } from 'zod';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { UserOnBoardFormConfig } from '@/config/forms/userBoardingFormCOnfig.ts';
import { UserBoardSchema } from '@/utils/types.ts';
import { updateUser } from '@/redux/reducers/users/updateUserReducer.ts';

import FormModal from '@/components/form-components/formModal.tsx';

const EditUserButton = ({ defaultValues }: { defaultValues: any }) => {
	const [open, setOpen] = useState(false);

	const dispatch = useAppDispatch();
	const { loading } = useAppSelector((state) => state.users.update);

	const onSubmit = (values: z.infer<typeof UserBoardSchema>) => {
		dispatch(updateUser(values)).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setOpen(false);
			}
		});
	};

	return (
		<FormModal
			headerTitle="Update your details"
			buttonTitle="Edit Profile"
			desc="Use this form to update your details. Click 'Save' when you’re finished."
			config={UserOnBoardFormConfig}
			schema={UserBoardSchema}
			onSubmit={onSubmit}
			isLoading={loading}
			open={open}
			setOpen={setOpen}
			defaultValues={defaultValues}
		/>
	);
};

export default EditUserButton;
