import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import useUrlDispatch from '@/hooks/useUrlDispatch.ts';
import queryString from 'query-string';
import RequestCard, {
	Action,
} from '@/components/personnelRequestCard/requestCard.tsx';
import { TransporterRequest } from '@/utils/types.ts';
import { PAGINATION_CHANGED } from '@/hooks/urlReducer.ts';
import Spinner from '@/components/spinner.tsx';
import Paginator from '@/components/paginator/paginator.tsx';
import { transporterAction } from '@/redux/reducers/transport/transporterActionsReducer.ts';
import { getTransporterRequests } from '@/redux/reducers/transport/transporterRequestsReducer.ts';

const AcceptRequestsTransporters = () => {
	const [refresh, setRefresh] = useState(false);
	const appDispatch = useAppDispatch();
	const { dispatch } = useUrlDispatch({ replace: true });
	const query = queryString.parse(location.search);
	const { requests, error, loading } = useAppSelector(
		(state) => state.transport.requests
	);
	const {
		loading: actionInProgress,
		id: actionId,
		action: actionInState,
	} = useAppSelector((state) => state.transport.actions);

	const onAction = (action: Action, request: TransporterRequest) => {
		appDispatch(transporterAction({ action, id: request._id })).then(() =>
			setRefresh((prevState) => !prevState)
		);
	};

	const setPagination = (pagination: number) => {
		dispatch({
			type: PAGINATION_CHANGED,
			payload: {
				skip: pagination,
			},
		});
	};

	useEffect(() => {
		appDispatch(
			getTransporterRequests({
				skip: Number(query.skip) || 0,
				status: ['accepted', 'started'],
			})
		);
	}, [appDispatch, query.skip, refresh]);

	return (
		<div className="w-full p-10">
			{loading && (
				<div className="flex items-center justify-center">
					<Spinner />
				</div>
			)}
			{error && (
				<span>Error fetching your requests, {error}. Try again later.</span>
			)}
			{!error && !loading && !!requests.results.length && (
				<div
					className={`flex flex-col justify-center items-center gap-5
					${actionInProgress ? 'pointer-events-none animate-pulse opacity-70' : ''}`}
				>
					{!loading &&
						requests.results.map((request) => (
							<RequestCard
								key={request._id}
								request={request}
								onAction={onAction}
								actionInProgress={actionInProgress}
								actionId={actionId}
								actionInState={actionInState}
								acceptedPage
							/>
						))}
				</div>
			)}
			{!error && !loading && !requests.results.length && (
				<div className="flex justify-center items-center text-gray-600">
					<span>Oh No! There are no requests here</span>
				</div>
			)}
			<Paginator
				count={requests.count}
				skip={Number(query.skip) || 0}
				setPagination={setPagination}
			/>
		</div>
	);
};

export default AcceptRequestsTransporters;
