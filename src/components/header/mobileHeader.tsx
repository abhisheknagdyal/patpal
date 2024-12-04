import MobileSidebar from '@/components/sidebar/mobileSidebar.tsx';
import ProfileMenu from '@/components/header/profileMenu.tsx';
import { Role } from '@/config/routesConfig.tsx';

const MobileHeader = ({ userRole }: { userRole: Role }) => {
	return (
		<div className="w-screen h-fit flex justify-between items-center sticky left-0 right-0 px-4 py-2 top-0 xl:hidden z-50">
			<MobileSidebar userRole={userRole} />
			<ProfileMenu />
		</div>
	);
};

export default MobileHeader;
