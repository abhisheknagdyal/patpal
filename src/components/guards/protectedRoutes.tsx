import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '@/redux/store.ts';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';

import { validateSession } from '@/utils/auth/workflow.ts';
import { getConfig } from '@/redux/reducers/configReducer.ts';
import { ROUTES } from '@/constants/routes.ts';
import Spinner from '@/components/spinner.tsx';

const getState = (selector: TypedUseSelectorHook<RootState>) => {
	const { login, config } = selector((state) => state.auth);
	return {
		isAuthenticated: login.isAuthenticated,
		loadingConfig: config.loading,
		configUpdated: config.configUpdated,
	};
};

const ProtectedRoutes = () => {
	const [autoLoginCheck, setAutoLoginCheck] = useState(false);
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const { isAuthenticated, loadingConfig, configUpdated } =
		getState(useAppSelector);

	useEffect(() => {
		validateSession(dispatch).then(() => setAutoLoginCheck(true));
	}, [dispatch, setAutoLoginCheck]);

	useEffect(() => {
		if (isAuthenticated) dispatch(getConfig());
	}, [dispatch, isAuthenticated]);

	useEffect(() => {
		if (
			autoLoginCheck &&
			!isAuthenticated &&
			![ROUTES.AUTH].includes(location.pathname)
		) {
			navigate(ROUTES.AUTH, {
				replace: true,
				state: { from: location },
			});
		}
	}, [location, isAuthenticated, autoLoginCheck, navigate]);

	if (loadingConfig)
		return (
			<div className="h-dvh flex items-center justify-center">
				<Spinner />
			</div>
		);

	return isAuthenticated && configUpdated ? <Outlet /> : null;
};

export default ProtectedRoutes;
