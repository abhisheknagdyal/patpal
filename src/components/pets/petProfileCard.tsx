import {
	Baby,
	DnaOff,
	Dog,
	MapPin,
	Syringe,
	Scale,
	Activity,
	Calendar,
} from 'lucide-react';
import TooltipWrapper from '@/components/tooltipWrapper';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Pet } from '@/utils/types.ts';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

type Props = {
	pet: Pet & { _id: string };
	fallBackImg: string;
	handleCardClick: (id: string) => void;
};

const PetProfileCard = ({ pet, fallBackImg, handleCardClick }: Props) => {
	return (
		<div
			className="relative group w-80"
			onClick={() => handleCardClick(pet._id)}
		>
			<Card className="w-full overflow-hidden">
				<CardHeader className="p-3 rounded-xl">
					<img
						src={pet?.photo_url || fallBackImg}
						alt={pet.name}
						className="h-56 w-full rounded-xl object-contain object-center"
						onError={(e) => {
							(e.target as HTMLImageElement).src = fallBackImg;
						}}
					/>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<div className="text-sm capitalize text-[#673ab7]">{pet.breed}</div>
						<div className="text-lg font-semibold capitalize">{pet.name}</div>
						{pet.location && (
							<div className="text-sm capitalize flex gap-2 items-center">
								<MapPin size={16} /> {pet.location}
							</div>
						)}
					</div>
				</CardContent>

				<div
					className={`absolute text-gray-400 inset-0 bg-zinc-900 bg-opacity-90 flex flex-col justify-center opacity-0 p-2 group-hover:opacity-100 transition-opacity duration-1000 rounded-xl space-y-3`}
				>
					<ScrollArea>
						<div className="p-4">
							<p className="text-center text-lg font-semibold text-gray-300">
								{pet.name}
							</p>
							<p className="text-center text-sm italic text-gray-300">
								{pet.description}
							</p>
							<div className="flex flex-col space-y-2 text-sm mt-4">
								<div className="flex items-center gap-2">
									<Activity size={16} />
									<span>Activity Level: {pet.activity_level}</span>
								</div>
								<div className="flex items-center gap-2">
									<Scale size={16} />
									<span>Size: {pet.size}</span>
								</div>
								<div className="flex items-center gap-2">
									<Scale size={16} />
									<span>Weight: {pet.weight} kg</span>
								</div>
								<div className="flex items-center gap-2">
									<Calendar size={14} />
									<span>
										Last Checkup:{' '}
										{new Date(pet.last_checkup_date!).toLocaleDateString()}
									</span>
								</div>
								{pet.medical_conditions && (
									<div className="flex items-center gap-2 leading-tight">
										<DnaOff size={16} />
										<span>Medical Conditions: {pet.medical_conditions}</span>
									</div>
								)}
								{pet.special_needs && (
									<div className="flex items-center gap-2 leading-tight">
										<DnaOff size={16} />
										<span>Special Needs: {pet.special_needs}</span>
									</div>
								)}
							</div>
							<div className="flex space-x-4 mt-6 text-red-500 h-6">
								{pet.good_with_pets && (
									<TooltipWrapper
										Icon={<Dog />}
										content="Good with other Pets"
									/>
								)}
								{pet.good_with_children && (
									<TooltipWrapper
										Icon={<Baby />}
										content="Good with Children"
									/>
								)}
								{pet.vaccinated && (
									<TooltipWrapper
										Icon={<Syringe />}
										content="Shots up to date"
									/>
								)}
								{pet.spayed_neutered && (
									<TooltipWrapper Icon={<DnaOff />} content="Spayed/Neutered" />
								)}
							</div>
						</div>
					</ScrollArea>
				</div>
			</Card>
		</div>
	);
};

export default PetProfileCard;
