import { Button } from '@/components/ui/button.tsx';
import { DoctorData } from '@/utils/types.ts';
import { Card } from '@/components/ui/card.tsx';

type Props = {
	doctor: DoctorData;
	handleNavigate: (id: string) => void;
	fallBackImage?: string;
};

const DoctorCard = ({ doctor, handleNavigate, fallBackImage }: Props) => {
	const maxExperience = 30;

	return (
		<Card className="max-w-xs w-full shadow-lg rounded-lg overflow-hidden">
			<div className="bg-zinc-900 h-52 w-full">
				<img
					className="object-cover h-full w-full bg-center"
					src={doctor.profilePicture || fallBackImage}
					alt={doctor.name}
				/>
			</div>
			<div className="p-6 space-y-4">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-xl font-semibold text-zinc-400">
							{doctor.name}
						</h3>
						<p className="text-md capitalize text-[#673ab7]">
							{doctor.specialization}
						</p>
					</div>
				</div>
				<div className="w-2/3 flex items-center space-x-2">
					<div className="flex-1 relative pt-2">
						<div
							className="absolute inset-0 bg-gray-300 rounded-full"
							style={{ height: '8px' }}
						></div>
						<div
							className="absolute inset-0 bg-[#673ab7] rounded-full"
							style={{
								width: `${Math.min((doctor.experienceYears / maxExperience) * 100, 100)}%`,
								height: '8px',
							}}
						></div>
					</div>
					<span className="text-sm text-gray-600">
						{doctor.experienceYears} years
					</span>
				</div>
				<div className="flex justify-between pt-4">
					<Button
						variant="outline"
						className="w-full"
						onClick={() => handleNavigate(doctor._id)}
					>
						View Details
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default DoctorCard;
