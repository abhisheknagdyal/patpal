import { Outlet } from 'react-router-dom';

import Header from '@/components/header/header';
import { Role } from '@/config/routesConfig.tsx';
import MobileHeader from '@/components/header/mobileHeader.tsx';

const AppLayout = ({ userRole }: { userRole: Role }) => {
	return (
		<div className="min-h-dvh relative">
			<Header />
			<MobileHeader userRole={userRole} />
			<Outlet />
		</div>
	);
};

export default AppLayout;
