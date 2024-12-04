import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { useEffect, useState } from 'react';
import { getMyGroomingRequests } from '@/redux/reducers/groomers/fetchMyGroomerRequestsReducer.ts';
import RequestsCard from '@/components/requests/requestsCard.tsx';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/tabs.tsx';
import RequestCardSkeleton from '@/components/skeletons/requestCardSkeleton.tsx';
import { getMyBoardingRequests } from '@/redux/reducers/boarders/fetchMyBoarderRequestsReducer.ts';
import { cancelGroomerRequest } from '@/redux/reducers/groomers/CancelGroomerRequestReducer.ts';
import { cancelBoarderRequest } from '@/redux/reducers/boarders/cancelBoarderRequestReducer.ts';
import { getMyTransportationRequests } from '@/redux/reducers/transport/fetchMyTransportationRequestsReducer.ts';
import { cancelTransporterRequest } from '@/redux/reducers/transport/cancelTransporterRequestReducer.ts';

const MyRequests = () => {
	const [refresh, setRefresh] = useState(false);
	const dispatch = useAppDispatch();
	const { loading, requests } = useAppSelector(
		(state) => state.groomers.fetchMyRequests
	);
	const { loading: boardingLoading, requests: boardingRequests } =
		useAppSelector((state) => state.boarders.fetchMyRequests);
	const { loading: transportLoading, requests: transportRequests } =
		useAppSelector((state) => state.transport.fetchMyRequests);

	useEffect(() => {
		dispatch(getMyGroomingRequests({ skip: 0 }));
		dispatch(getMyBoardingRequests({ skip: 0 }));
		dispatch(getMyTransportationRequests({ skip: 0 }));
	}, [dispatch, refresh]);

	const boarderRequestCancel = (id: string) => {
		dispatch(cancelBoarderRequest(id)).then(() =>
			setRefresh((prevState) => !prevState)
		);
	};
	const groomerRequestCancel = (id: string) => {
		dispatch(cancelGroomerRequest(id)).then(() =>
			setRefresh((prevState) => !prevState)
		);
	};
	const transporterRequestCancel = (id: string) => {
		dispatch(cancelTransporterRequest(id)).then(() =>
			setRefresh((prevState) => !prevState)
		);
	};

	return (
		<div className="flex justify-center items-center py-8 px-4">
			<Tabs defaultValue="grooming" className="w-full md:w-[64rem]">
				<TabsList className="grid w-full grid-cols-3 h-fit">
					<TabsTrigger value="grooming" className="text-md">
						Grooming
					</TabsTrigger>
					<TabsTrigger value="boarding" className="text-md">
						Boarding
					</TabsTrigger>
					<TabsTrigger value="transport" className="text-md">
						Transport
					</TabsTrigger>
				</TabsList>
				<TabsContent value="grooming" className="py-6">
					<div className="flex gap-8 flex-wrap justify-center">
						{loading ? (
							[...Array(6)].map((_, index) => (
								<RequestCardSkeleton key={index} />
							))
						) : requests.count === 0 ? (
							<p className="text-center text-gray-500">No appointments</p>
						) : (
							requests.results.map((request: any) => (
								<RequestsCard
									service="grooming"
									request={request}
									key={request._id}
									handleCancelClick={groomerRequestCancel}
								/>
							))
						)}
					</div>
				</TabsContent>
				<TabsContent value="boarding" className="py-6">
					<div className="flex gap-8 flex-wrap justify-center">
						{boardingLoading ? (
							[...Array(6)].map((_, index) => (
								<RequestCardSkeleton key={index} />
							))
						) : boardingRequests.count === 0 ? (
							<p className="text-center text-gray-500">No appointments</p>
						) : (
							boardingRequests.results.map((request: any) => (
								<RequestsCard
									service="boarding"
									request={request}
									key={request._id}
									handleCancelClick={boarderRequestCancel}
								/>
							))
						)}
					</div>
				</TabsContent>
				<TabsContent value="transport" className="py-6">
					<div className="flex gap-8 flex-wrap justify-center">
						{transportLoading ? (
							[...Array(6)].map((_, index) => (
								<RequestCardSkeleton key={index} />
							))
						) : transportRequests.count === 0 ? (
							<p className="text-center text-gray-500">No appointments</p>
						) : (
							transportRequests.results.map((request: any) => (
								<RequestsCard
									service="transportation"
									request={request}
									key={request._id}
									handleCancelClick={transporterRequestCancel}
								/>
							))
						)}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default MyRequests;
