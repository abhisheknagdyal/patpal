import useUrlDispatch from '@/hooks/useUrlDispatch.ts';
import queryString from 'query-string';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { useEffect, useState } from 'react';
import { PAGINATION_CHANGED } from '@/hooks/urlReducer.ts';
import ServiceCardSkeleton from '@/components/skeletons/serviceCardSkeleton.tsx';
import ServiceCard from '@/components/requests/serviceCard.tsx';
import Paginator from '@/components/paginator/paginator.tsx';
import { getBoarders } from '@/redux/reducers/boarders/fetchBoardersReducer.ts';
import { Pet, SubmitValues } from '@/utils/types.ts';
import { getMyPets } from '@/redux/reducers/pets/fetchMyPetsReducer.ts';
import { requestBoarderService } from '@/redux/reducers/boarders/requestBoarderServiceReducer.ts';
import useScrollToTop from '@/hooks/useScrollToTop.ts';

const Boarding = () => {
	const [open, setOpen] = useState(false);
	const { dispatch } = useUrlDispatch({ replace: true });
	const appDispatch = useAppDispatch();
	const query = queryString.parse(location.search);
	const scrollRef = useScrollToTop(query);
	const {
		fetchBoarder: { boarders, loading },
		requestService: { loading: appointmentLoading },
	} = useAppSelector((state) => state.boarders);
	const { pets } = useAppSelector((state) => state.pets.getMyPets);

	const onSubmit = (values: SubmitValues, boarderId: string) => {
		const selectedPet = pets?.results?.find(
			(pet: Pet & { _id: string }) => pet._id === values.petId
		);
		const petType = selectedPet?.species;

		const newBody = {
			...values,
			petType: petType,
		};

		appDispatch(
			requestBoarderService({
				body: newBody,
				id: boarderId,
			})
		).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setOpen(false);
			}
		});
	};

	useEffect(() => {
		appDispatch(getMyPets());
	}, [appDispatch]);

	useEffect(() => {
		appDispatch(getBoarders({ skip: Number(query.skip) || 0 }));
	}, [appDispatch, dispatch, query.skip]);

	const setPagination = (pagination: number) => {
		dispatch({
			type: PAGINATION_CHANGED,
			payload: { skip: pagination },
		});
	};

	return (
		<div className="py-12 px-4 sm:px-8 lg:px-12" ref={scrollRef}>
			<div className="flex justify-center gap-8">
				{loading ? (
					[...Array(2)].map((_, index) => <ServiceCardSkeleton key={index} />)
				) : boarders.count === 0 ? (
					<div className="text-center text-md text-gray-500">
						No boarders available at the moment. Please try again later.
					</div>
				) : (
					boarders.results.map((boarder) => (
						<ServiceCard
							personnel={boarder}
							key={boarder._id}
							loading={appointmentLoading}
							open={open}
							setOpen={setOpen}
							onSubmit={onSubmit}
							pets={pets.results}
							headerTitle="Book Boarding Service"
							desc="Use this form to book boarding service for your pet."
						/>
					))
				)}
			</div>
			<div className="pt-8">
				<Paginator
					count={boarders.count}
					skip={Number(query.skip) || 0}
					setPagination={setPagination}
				/>
			</div>
		</div>
	);
};

export default Boarding;
