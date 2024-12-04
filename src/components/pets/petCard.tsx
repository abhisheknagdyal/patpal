import { Baby, DnaOff, Dog, ListCollapse, MapPin, Syringe } from 'lucide-react';

import TooltipWrapper from '@/components/tooltipWrapper.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card.tsx';
import { Pet } from '@/utils/types.ts';

type PetCardProps = {
	pet: Pet & { adoption_status?: 'available' };
	onClick: () => void;
	fallBackImg: string;
	fromMyPets?: boolean;
};

const getClass = (status?: boolean) => {
	switch (status) {
		case true:
			return 'text-green-500';
		case false:
			return 'text-red-500';
		default:
			return 'text-gray-500';
	}
};

const PetCard = ({
	pet,
	onClick,
	fallBackImg,
	fromMyPets = false,
}: PetCardProps) => {
	return (
		<Card
			className={`w-80 ${pet.adoption_status === 'available' && fromMyPets ? 'border-amber-600' : ''}`}
		>
			<CardHeader className="p-3 rounded-xl">
				<img
					src={pet.photo_url || fallBackImg}
					alt={pet.name}
					className="h-56 rounded-xl object-contain object-center"
					onError={(e) => {
						(e.target as HTMLImageElement).src = fallBackImg;
					}}
				/>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					<div className="text-sm capitalize text-[#673ab7]">{pet.breed}</div>
					<div className="text-lg capitalize">{pet.name}</div>
					<div className="text-sm capitalize flex gap-2 items-center">
						<MapPin size={16} /> {pet.location}
					</div>
				</div>
				<div className="flex space-x-4 mt-6 text-red-500 h-6">
					<TooltipWrapper
						Icon={<Dog className={getClass(pet.good_with_pets)} />}
						content="Good with other Pets"
					/>
					<TooltipWrapper
						Icon={<Baby className={getClass(pet.good_with_children)} />}
						content="Good with Children"
					/>
					<TooltipWrapper
						Icon={<Syringe className={getClass(pet.vaccinated)} />}
						content="Shots up to date"
					/>
					<TooltipWrapper
						Icon={<DnaOff className={getClass(pet.spayed_neutered)} />}
						content="Spayed/Neutered"
					/>
				</div>
			</CardContent>
			<CardFooter>
				<Button variant="outline" className="w-full" onClick={onClick}>
					<ListCollapse /> More Details
				</Button>
			</CardFooter>
		</Card>
	);
};

export default PetCard;
