import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { PersonnelRequest, TransporterRequest } from '@/utils/types.ts';
import Spinner from '@/components/spinner.tsx';
import { getTimeFromRequest } from '@/utils/time.ts';

export type Action = 'accept' | 'decline' | 'start' | 'complete';

type Props<T> = {
	request: T;
	onAction: (action: Action, request: T) => void;
	actionId: string;
	actionInProgress: boolean;
	actionInState: string;
	acceptedPage?: boolean;
	hasMonitoring?: boolean;
};

const getBGClass = (status: string, acceptedPage?: boolean) => {
	switch (status) {
		case 'accepted':
			return acceptedPage ? '' : 'bg-green-500';
		case 'rejected':
			return 'bg-red-500';
		case 'pending':
			return 'bg-white';
		default:
			return '';
	}
};

const RequestCard = <T extends PersonnelRequest | TransporterRequest>({
	request,
	onAction,
	actionId,
	actionInProgress,
	actionInState,
	acceptedPage,
	hasMonitoring,
}: Props<T>) => {
	const timeDetails =
		'timeSlot' in request
			? getTimeFromRequest(request.timeSlot)
			: { date: null, from: null, to: null };

	const handleAction = (action: Action) => {
		onAction(action, request);
	};

	const renderActions = (status: string) => {
		switch (status) {
			case 'started':
				return (
					<div className="flex gap-2">
						<Button
							variant={hasMonitoring ? 'destructive' : 'default'}
							onClick={() => handleAction('complete')}
						>
							{actionInState === 'complete' &&
							actionInProgress &&
							actionId === request._id ? (
								<Spinner />
							) : hasMonitoring ? (
								'Close Live Session'
							) : (
								'Close Session'
							)}
						</Button>
					</div>
				);
			case 'accepted':
				return acceptedPage ? (
					<div className="flex gap-2">
						<Button onClick={() => handleAction('start')}>
							{actionInState === 'start' &&
							actionInProgress &&
							actionId === request._id ? (
								<Spinner />
							) : hasMonitoring ? (
								'Start Live Session'
							) : (
								'Start Session'
							)}
						</Button>
					</div>
				) : (
					<span>Accepted</span>
				);
			case 'rejected':
				return <span>Rejected</span>;
			default:
				return (
					<div className="flex gap-2">
						<Button onClick={() => handleAction('accept')}>
							{actionInState === 'accept' &&
							actionInProgress &&
							actionId === request._id ? (
								<Spinner />
							) : (
								'Accept'
							)}
						</Button>
						<Button
							variant="destructive"
							onClick={() => handleAction('decline')}
						>
							{actionInState === 'decline' &&
							actionInProgress &&
							actionId === request._id ? (
								<Spinner />
							) : (
								'Decline'
							)}
						</Button>
					</div>
				);
		}
	};

	return (
		<div
			className={`w-full p-0.5 rounded-xl ${getBGClass(request.status, acceptedPage)}`}
		>
			<Card className="bg-primary-foreground border-none">
				<CardHeader className="p-5 flex md:flex-row flex-col">
					<div className="flex gap-4 flex-col md:flex-row flex-1">
						<div className="h-14 w-14 bg-gray-500 rounded-lg0">
							<img
								className="object-cover h-full w-full rounded-lg"
								src={
									request.petId.photo_url ||
									'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
								}
								alt={`${request.petId.name}'s Profile`}
							/>
						</div>
						<div className="flex justify-end flex-1">
							<div className="flex-1 w-full">
								<div>{request.requesterId.details.name}'s Appointment</div>
								<div className="flex flex-col text-gray-500">
									<span>
										{request.petId.species} - {request.petId.size}
									</span>
									<span>{request.petId.breed}</span>
									<span>{request.petId.location}</span>
								</div>
							</div>
						</div>
					</div>
					{renderActions(request.status)}
				</CardHeader>
				<CardContent className="px-5 pb-5">
					{'timeSlot' in request ? (
						<>
							<div className="bg-zinc-800 px-4 py-3 rounded-lg flex justify-between">
								<div className="flex text-xs items-center gap-2">
									<CalendarDays size={16} />
									{timeDetails.date}
								</div>
								<div className="flex text-xs items-center gap-2">
									<Clock size={16} />
									{timeDetails.from} - {timeDetails.to}
								</div>
							</div>
						</>
					) : (
						<div className="space-y-2">
							<div className="bg-zinc-800 px-4 py-3 rounded-lg flex justify-between">
								<div className="flex text-xs items-center gap-2">
									<CalendarDays size={16} />
									{new Date(request.pickUpDate).toLocaleDateString('en-US', {
										month: 'long',
										day: 'numeric',
									})}
								</div>
							</div>
							<div className="bg-zinc-800 px-4 py-3 rounded-lg md:flex space-y-2 md:space-y-0 justify-between">
								<div className="flex justify-between items-center text-xs gap-2">
									<div className="flex items-center gap-2">
										<MapPin className="text-green-600" size={18} />
										<span className="font-medium text-gray-300">
											Pickup Location
										</span>
									</div>
									<span className="text-gray-400 capitalize">
										{request.locationFrom}
									</span>
								</div>
								<div className="flex justify-between items-center text-xs gap-2">
									<div className="flex items-center gap-2">
										<MapPin className="text-blue-600" size={18} />
										<span className="font-medium text-gray-300">
											Dropoff Location
										</span>
									</div>
									<span className="text-gray-400 capitalize">
										{request.locationTo}
									</span>
								</div>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default RequestCard;
