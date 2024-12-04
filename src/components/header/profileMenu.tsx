import { Cat, LogOut, Package, User, UserRoundPen } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar.tsx';
import { ROUTES } from '@/constants/routes.ts';
import { useUser } from '@/hooks/useUser.ts';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
	const navigate = useNavigate();
	const { user, username, userRole, userSubscription } = useUser();

	const handleClick = (path: string) => {
		navigate(path);
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar>
					<AvatarImage
						className="h-10 w-10 rounded-full cursor-pointer"
						src={user?.details?.photo_url}
						alt="@shadcn"
					/>
					<AvatarFallback className="h-10 w-10 rounded-full cursor-pointer">
						{`${username?.[0]}${username?.[username?.length - 1]}`.toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-44 mt-2">
				<DropdownMenuGroup>
					{userRole !== 'admin' && (
						<>
							<DropdownMenuItem onClick={() => handleClick(ROUTES.PROFILE)}>
								<User />
								My Profile
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => handleClick(ROUTES.STORE.myOrders)}
							>
								<Package />
								My Orders
							</DropdownMenuItem>
							{userRole === 'user' && (
								<>
									<DropdownMenuItem
										onClick={() => handleClick(ROUTES.MY_PETS.index)}
									>
										<Cat />
										My Pets
									</DropdownMenuItem>
									{(userSubscription === 'plus' ||
										userSubscription === 'gold') && (
										<DropdownMenuItem
											onClick={() => handleClick(ROUTES.MY_REQUESTS)}
										>
											<UserRoundPen />
											My Requests
										</DropdownMenuItem>
									)}
								</>
							)}
							{['groomer', 'boarder', 'transporter'].includes(userRole!) && (
								<DropdownMenuItem
									onClick={() => handleClick(ROUTES.MY_REQUESTS)}
								>
									<UserRoundPen />
									Requests
								</DropdownMenuItem>
							)}
						</>
					)}
					<DropdownMenuItem onClick={() => handleClick(ROUTES.AUTH)}>
						<LogOut /> Log out
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileMenu;
