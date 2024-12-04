import myPet from '@/assets/myPet.png';
import PetProfileCard from '@/components/pets/petProfileCard.tsx';
import { Pet } from '@/utils/types.ts';

type PetData = Pet & { _id: string };
type Props = {
	pets: PetData[];
	handleCardClick: (id: string) => void;
	selectedPet: string;
};

const MyPetsMapper = ({ pets, handleCardClick, selectedPet }: Props) => {
	const filteredPets = pets.filter((pet) => pet._id !== selectedPet);
	return (
		<div>
			{filteredPets.length === 0 ? (
				<div className="text-center text-md text-gray-500">
					You currently have no pets other than the selected pet to display.
					Please add a new pet to your profile.
				</div>
			) : (
				<div className="flex justify-center flex-wrap gap-6">
					{filteredPets.map((pet) => (
						<PetProfileCard
							key={pet._id}
							pet={pet}
							fallBackImg={myPet}
							handleCardClick={handleCardClick}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default MyPetsMapper;
