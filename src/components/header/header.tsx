import { Heart, ShoppingBag } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button.tsx';

import { ROUTES } from '@/constants/routes.ts';
import { useUser } from '@/hooks/useUser.ts';
import { Role, routesConfig } from '@/config/routesConfig.tsx';
import ProfileMenu from '@/components/header/profileMenu.tsx';

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { userRole } = useUser();

	if (location.pathname === ROUTES.ONBOARDING) return null;

	const handleClick = (path: string) => {
		navigate(path);
	};

	return (
		<div className="xl:flex justify-between items-center py-2 px-8 h-[12vh] hidden w-full">
			<div className="w-44">
				<img
					className="h-16 w-16"
					src="/Logo-short.gif"
					alt="logo"
					onClick={() => handleClick(ROUTES.HOME)}
				/>
			</div>
			<div>
				{routesConfig
					.filter((it) => it.role.includes(userRole as Role) && !it.nonHeader)
					.map((it) => (
						<Button
							key={it.path}
							variant="ghost"
							onClick={() => handleClick(it.path)}
						>
							{it.title}
						</Button>
					))}
			</div>
			<div className="flex items-center justify-center space-x-6 h-[8vh] w-44">
				<ProfileMenu />
				{userRole !== 'admin' && (
					<>
						<Heart
							fill={location.pathname === ROUTES.STORE.wishlist ? 'red' : ''}
							stroke={
								location.pathname === ROUTES.STORE.wishlist ? 'red' : 'white'
							}
							className="cursor-pointer"
							onClick={() => handleClick(ROUTES.STORE.wishlist)}
						/>
						<ShoppingBag
							className="cursor-pointer"
							onClick={() => handleClick(ROUTES.STORE.cart)}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default Header;
