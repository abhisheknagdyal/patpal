import { z } from 'zod';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';

import FormBuilder from '@/components/form-components/formBuilder.tsx';
import { GroomerBoarderSchema, User } from '@/utils/types.ts';
import { GroomerBoarderOnBoardFormConfig } from '@/config/forms/groomerBoarderOnBoardFormConfig.ts';
import { boardGroomer } from '@/redux/reducers/groomers/onBoardGroomerReducer.ts';
import { getHomeRoute } from '@/utils/auth/workflow.ts';

const GroomerOnBoardForm = ({ user }: { user: User }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { loading, success, error } = useAppSelector(
		(state) => state.groomers.onBoard
	);

	const onSubmit = (values: z.infer<typeof GroomerBoarderSchema>) => {
		dispatch(
			boardGroomer({
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
				config={GroomerBoarderOnBoardFormConfig}
				schema={GroomerBoarderSchema}
				onSubmitForm={onSubmit}
				isLoading={loading}
			/>
			{!loading && error && (
				<span className="text-red-500 text-[10px]">{error}</span>
			)}
		</div>
	);
};

export default GroomerOnBoardForm;
