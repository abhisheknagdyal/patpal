import { Button } from '@/components/ui/button.tsx';

import hero from '../../assets/hero.png';
import AddPetFormButton from '@/components/pets/addPetFormButton.tsx';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes.ts';

const Home = () => {
	const navigate = useNavigate();
	return (
		<div className="xl:px-12 px-4">
			<div className="xl:flex xl:h-[88vh] max-xl:pt-20">
				<div className="flex-1 flex items-center xl:pb-12 xl:pl-16">
					<div className="space-y-10 lg:max-w-2xl xl:pr-20">
						<div className="text-7xl font-semibold">
							Your Pet is part of our family
						</div>
						<div className="text-xl tracking-widest">
							Let us treat your pet like our own family with best services and
							special packages
						</div>
						<div className="space-x-8 flex items-center">
							<AddPetFormButton />
							<Button onClick={() => navigate(ROUTES.SUBSCRIPTION)}>
								Check pricing
							</Button>
						</div>
					</div>
				</div>
				<div className="flex-1 hidden md:flex justify-center pt-10">
					<img className="h-[60vh]" src={hero} alt="pets" />
				</div>
			</div>
		</div>
	);
};

export default Home;
