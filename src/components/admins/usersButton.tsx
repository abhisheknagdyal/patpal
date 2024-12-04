import { z } from 'zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { UserPlus } from 'lucide-react';

import FormModal from '@/components/form-components/formModal.tsx';

import { UsersFormConfig } from '@/config/forms/usersFormConfig.ts';
import { RegisterUserSchema } from '@/utils/types.ts';
import { registerUser } from '@/redux/reducers/admin/registerNewUserReducer.ts';
import { Refresh } from '@/pages/admins/adminPage.tsx';

const UsersButton = ({
	setParentRefresh,
}: {
	setParentRefresh: Dispatch<SetStateAction<Refresh>>;
}) => {
	const [open, setOpen] = useState(false);

	const dispatch = useAppDispatch();
	const { loading } = useAppSelector(
		(state) => state.admin.monitoredUsersRegister
	);

	const onSubmit = (values: z.infer<typeof RegisterUserSchema>) => {
		const newBody = {
			email: values.email,
			username: values.username,
			isAdmin: values.role === 'isAdmin',
			isPersonnelBoarder: values.role === 'isPersonnelBoarder',
			isPersonnelGroomer: values.role === 'isPersonnelGroomer',
			isPersonnelTransporter: values.role === 'isPersonnelTransporter',
		};
		dispatch(registerUser(newBody)).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setOpen(false);
				setParentRefresh((prevState) => ({
					...prevState,
					user: !prevState.user,
				}));
			}
		});
	};

	return (
		<FormModal
			headerTitle="Add a New User"
			buttonTitle="Add a New User"
			desc="Use this form to enter the details of a new user. Click 'Save' when you’re finished."
			config={UsersFormConfig}
			schema={RegisterUserSchema}
			onSubmit={onSubmit}
			Icon={UserPlus}
			isLoading={loading}
			open={open}
			setOpen={setOpen}
		/>
	);
};

export default UsersButton;
