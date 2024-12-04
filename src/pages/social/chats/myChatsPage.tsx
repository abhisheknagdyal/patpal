import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { getMyMatches } from '@/redux/reducers/social/fetchMyMatches.ts';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card.tsx';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { CheckCheck } from 'lucide-react';
import { extractTimeFromDateString } from '@/utils/time.ts';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes.ts';
import { useUser } from '@/hooks/useUser.ts';
import Spinner from '@/components/spinner.tsx';
import { getMyBreedingMatches } from '@/redux/reducers/social/fetchMyBreedingMatches.ts';
import { Separator } from '@/components/ui/separator.tsx';

const MyChatsPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { user: self } = useUser();
	const { matches, loading } = useAppSelector(
		(state) => state.social.getMatches
	);
	const { matches: breedingMatches, loading: breedingLoading } = useAppSelector(
		(state) => state.social.getBreedingMatches
	);

	useEffect(() => {
		dispatch(getMyMatches());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getMyBreedingMatches());
	}, [dispatch]);

	return (
		<div className="h-[88vh] py-4">
			<Card className="max-w-3xl w-full mx-auto rounded-2xl flex flex-col h-full border-black">
				<CardHeader className="rounded-2xl">
					<h1 className="text-3xl font-semibold">My Chats</h1>
				</CardHeader>
				<CardContent className="flex-1 p-4 flex flex-col gap-3 overflow-scroll">
					{!breedingLoading &&
						!breedingMatches.length &&
						!loading &&
						!matches.length && (
							<div className="flex w-full justify-center text-gray-500 text-sm">
								No matches found, start exploring!
							</div>
						)}
					{!breedingLoading &&
						breedingMatches.map((user) => (
							<div
								key={user._id}
								className="bg-gray-900 w-full p-4 flex items-center justify-between rounded-2xl cursor-pointer hover:bg-gray-800"
								onClick={() =>
									navigate(ROUTES.SOCIAL_NETWORK.getSingleChat(user._id))
								}
							>
								<div className="flex items-center gap-5">
									<Avatar>
										<AvatarImage
											className="h-14 w-14 rounded-full cursor-pointer"
											src={user.details?.photo_url}
											alt="@shadcn"
										/>
										<AvatarFallback className="h-10 w-10 rounded-full cursor-pointer">
											{`${user.username?.[0]}${user.username?.[user.username?.length - 1]}`.toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<span className="text-2xl">{user.details?.name}</span>
										<span className="text-gray-500 flex items-center gap-1">
											{user.latestMessageSenderId === self?.id && (
												<CheckCheck size={12} />
											)}
											{user.latestMessage}
										</span>
									</div>
								</div>
								<div className="text-sm">
									{user.messageDate
										? extractTimeFromDateString(user.messageDate)
										: null}
								</div>
							</div>
						))}
					{!!breedingMatches.length && <Separator />}
					{loading && (
						<div className="w-full h-full flex justify-center items-center">
							<Spinner />
						</div>
					)}
					{!loading &&
						matches.map((user) => (
							<div
								key={user._id}
								className="bg-gray-900 w-full p-4 flex items-center justify-between rounded-2xl cursor-pointer hover:bg-gray-800"
								onClick={() =>
									navigate(ROUTES.SOCIAL_NETWORK.getSingleChat(user._id))
								}
							>
								<div className="flex items-center gap-5">
									<Avatar>
										<AvatarImage
											className="h-14 w-14 rounded-full cursor-pointer"
											src={user.details?.photo_url}
											alt="@shadcn"
										/>
										<AvatarFallback className="h-10 w-10 rounded-full cursor-pointer">
											{`${user.username?.[0]}${user.username?.[user.username?.length - 1]}`.toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<span className="text-2xl">{user.details?.name}</span>
										<span className="text-gray-500 flex items-center gap-1">
											{user.latestMessageSenderId === self?.id && (
												<CheckCheck size={12} />
											)}
											{user.latestMessage}
										</span>
									</div>
								</div>
								<div className="text-sm">
									{user.messageDate
										? extractTimeFromDateString(user.messageDate)
										: null}
								</div>
							</div>
						))}
				</CardContent>
				<CardFooter className="p-4"></CardFooter>
			</Card>
		</div>
	);
};

export default MyChatsPage;
