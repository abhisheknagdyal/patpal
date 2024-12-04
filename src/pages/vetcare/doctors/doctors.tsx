import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import vet from '@/assets/vet.png';
import { ROUTES } from '@/constants/routes.ts';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import useUrlDispatch from '@/hooks/useUrlDispatch.ts';

import { getDoctors } from '@/redux/reducers/doctors/fetchDoctorsReducer.ts';
import { PAGINATION_CHANGED } from '@/hooks/urlReducer.ts';

import DoctorCard from '@/components/doctors/doctorCard.tsx';
import DoctorCardSkeleton from '@/components/skeletons/doctorCardSkeleton.tsx';
import Paginator from '@/components/paginator/paginator.tsx';
import useScrollToTop from '@/hooks/useScrollToTop.ts';

const Doctors = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const query = queryString.parse(location.search);
	const scrollRef = useScrollToTop(query);

	const appDispatch = useAppDispatch();
	const { dispatch } = useUrlDispatch({ replace: true });

	const { doctors, loading } = useAppSelector(
		(state) => state.doctors.fetchDoctors
	);

	useEffect(() => {
		appDispatch(getDoctors({ skip: Number(query.skip) || 0 }));
	}, [appDispatch, query.skip]);

	const setPagination = (pagination: number) => {
		dispatch({
			type: PAGINATION_CHANGED,
			payload: { skip: pagination },
		});
	};

	const handleNavigate = (id: string) => {
		navigate(ROUTES.VET_CARE.getDoctorPath(id));
	};

	return (
		<div className="xl:px-20 xl:py-12 px-4 py-4 pb-6 md:pt-24" ref={scrollRef}>
			<div className="flex justify-center gap-6 flex-wrap">
				{loading ? (
					[...Array(3)].map((_, i) => <DoctorCardSkeleton key={i} />)
				) : doctors.count === 0 ? (
					<div className="text-center text-md text-gray-500">
						No doctors available at the moment. Please try again later.
					</div>
				) : (
					doctors.results.map((doctor) => (
						<DoctorCard
							key={doctor._id}
							doctor={doctor}
							handleNavigate={handleNavigate}
							fallBackImage={vet}
						/>
					))
				)}
			</div>
			<div className="pt-6">
				<Paginator
					count={doctors?.count}
					skip={Number(query.skip) || 0}
					setPagination={setPagination}
				/>
			</div>
		</div>
	);
};

export default Doctors;
