import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import myPet from '@/assets/myPet.png';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { getMyPets } from '@/redux/reducers/pets/fetchMyPetsReducer.ts';
import PetCard from '@/components/pets/petCard.tsx';
import PetCardSkeleton from '@/components/skeletons/petCardSkeleton.tsx';
import AddPetFormButton from '@/components/pets/addPetFormButton.tsx';

import { ROUTES } from '@/constants/routes.ts';

const MyPets = () => {
	const [refresh, setRefresh] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { pets, loading } = useAppSelector((state) => state.pets.getMyPets);

	useEffect(() => {
		dispatch(getMyPets());
	}, [dispatch, refresh]);

	const getRoute = (id: string, status: string | undefined) => {
		return !status
			? ROUTES.MY_PETS.getMyPetPath(id)
			: `${ROUTES.MY_PETS.getMyPetPath(id)}?status=${status}`;
	};

	return (
		<div className="xl:px-20 py-8">
			<AddPetFormButton setRefresh={setRefresh} />
			<div className="flex justify-center gap-8 flex-wrap mt-8">
				{loading ? (
					Array.from({ length: 4 }).map((_, index) => (
						<PetCardSkeleton key={index} />
					))
				) : pets?.results?.length ? (
					pets.results.map((pet) => (
						<PetCard
							key={pet._id}
							pet={pet}
							onClick={() => navigate(getRoute(pet._id, pet.adoption_status))}
							fallBackImg={myPet}
							fromMyPets={true}
						/>
					))
				) : (
					<p className="text-center text-gray-500">No pets found.</p>
				)}
			</div>
		</div>
	);
};

export default MyPets;
