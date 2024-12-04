import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { PawPrint } from 'lucide-react';

import adoptDontShop from '@/assets/AdoptDontShop-Cropped-removebg-preview.png';
import dogSad from '@/assets/dogSad.png';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import useUrlDispatch from '@/hooks/useUrlDispatch.ts';
import useScrollToTop from '@/hooks/useScrollToTop.ts';
import { PAGINATION_CHANGED } from '@/hooks/urlReducer.ts';
import { getAdoptionPets } from '@/redux/reducers/admin/adoptionPetsReducer.ts';

import { Pet } from '@/utils/types.ts';

import PetCard from '@/components/pets/petCard.tsx';
import Spinner from '@/components/spinner.tsx';
import Paginator from '@/components/paginator/paginator.tsx';
import { ROUTES } from '@/constants/routes.ts';

const Adoption = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const appDispatch = useAppDispatch();
	const { dispatch } = useUrlDispatch({ replace: true });
	const query = queryString.parse(location.search);
	const { loading, adoptions } = useAppSelector(
		(state) => state.admin.adoptablePets
	);
	const scrollRef = useScrollToTop(query);

	const setPagination = (pagination: number) => {
		dispatch({
			type: PAGINATION_CHANGED,
			payload: { skip: pagination },
		});
	};

	useEffect(() => {
		appDispatch(getAdoptionPets({ skip: Number(query.skip) || 0 }));
	}, [appDispatch, query.skip]);

	return (
		<div>
			<div className="w-full flex h-1/2 md:h-[60vh] justify-center bg-[#673ab7]">
				<img src={adoptDontShop} alt="Adopt, Don’t Shop" />
			</div>
			<div className="text-center font-semibold tracking-wider space-y-2 my-12">
				<div className="flex flex-col items-center text-[#673ab7] gap-1">
					<PawPrint /> Meet the Animals
				</div>
				<div className="text-4xl px-6">Waiting for Adoption</div>
			</div>
			<div
				className="flex flex-wrap justify-center py-8 xl:px-12 gap-8"
				ref={scrollRef}
			>
				{loading ? (
					<div className="w-full h-full flex justify-center items-center mt-5">
						<Spinner />
					</div>
				) : adoptions.count === 0 ? (
					<div className="text-center text-md text-gray-500">
						No pets available for adoption at the moment. Please check back
						later.
					</div>
				) : (
					adoptions?.results.map((pet: Pet & { _id: string }) => (
						<PetCard
							key={pet._id}
							pet={pet}
							fallBackImg={dogSad}
							onClick={() =>
								navigate(ROUTES.ADOPTION.getAdoptablePetPath(pet._id))
							}
						/>
					))
				)}
			</div>
			<div className="pb-8">
				<Paginator
					count={adoptions?.count}
					skip={Number(query.skip) || 0}
					setPagination={setPagination}
				/>
			</div>
		</div>
	);
};

export default Adoption;
