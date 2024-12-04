import { z } from 'zod';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';

import FormBuilder from '@/components/form-components/formBuilder.tsx';
import { UserBoardSchema, User } from '@/utils/types.ts';
import { getHomeRoute } from '@/utils/auth/workflow.ts';
import { boardUser } from '@/redux/reducers/users/onBoardUserReducer.ts';
import { UserOnBoardFormConfig } from '@/config/forms/userBoardingFormCOnfig.ts';

const UserOnBoardForm = ({ user }: { user: User }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { loading, success, error } = useAppSelector(
		(state) => state.users.onBoard
	);

	const onSubmit = (values: z.infer<typeof UserBoardSchema>) => {
		dispatch(
			boardUser({
				body: values,
			})
		);
	};

	useEffect(() => {
		if (success) navigate(getHomeRoute(user), { replace: true });
	}, [navigate, success, user]);

	return (
		<div>
			<FormBuilder
				config={UserOnBoardFormConfig}
				schema={UserBoardSchema}
				onSubmitForm={onSubmit}
				isLoading={loading}
			/>
			{!loading && error && (
				<span className="text-red-500 text-[10px]">{error}</span>
			)}
		</div>
	);
};

export default UserOnBoardForm;
