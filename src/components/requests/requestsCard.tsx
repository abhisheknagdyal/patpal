import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
import {
	CalendarDays,
	CircleDot,
	Clock,
	Info,
	MapPin,
	Video,
	X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge.tsx';

import { getTimeFromRequest } from '@/utils/time.ts';
import { useUser } from '@/hooks/useUser.ts';
import { ROUTES } from '@/constants/routes.ts';
import { useNavigate } from 'react-router-dom';
import TooltipWrapper from '@/components/tooltipWrapper.tsx';

type Props = {
	service: 'grooming' | 'boarding' | 'transportation';
	request: any;
	handleCancelClick: (id: string) => void;
};

const getClass = (status: 'pending' | 'rejected' | 'accepted' | 'started') => {
	switch (status) {
		case 'pending':
			return 'text-yellow-500';
		case 'rejected':
			return 'text-red-500';
		case 'accepted':
			return 'text-green-500';
		case 'started':
			return 'text-blue-500';
		default:
			return 'text-gray-500';
	}
};

const RequestsCard = ({ service, request, handleCancelClick }: Props) => {
	const navigate = useNavigate();
	const { userSubscription } = useUser();
	const timeDetails =
		'timeSlot' in request
			? getTimeFromRequest(request.timeSlot)
			: {
					date: null,
					from: null,
					to: null,
				};

	const renderStatusButton = () => {
		switch (request.status) {
			case 'pending':
			case 'rejected':
				return (
					<div
						className="px-4 py-3 w-full text-xs bg-red-500 rounded-lg mt-4 flex items-center gap-1 justify-center cursor-pointer font-semibold"
						onClick={() => handleCancelClick(request._id)}
					>
						<X size={16} /> Cancel
					</div>
				);
			case 'started':
				return service === 'grooming' || service === 'transportation' ? (
					<div className="px-4 py-3 w-full text-xs text-center bg-green-500 rounded-lg mt-4 flex items-center gap-5 font-semibold">
						<CircleDot />
						<span>In progress</span>
					</div>
				) : userSubscription === 'gold' ? (
					<div
						className="px-4 h-10 w-full text-xs bg-blue-500 rounded-lg mt-4 flex items-center gap-5 justify-center cursor-pointer font-semibold"
						onClick={() =>
							navigate(ROUTES.LIVE_MONITORING.getLive(request._id))
						}
					>
						<Video size={18} />
						<span>Watch live feed</span>
					</div>
				) : (
					<div className="px-4 py-3 w-full text-xs text-center bg-green-500 rounded-lg mt-4 flex items-center gap-5 font-semibold">
						<CircleDot />
						<span>In progress</span>
					</div>
				);
			default:
				return null;
		}
	};

	const renderTooltipContent = () => {
		switch (request.status) {
			case 'started':
				return service === 'grooming' || service === 'transportation'
					? 'Your request is in progress.'
					: userSubscription === 'gold'
						? 'Your request is in progress, Click to watch the live feed.'
						: 'Your request is in progress.';
			case 'accepted':
				return 'Your request has been accepted and will start on the allotted time.';
			case 'pending':
				return 'Your request is pending and awaiting approval.';
			case 'rejected':
				return 'Your request was rejected. You may delete this request by clicking the cancel button.';
			default:
				return '';
		}
	};

	return (
		<Card className="w-80 bg-primary-foreground border-none">
			<CardHeader className="p-5">
				<div className="flex gap-4">
					<div className="h-14 w-14 bg-gray-500 rounded-lg overflow-hidden">
						<img
							className="object-cover h-full w-full"
							src={
								request.requestedId?.photo_url ||
								'https://via.placeholder.com/300'
							}
							alt={`${request.requestedId.name}'s Profile`}
						/>
					</div>
					<div className="flex-1">
						<div>{request.requestedId?.name}</div>
						<div className="text-xs text-gray-500">
							{'city' in request && <div>{request.requestedId?.city}</div>}
							<div>{request.requestedId?.contact}</div>
						</div>
					</div>
					<Badge
						className="w-8 h-8 p-0 flex justify-center"
						variant="secondary"
					>
						<TooltipWrapper
							Icon={<Info size={18} className={getClass(request.status)} />}
							content={renderTooltipContent()}
						/>
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="px-5 pb-5">
				{'timeSlot' in request ? (
					<div className="bg-zinc-800 px-4 py-3 rounded-lg flex justify-between text-xs text-gray-300">
						<div className="flex items-center gap-2">
							<CalendarDays size={16} />
							{timeDetails.date}
						</div>
						<div className="flex items-center gap-2">
							<Clock size={16} />
							{timeDetails.from} - {timeDetails.to}
						</div>
					</div>
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
						<div className="bg-zinc-800 px-4 py-3 rounded-lg flex-col space-y-2 justify-between">
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
				{renderStatusButton()}
			</CardContent>
		</Card>
	);
};

export default RequestsCard;
