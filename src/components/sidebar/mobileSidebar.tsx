import { useNavigate } from 'react-router-dom';

import { Role, routesConfig } from '@/config/routesConfig.tsx';
import { Button } from '@/components/ui/button.tsx';
import { LogOut } from 'lucide-react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet.tsx';
import { ROUTES } from '@/constants/routes.ts';

const MobileSidebar = ({ userRole }: { userRole: Role }) => {
	const navigate = useNavigate();
	return (
		<Sheet>
			<SheetTrigger>
				<img className="h-12 w-12" src="/Logo-short.gif" alt="logo" />
			</SheetTrigger>
			<SheetContent side="left" className="md:w-[400px] w-[70vw] h-full">
				<SheetHeader>
					<SheetTitle>Menu</SheetTitle>
					<SheetDescription className="flex flex-col gap-20">
						<div className="flex flex-col">
							{routesConfig
								.filter(
									({ role, nonHeader }) => role.includes(userRole) && !nonHeader
								)
								.map((route) => (
									<Button
										key={route.path}
										variant="ghost"
										className="justify-start"
										onClick={() => navigate(route.path)}
									>
										{route.icon}
										{route.title}
									</Button>
								))}
						</div>
						<Button variant="secondary" onClick={() => navigate(ROUTES.AUTH)}>
							<LogOut /> Logout
						</Button>
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default MobileSidebar;
