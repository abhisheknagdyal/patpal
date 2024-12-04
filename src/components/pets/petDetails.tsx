import {
	CheckCircle,
	XCircle,
	CircleMinus,
	MapPin,
	Heart,
	Calendar,
	Info,
	Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import PetDetailsPageSkeleton from '@/components/skeletons/petDetailsPageSkeleton.tsx';

import { Pet, SubscriptionLevel } from '@/utils/types.ts';
import EditPetButton from '@/components/pets/editPetButton.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes.ts';
import { Dispatch, SetStateAction } from 'react';
import { getFormattedTime } from '@/utils/time.ts';

type Props = {
	onClick: () => void;
	pet: Pet & { _id?: string };
	buttonTitle: string;
	isLoading: boolean;
	role: SubscriptionLevel | null;
	setRefresh?: Dispatch<SetStateAction<boolean>>;
};

const getIcon = (status?: boolean) => {
	switch (status) {
		case true:
			return <CheckCircle className="text-green-600 w-5 h-5" />;
		case false:
			return <XCircle className="text-red-600 w-5 h-5" />;
		default:
			return <CircleMinus className="text-gray-600 w-5 h-5" />;
	}
};

const PetDetails = ({
	pet,
	onClick,
	buttonTitle,
	isLoading,
	setRefresh,
	role,
}: Props) => {
	const location = useLocation();
	const navigate = useNavigate();
	const editable = location.pathname.split('/')[1] === ROUTES.MY_PETS.relative;

	if (isLoading) {
		return <PetDetailsPageSkeleton />;
	}

	return (
		<div className="flex flex-col items-center min-h-screen py-4 xl:py-12 px-4">
			<div className="w-full max-w-3xl bg-primary-foreground shadow-lg rounded-2xl overflow-hidden relative">
				<div className="relative w-full h-80 bg-gray-500">
					{pet.photo_url && (
						<img
							src={pet.photo_url}
							alt={`${pet.name} the ${pet.breed}`}
							className="object-cover w-full h-full"
						/>
					)}
					<div className="absolute bottom-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md">
						<h2 className="text-3xl font-bold">{pet.name}</h2>
						<p className="text-lg font-medium">{pet.species}</p>
					</div>
				</div>

				<div className="p-8 space-y-6">
					<div className="text-center text-gray-500">
						<h3 className="text-2xl font-semibold">{pet.breed}</h3>
						<div className="flex items-center justify-center gap-2 text-purple-600 mt-2">
							<MapPin className="w-5 h-5" /> {pet.location}
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
						<Badge
							variant="secondary"
							className="flex flex-col items-center p-4 rounded-xl"
						>
							<span className="text-sm font-semibold">Age</span>
							<p className="text-lg">{pet.age} years</p>
						</Badge>
						<Badge
							variant="secondary"
							className="flex flex-col items-center p-4 rounded-xl"
						>
							<span className="text-sm font-semibold">Weight</span>
							<p className="text-lg">{pet.weight} kg</p>
						</Badge>
						{pet.color && (
							<Badge
								variant="secondary"
								className="flex flex-col items-center p-4 rounded-xl"
							>
								<span className="text-sm font-semibold">Color</span>
								<p className="text-lg">{pet.color}</p>
							</Badge>
						)}
						{pet.gender && (
							<Badge
								variant="secondary"
								className="flex flex-col items-center p-4 rounded-xl"
							>
								<span className="text-sm font-semibold">Gender</span>
								<p className="text-lg capitalize">{pet.gender}</p>
							</Badge>
						)}
						<Badge
							variant="secondary"
							className="flex flex-col items-center p-4 rounded-xl"
						>
							<span className="text-sm font-semibold">Size</span>
							<p className="text-lg capitalize">{pet.size}</p>
						</Badge>
						<Badge
							variant="secondary"
							className="flex flex-col items-center p-4 rounded-xl"
						>
							<span className="text-sm font-semibold">Activity Level</span>
							<p className="text-lg capitalize">{pet.activity_level}</p>
						</Badge>
					</div>

					<div className="space-y-4">
						<div className="flex items-center gap-2 text-gray-700">
							<Info className="w-5 h-5 text-purple-600" />
							<p className="font-medium">{pet.description || '---'}</p>
						</div>
						<div className="flex items-center gap-2 text-gray-700">
							<Heart className="w-5 h-5 text-red-600" />
							<p className="font-medium">
								Medical Conditions: {pet.medical_conditions || '---'}
							</p>
						</div>
						<div className="flex items-center gap-2 text-gray-700">
							<Heart className="w-5 h-5 text-yellow-500" />
							<p className="font-medium">
								Special Needs: {pet.special_needs || '---'}
							</p>
						</div>
						<div className="flex items-center gap-2 text-gray-700">
							<Calendar className="w-5 h-5 text-blue-600" />
							<p className="font-medium">
								Last Checkup:{' '}
								{getFormattedTime(pet.last_checkup_date, 'date-only') || '---'}
							</p>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4 mt-4">
						<div className="flex items-center gap-2">
							{getIcon(pet.vaccinated)}
							<p className="text-gray-700">Vaccinated</p>
						</div>
						<div className="flex items-center gap-2">
							{getIcon(pet.good_with_children)}
							<p className="text-gray-700">Good with Children</p>
						</div>
						<div className="flex items-center gap-2">
							{getIcon(pet.good_with_pets)}
							<p className="text-gray-700">Good with Other Pets</p>
						</div>
						<div className="flex items-center gap-2">
							{getIcon(pet.spayed_neutered)}
							<p className="text-gray-700">Spayed/Neutered</p>
						</div>
					</div>

					<div className="flex justify-end mt-4">
						<Button variant="secondary" onClick={onClick}>
							{buttonTitle}
						</Button>
					</div>
				</div>
				{editable && (
					<div className="absolute top-4 right-4 cursor-pointer flex items-center gap-3">
						<EditPetButton defaultValues={pet} setRefresh={setRefresh} />
						{role === 'gold' && (
							<Button
								variant="secondary"
								onClick={() =>
									navigate(ROUTES.ACTIVITY_TRACKING.getActivity(pet._id!))
								}
							>
								<Activity />
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default PetDetails;
