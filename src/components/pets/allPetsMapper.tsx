import myPet from '@/assets/myPet.png';

import PetProfileCard from '@/components/pets/petProfileCard.tsx';
import PetProfileCardSkeleton from '@/components/skeletons/petProfileCardSkeleton.tsx';

import { Pet } from '@/utils/types.ts';
import Paginator from '@/components/paginator/paginator.tsx';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import useUrlDispatch from '@/hooks/useUrlDispatch.ts';
import { PAGINATION_CHANGED } from '@/hooks/urlReducer.ts';

type PetData = Pet & { _id: string };

type Props = {
	pets: {
		count: number;
		results: PetData[];
	};
	loading: boolean;
	handleCardClick: (id: string) => void;
};

const AllPetsMapper = ({ pets, loading, handleCardClick }: Props) => {
	const location = useLocation();
	const query = queryString.parse(location.search);
	const { dispatch } = useUrlDispatch({ replace: true });

	const setPagination = (pagination: number) => {
		dispatch({
			type: PAGINATION_CHANGED,
			payload: { skip: pagination },
		});
	};

	return (
		<div>
			<div className="flex justify-center flex-wrap gap-6">
				{loading ? (
					[...Array(4)].map((_, i) => <PetProfileCardSkeleton key={i} />)
				) : pets.count === 0 ? (
					<div className="text-center text-md text-gray-500">
						No pets available at the moment. Please try again later.
					</div>
				) : (
					pets.results.map((pet) => (
						<PetProfileCard
							key={pet._id}
							pet={pet}
							fallBackImg={myPet}
							handleCardClick={handleCardClick}
						/>
					))
				)}
			</div>
			<Paginator
				count={pets.count}
				skip={Number(query.skip) || 0}
				setPagination={setPagination}
			/>
		</div>
	);
};

export default AllPetsMapper;
