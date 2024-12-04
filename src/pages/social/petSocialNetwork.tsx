import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { getUsers } from '@/redux/reducers/social/fetchAllUsersReducer.ts';

import MatchCard from '@/components/social/matchCard.tsx';
import { ROUTES } from '@/constants/routes.ts';
import { MessageCircleMore } from 'lucide-react';
import MatchCardSkeleton from '@/components/skeletons/matchCardSkeleton.tsx';

const PetSocialNetwork = () => {
	const [skip, setSkip] = useState(0);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { users, loading, loaded } = useAppSelector(
		(state) => state.social.getUsers
	);

	useEffect(() => {
		dispatch(getUsers({ skip }));
	}, [dispatch, skip]);

	useEffect(() => {
		if (users.count > 10 && users.results.length < 3 && loaded) {
			setSkip((prevState) => prevState + 10);
		}
	}, [loaded, users.count, users.results.length]);

	return (
		<div className="w-full h-[88vh] relative p-4 flex items-center justify-center">
			<div
				className="absolute bottom-6 right-6"
				onClick={() => navigate(ROUTES.SOCIAL_NETWORK.myChats)}
			>
				<MessageCircleMore size={35} fill="green" />
			</div>
			{loading ? (
				<MatchCardSkeleton />
			) : users.results.length === 0 ? (
				<div className="text-center text-gray-500">
					<p>No users found in the network.</p>
					<p>Check back later!</p>
				</div>
			) : (
				<MatchCard usersData={users} />
			)}
		</div>
	);
};

export default PetSocialNetwork;
