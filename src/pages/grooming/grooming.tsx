import { useEffect, useState } from 'react';
import queryString from 'query-string';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { getGroomers } from '@/redux/reducers/groomers/fetchGroomersReducer.ts';
import { PAGINATION_CHANGED } from '@/hooks/urlReducer.ts';
import useUrlDispatch from '@/hooks/useUrlDispatch.ts';

import ServiceCard from '@/components/requests/serviceCard.tsx';
import ServiceCardSkeleton from '@/components/skeletons/serviceCardSkeleton.tsx';
import Paginator from '@/components/paginator/paginator.tsx';
import { Pet, SubmitValues } from '@/utils/types.ts';
import { requestGroomerService } from '@/redux/reducers/groomers/requestGroomerServiceReducer.ts';
import { getMyPets } from '@/redux/reducers/pets/fetchMyPetsReducer.ts';
import useScrollToTop from '@/hooks/useScrollToTop.ts';

const Grooming = () => {
	const [open, setOpen] = useState(false);
	const appDispatch = useAppDispatch();
	const { dispatch } = useUrlDispatch({ replace: true });
	const query = queryString.parse(location.search);
	const scrollRef = useScrollToTop(query);
	const {
		fetchGroomer: { groomers, loading },
		requestService: { loading: appointmentLoading },
	} = useAppSelector((state) => state.groomers);
	const { pets } = useAppSelector((state) => state.pets.getMyPets);

	const setPagination = (pagination: number) => {
		dispatch({
			type: PAGINATION_CHANGED,
			payload: { skip: pagination },
		});
	};

	const onSubmit = (values: SubmitValues, groomerId: string) => {
		const selectedPet = pets?.results?.find(
			(pet: Pet & { _id: string }) => pet._id === values.petId
		);
		const petType = selectedPet?.species;

		const newBody = {
			...values,
			petType: petType,
		};

		appDispatch(
			requestGroomerService({
				body: newBody,
				id: groomerId,
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
		appDispatch(getGroomers({ skip: Number(query.skip) || 0 }));
	}, [appDispatch, dispatch, query.skip]);

	return (
		<div className="py-12 px-4 sm:px-8 lg:px-12" ref={scrollRef}>
			<div className="flex justify-center gap-8">
				{loading ? (
					[...Array(3)].map((_, index) => <ServiceCardSkeleton key={index} />)
				) : groomers.count === 0 ? (
					<div className="text-center text-md text-gray-500">
						No groomers available at the moment. Please try again later.
					</div>
				) : (
					groomers.results.map((groomer) => (
						<ServiceCard
							personnel={groomer}
							key={groomer._id}
							open={open}
							setOpen={setOpen}
							onSubmit={onSubmit}
							loading={appointmentLoading}
							pets={pets.results}
							headerTitle="Book Grooming ServiceBook Grooming Service"
							desc="Use this form to book a grooming service for your pet."
						/>
					))
				)}
			</div>
			<div className="pt-8">
				<Paginator
					count={groomers.count}
					skip={Number(query.skip) || 0}
					setPagination={setPagination}
				/>
			</div>
		</div>
	);
};

export default Grooming;
