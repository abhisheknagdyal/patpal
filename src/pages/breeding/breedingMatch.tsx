import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dna } from 'lucide-react';
import queryString from 'query-string';

import petImg from '@/assets/myPet.png';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { useUser } from '@/hooks/useUser.ts';

import PetProfileCard from '@/components/pets/petProfileCard.tsx';
import PetProfileCardSkeleton from '@/components/skeletons/petProfileCardSkeleton.tsx';
import LoaderFancy from '@/components/loaders/loader-fancy.tsx';
import { SliderDisplay } from '@/components/ui/slider-display.tsx';
import { Button } from '@/components/ui/button.tsx';

import { getMatchScore } from '@/redux/reducers/breeding/getMatchScoreReducer.ts';
import { getPetById } from '@/redux/reducers/pets/fetchSinglePetReducer.ts';
import { getMyPetById } from '@/redux/reducers/pets/fetchMySinglePetReducer.ts';

import { ROUTES } from '@/constants/routes.ts';
import { createBreedingMatch } from '@/redux/reducers/breeding/createMatchReducer.ts';

const BreedingMatch = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const query = queryString.parse(location.search);
	const { user } = useUser();

	const { pet: potentialPet } = useAppSelector(
		(state) => state.pets.getSinglePet
	);
	const { pet: myPet } = useAppSelector((state) => state.pets.fetchMySinglePet);
	const { data, loading, error } = useAppSelector(
		(state) => state.breeding.getMatchScore
	);

	useEffect(() => {
		if (myPet?._id && potentialPet?._id) {
			dispatch(
				getMatchScore({
					myPet: query.myPet as string,
					potentialPet: query.potentialPet as string,
				})
			);
		}
	}, [
		dispatch,
		myPet?._id,
		potentialPet?._id,
		query.myPet,
		query.potentialPet,
	]);

	useEffect(() => {
		dispatch(getMyPetById(query.myPet as string));
	}, [dispatch, myPet?._id, query.myPet]);

	useEffect(() => {
		dispatch(getPetById(query.potentialPet as string));
	}, [dispatch, potentialPet?._id, query.potentialPet]);

	const createBreeding = () => {
		if (user?.subscription_model !== 'gold') {
			navigate(ROUTES.SUBSCRIPTION);
			return;
		}
		dispatch(createBreedingMatch({ id: potentialPet.owner_id })).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				navigate(ROUTES.SOCIAL_NETWORK.getSingleChat(potentialPet.owner_id), {
					state: {
						from: 'breedingPage',
						p1: myPet.name,
						p2: potentialPet.name,
					},
				});
			}
		});
	};

	return (
		<div className="xl:px-20 xl:py-12 p-4">
			<div className="flex justify-center flex-col md:flex-row items-center">
				{!myPet || !potentialPet ? (
					[...Array(2)].map((_, i) => <PetProfileCardSkeleton key={i} />)
				) : (
					<>
						<PetProfileCard
							pet={myPet}
							fallBackImg={petImg}
							handleCardClick={() => null}
						/>
						<Dna className="h-56 w-56 text-primary-foreground md:rotate-45 -rotate-45" />
						<PetProfileCard
							pet={potentialPet}
							fallBackImg={petImg}
							handleCardClick={() => null}
						/>
					</>
				)}
			</div>
			<div className="my-6 flex flex-col items-center justify-center py-10 gap-5">
				{!loading && error && (
					<div className="flex items-center justify-center flex-col gap-5">
						{error}
					</div>
				)}
				{loading ? (
					<div className="flex items-center justify-center flex-col gap-5">
						<LoaderFancy />
						ANALYSING...
					</div>
				) : (
					<>
						<div className="xl:w-[40rem] w-full">
							<SliderDisplay value={[data.score]} max={10} />
						</div>
						<div>{data.summary}</div>
						{data.score >= 7 &&
						user?.id === myPet.owner_id &&
						myPet.owner_id !== potentialPet.owner_id ? (
							<Button onClick={createBreeding}>Contact owner</Button>
						) : (
							<Button onClick={() => navigate(-1)}>Go back</Button>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default BreedingMatch;
