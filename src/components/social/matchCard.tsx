import { useEffect, useRef, useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { SocialUser } from '@/utils/types.ts';
import { useAppDispatch } from '@/hooks/reduxHooks.ts';
import { likeUser } from '@/redux/reducers/social/likeUserReducer.ts';
import { unlikeUser } from '@/redux/reducers/social/unlikeUserReducer.ts';
import { useNavigate } from 'react-router-dom';
import { likeUnlikeUserLocal } from '@/redux/reducers/social/fetchAllUsersReducer.ts';

type Props = {
	usersData: { count: number; results: SocialUser[] };
};

const MatchCard = ({ usersData }: Props) => {
	const [showMessage, setShowMessage] = useState('');
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'instant' });
	}, []);

	const handleAction = (action: 'liked' | 'rejected') => {
		setShowMessage(action === 'liked' ? 'You liked!' : 'You rejected!');
		const currentUser = usersData.results[0];

		if (action === 'liked') {
			dispatch(
				likeUser({
					id: currentUser._id,
					name: currentUser.details.name,
					navigate,
				})
			);
		} else {
			dispatch(unlikeUser(currentUser._id));
		}
		dispatch(likeUnlikeUserLocal(currentUser._id));

		setTimeout(() => {
			setShowMessage('');
		}, 500);
	};

	return (
		<>
			<div className="relative w-full xl:w-1/2 rounded-3xl mb-10">
				<div className="xl:h-[75vh] h-[50vh] snap-y snap-mandatory overflow-y-scroll rounded-3xl">
					{showMessage ? (
						<div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 rounded-3xl">
							<div className="text-center">
								<h2 className="text-6xl font-bold text-white drop-shadow-md animate-pulse">
									{showMessage}
								</h2>
								<div className="text-white mt-4 text-xl italic opacity-75">
									{showMessage === 'You liked!'
										? 'Great choice! Moving to the next match.'
										: 'Maybe next time!'}
								</div>
								<div className="mt-8 justify-self-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-4 w-20 h-20 flex justify-center items-center">
									{showMessage === 'You liked!' ? (
										<Check className="text-white" size={40} />
									) : (
										<Plus className="text-white rotate-45" size={40} />
									)}
								</div>
							</div>
						</div>
					) : (
						<>
							<div
								ref={scrollRef}
								className="xl:h-[75vh] h-[50vh] relative bg-gradient-to-r from-zinc-900 via-black to-zinc-900 snap-start flex"
							>
								<div className="md:w-1/2 w-full">
									<img
										src={usersData.results[0]?.details?.photo_url}
										alt="dp"
										className="object-cover h-full"
									/>
								</div>
								<div className="md:w-1/2 absolute md:static inset-0 right-0 bottom-0 w-1/2 flex items-center">
									<div className="pl-10 text-3xl font-bold text-white break-words">
										<div>{usersData.results[0]?.details?.name}</div>
									</div>
								</div>
							</div>
							{usersData.results[0]?.pets?.map((pet) => (
								<div
									key={pet._id}
									className={`xl:h-[75vh] h-[50vh] relative bg-gradient-to-r from-zinc-900 via-black to-zinc-900 snap-start flex items-center justify-between`}
								>
									<div className="md:w-1/2 w-full h-full overflow-hidden">
										<img
											src={pet.photo_url}
											alt={pet.name}
											className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
										/>
									</div>
									<div className="w-1/2 absolute md:static inset-0 max-md:bg-zinc-800/50 pl-8 flex flex-col justify-center text-white">
										<h3 className="text-3xl font-bold tracking-wide mb-8 pr-6">
											{pet.name}
										</h3>
										<p className="text-xl font-semibold">{pet.species}</p>
										<p className="text-xl font-semibold">{pet.breed}</p>
										<p className="text-xl font-semibold">{pet.gender}</p>
										<p className="text-xl font-semibold">{pet.age} years old</p>
									</div>
								</div>
							))}
						</>
					)}
				</div>
				{!showMessage && (
					<>
						<div
							className="rounded-full rotate-45 z-50 h-20 w-20 flex justify-center items-center absolute -bottom-10 bg-secondary left-10 xl:left-40 cursor-pointer"
							onClick={() => handleAction('rejected')}
						>
							<Plus />
						</div>
						<div
							className="rounded-full h-20 w-20 flex z-50 justify-center items-center absolute -bottom-10 bg-secondary right-10 xl:right-40 cursor-pointer"
							onClick={() => handleAction('liked')}
						>
							<Check />
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default MatchCard;
