import queryString from 'query-string';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { useEffect, useState } from 'react';
import { getGroomerRequests } from '@/redux/reducers/groomers/groomerRequests.ts';
import RequestCard from '@/components/personnelRequestCard/requestCard.tsx';
import Spinner from '@/components/spinner.tsx';
import Paginator from '@/components/paginator/paginator.tsx';
import { PAGINATION_CHANGED } from '@/hooks/urlReducer.ts';
import useUrlDispatch from '@/hooks/useUrlDispatch.ts';
import { groomerAction } from '@/redux/reducers/groomers/groomerActionsReducer.ts';
import { Action } from '@/components/personnelRequestCard/requestCard.tsx';
import { PersonnelRequest } from '@/utils/types.ts';

const AcceptedRequestsGroomers = () => {
	const [refresh, setRefresh] = useState(false);
	const appDispatch = useAppDispatch();
	const { dispatch } = useUrlDispatch({ replace: true });
	const query = queryString.parse(location.search);
	const { requests, error, loading } = useAppSelector(
		(state) => state.groomers.requests
	);
	const {
		loading: actionInProgress,
		id: actionId,
		action: actionInState,
	} = useAppSelector((state) => state.groomers.actions);

	const onAction = (action: Action, request: PersonnelRequest) => {
		appDispatch(groomerAction({ action, id: request._id })).then(() =>
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
			getGroomerRequests({
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

export default AcceptedRequestsGroomers;
