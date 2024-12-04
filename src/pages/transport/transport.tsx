import { useEffect, useState } from 'react';
import useUrlDispatch from '@/hooks/useUrlDispatch.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import queryString from 'query-string';
import useScrollToTop from '@/hooks/useScrollToTop.ts';
import { Pet, SubmitValuesForTransport } from '@/utils/types.ts';
import { getMyPets } from '@/redux/reducers/pets/fetchMyPetsReducer.ts';
import { PAGINATION_CHANGED } from '@/hooks/urlReducer.ts';
import ServiceCardSkeleton from '@/components/skeletons/serviceCardSkeleton.tsx';
import ServiceCard from '@/components/requests/serviceCard.tsx';
import Paginator from '@/components/paginator/paginator.tsx';
import { requestTransporterService } from '@/redux/reducers/transport/requestTransporterServiceReducer.ts';
import { getTransporters } from '@/redux/reducers/transport/fetchTransportersReducer.ts';

const Transport = () => {
	const [open, setOpen] = useState(false);
	const { dispatch } = useUrlDispatch({ replace: true });
	const appDispatch = useAppDispatch();
	const query = queryString.parse(location.search);
	const scrollRef = useScrollToTop(query);
	const {
		fetchTransporters: { transporters, loading },
		requestService: { loading: appointmentLoading },
	} = useAppSelector((state) => state.transport);
	const { pets } = useAppSelector((state) => state.pets.getMyPets);

	const onSubmit = (
		values: SubmitValuesForTransport,
		transporterId: string
	) => {
		const selectedPet = pets?.results?.find(
			(pet: Pet & { _id: string }) => pet._id === values.petId
		);
		const petType = selectedPet?.species;

		const newBody = {
			...values,
			petType: petType,
		};

		appDispatch(
			requestTransporterService({
				body: newBody,
				id: transporterId,
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
		appDispatch(getTransporters({ skip: Number(query.skip) || 0 }));
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
				) : transporters.count === 0 ? (
					<div className="text-center text-md text-gray-500">
						No transporters available at the moment. Please try again later.
					</div>
				) : (
					transporters.results.map((transporter) => (
						<ServiceCard
							personnel={transporter}
							key={transporter._id}
							loading={appointmentLoading}
							open={open}
							setOpen={setOpen}
							onSubmit={onSubmit}
							pets={pets.results}
							headerTitle="Book Transportation Service"
							desc="Use this form to book transportation service for your pet."
							isTransporter={true}
						/>
					))
				)}
			</div>
			<div className="pt-8">
				<Paginator
					count={transporters.count}
					skip={Number(query.skip) || 0}
					setPagination={setPagination}
				/>
			</div>
		</div>
	);
};

export default Transport;
