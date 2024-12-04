import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';

import { TransporterSchema, User } from '@/utils/types.ts';
import { getHomeRoute } from '@/utils/auth/workflow.ts';

import FormBuilder from '@/components/form-components/formBuilder.tsx';

import { boardTransporter } from '@/redux/reducers/transport/onBoardTransportersReducers.ts';

import { TransporterOnBoardFormConfig } from '@/config/forms/transporterOnBoardFormConfig.ts';

const TransporterOnBoardForm = ({ user }: { user: User }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { loading, success, error } = useAppSelector(
		(state) => state.transport.onBoard
	);

	const onSubmit = (values: z.infer<typeof TransporterSchema>) => {
		dispatch(
			boardTransporter({
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
				config={TransporterOnBoardFormConfig}
				schema={TransporterSchema}
				onSubmitForm={onSubmit}
				isLoading={loading}
			/>
			{!loading && error && (
				<span className="text-red-500 text-[10px]">{error}</span>
			)}
		</div>
	);
};

export default TransporterOnBoardForm;
