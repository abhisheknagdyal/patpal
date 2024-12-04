import { type Dispatch, type SetStateAction } from 'react';
import BookServiceButton from '@/components/requests/bookServiceButton.tsx';
import { convertNumberToTime } from '@/utils/time.ts';
import { Badge } from '@/components/ui/badge.tsx';
import { MapPin, PhoneOutgoing, Clock } from 'lucide-react';
import {
	Personnel,
	Pet,
	SubmitValues,
	SubmitValuesForTransport,
	Transporter,
} from '@/utils/types.ts';

type Props<T, V> = {
	personnel: T;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	onSubmit: (values: V, id: string) => void;
	loading: boolean;
	pets: Pet[];
	headerTitle: string;
	desc: string;
	isTransporter?: boolean;
};

const ServiceCard = <
	T extends Personnel | Transporter,
	V extends SubmitValues | SubmitValuesForTransport,
>({
	personnel,
	open,
	setOpen,
	onSubmit,
	loading,
	pets,
	headerTitle,
	desc,
	isTransporter = false,
}: Props<T, V>) => {
	return (
		<div className="w-96 shadow-lg rounded-lg overflow-hidden bg-primary-foreground">
			<div className="relative h-80 p-4">
				<img
					className="object-cover h-full w-full rounded-lg"
					src={personnel.photo_url || 'https://via.placeholder.com/300'}
					alt={`${personnel.name}'s Profile`}
				/>
			</div>
			<div className="p-6 pt-2 w-full flex flex-col gap-4 justify-between">
				<div>
					<h2 className="text-2xl font-bold text-gray-500 mb-2">
						{personnel.name}
					</h2>
					<p className="text-gray-300 flex items-center gap-2">
						<MapPin size={16} /> {personnel.address}
						{'city' in personnel && `, ${personnel.city}`}
					</p>
					<p className="text-gray-300 flex items-center gap-2">
						<PhoneOutgoing size={16} /> {personnel.contact}
					</p>
					<p className="text-gray-300 space-x-2 py-1">
						{personnel.petType.map((pet) => (
							<Badge key={pet} variant="secondary">
								{pet}
							</Badge>
						))}
					</p>
					{'city' in personnel && (
						<div className="text-gray-300 flex items-center gap-2">
							<Clock size={16} />
							<strong className="text-sm">Time Available:</strong>
							<div className="flex items-center gap-2">
								<Badge variant="outline" className="px-3 py-1 text-sm">
									{convertNumberToTime(personnel.timeAvailable[0])}
								</Badge>
								<span className="text-gray-400">to</span>
								<Badge variant="outline" className="px-3 py-1 text-sm">
									{convertNumberToTime(personnel.timeAvailable[1])}
								</Badge>
							</div>
						</div>
					)}
				</div>
				<div className="text-center">
					<BookServiceButton
						personnelId={personnel._id}
						open={open}
						setOpen={setOpen}
						onSubmit={onSubmit}
						loading={loading}
						pets={pets}
						headerTitle={headerTitle}
						desc={desc}
						isTransporter={isTransporter}
					/>
				</div>
			</div>
		</div>
	);
};

export default ServiceCard;
