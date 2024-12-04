import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import useUrlDispatch from '@/hooks/useUrlDispatch.ts';
import queryString from 'query-string';
import RequestCard, {
	Action,
} from '@/components/personnelRequestCard/requestCard.tsx';
import { PAGINATION_CHANGED } from '@/hooks/urlReducer.ts';
import Spinner from '@/components/spinner.tsx';
import Paginator from '@/components/paginator/paginator.tsx';
import { boarderAction } from '@/redux/reducers/boarders/boardersActionsReducer.ts';
import { getBoarderRequests } from '@/redux/reducers/boarders/boardersRequests.ts';
import { PersonnelRequest } from '@/utils/types.ts';
import ModalWithoutTrigger from '@/components/modal/modalWithoutTrigger.tsx';
import { Input } from '@/components/ui/input.tsx';

const AcceptedRequestsBoarders = () => {
	const [refresh, setRefresh] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [sessionUrl, setSessionUrl] = useState('');
	const [localRequest, setLocalRequest] = useState<{
		action: Action;
		request: PersonnelRequest;
	}>();
	const appDispatch = useAppDispatch();
	const { dispatch } = useUrlDispatch({ replace: true });
	const query = queryString.parse(location.search);
	const { requests, error, loading } = useAppSelector(
		(state) => state.boarders.requests
	);
	const {
		loading: actionInProgress,
		id: actionId,
		action: actionInState,
	} = useAppSelector((state) => state.boarders.actions);

	const onAction = (action: Action, request: PersonnelRequest) => {
		const hasMonitoring = request.userSubscriptionModel === 'gold';
		let body;
		if (action === 'complete' && hasMonitoring) {
			body = {
				requestId: request._id,
			};
		}
		if (action === 'start' && hasMonitoring) {
			setLocalRequest({ action, request });
			setOpenModal(true);
		} else {
			appDispatch(
				boarderAction({ action, id: request._id, hasMonitoring, body })
			).then((res) => {
				if (res.meta.requestStatus === 'fulfilled') {
					setRefresh((prevState) => !prevState);
				}
			});
		}
	};

	const onV2Submit = () => {
		const body = {
			requestId: localRequest?.request._id,
			userId: localRequest?.request.requesterId._id,
			userSubscriptionModel: localRequest?.request.userSubscriptionModel,
			sessionURL: sessionUrl.trim(),
		};
		appDispatch(
			boarderAction({
				action: localRequest!.action,
				id: localRequest!.request._id,
				hasMonitoring: true,
				body,
			})
		).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setSessionUrl('');
				setLocalRequest(undefined);
				setOpenModal(false);
				setRefresh((prevState) => !prevState);
			}
		});
	};

	const renderFormBody = () => {
		return (
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Input
						id="url"
						value={sessionUrl}
						onChange={(e) => setSessionUrl(e.target.value)}
						placeholder="url"
						className="col-span-4"
					/>
				</div>
			</div>
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
			getBoarderRequests({
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
								hasMonitoring={request.userSubscriptionModel === 'gold'}
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
			<ModalWithoutTrigger
				open={openModal}
				setOpen={setOpenModal}
				description="Enter Session URL"
				onClick={onV2Submit}
				loading={actionInProgress}
				buttonTitle="Start Session"
				content={renderFormBody()}
			/>
		</div>
	);
};

export default AcceptedRequestsBoarders;
