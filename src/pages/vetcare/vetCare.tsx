import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes.ts';
import { Stethoscope } from 'lucide-react';
import { SelectPet } from '@/components/pets/selectPet.tsx';

const VetCare = () => {
	const navigate = useNavigate();

	const handleNavigate = (route: string) => {
		navigate(route);
	};

	return (
		<div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6 justify-center items-center py-12">
			<div
				className="flex flex-col items-center justify-center w-64 h-40 bg-[#673ab7] text-white rounded-lg shadow-lg cursor-pointer hover:bg-[#5a2aa0] transition-colors"
				onClick={() => handleNavigate(ROUTES.VET_CARE.doctors)}
			>
				<Stethoscope size={40} className="mb-3" />
				<span className="text-xl font-semibold">View Doctors</span>
			</div>
			<SelectPet />
		</div>
	);
};

export default VetCare;
