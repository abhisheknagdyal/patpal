import { Route, Routes } from 'react-router-dom';

import ProtectedRoutes from './components/guards/protectedRoutes.tsx';
import AuthLayout from './pages/auth/authLayout';
import Workflow from '@/pages/auth/workflow.tsx';
import AppLayout from './pages/layout';
import SubRouteGuard from './components/guards/subRouteGuard.tsx';
import { Toaster } from './components/ui/sonner';
import NotFound from '@/pages/notFound/notFound.tsx';

import { useUser } from '@/hooks/useUser.ts';

import { routesConfig } from './config/routesConfig.tsx';
import { ROUTES } from './constants/routes';

const App = () => {
	const { userRole } = useUser();
	return (
		<div>
			<Toaster />
			<Routes>
				<Route path={ROUTES.AUTH} element={<AuthLayout />} />
				<Route path={ROUTES.WORKFLOW} element={<Workflow />} />
				<Route element={<ProtectedRoutes />}>
					{userRole && (
						<Route
							path={ROUTES.HOME}
							element={<AppLayout userRole={userRole} />}
						>
							{routesConfig
								.filter(({ role }) => role.includes(userRole))
								.map(({ path, element, requiredSubscription }) => (
									<Route
										key={path}
										path={path}
										element={
											<SubRouteGuard
												requiredSubscription={requiredSubscription}
											>
												{element}
											</SubRouteGuard>
										}
									/>
								))}
						</Route>
					)}
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</div>
	);
};

export default App;
