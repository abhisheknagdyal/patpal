import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { getMonitoringSession } from '@/redux/reducers/boarders/monitoring/monitoringReducer.ts';

import Spinner from '@/components/spinner.tsx';

const LiveMonitoring = () => {
	const { id } = useParams() as { id: string };
	const [webcamStream, setWebcamStream] = useState('');
	const dispatch = useAppDispatch();
	const { session, loading, error } = useAppSelector(
		(state) => state.boarders.monitoring
	);

	useEffect(() => {
		if (!session?.sessionURL) return;
		const eventSource = new EventSource(`${session.sessionURL}/stream`);

		eventSource.onmessage = (event) => {
			const data = JSON.parse(event.data);
			setWebcamStream(data.image);
		};

		eventSource.onerror = (error) => {
			console.error('Error with EventSource:', error);
			eventSource.close();
		};

		return () => {
			eventSource.close();
		};
	}, [session?.sessionURL]);

	useEffect(() => {
		dispatch(getMonitoringSession({ id }));
	}, [dispatch, id]);

	return (
		<div className="flex items-center justify-center h-[88vh] w-full">
			{loading && (
				<div>
					<Spinner />
				</div>
			)}
			{!loading && error && (
				<span className="text-red-600">
					Couldn't fetch session. Try again later
				</span>
			)}
			{!loading && session?.sessionURL && (
				<div className="w-[80%] h-[80%] bg-gray-900 flex items-center justify-center">
					{webcamStream && (
						<img
							className="object-contain h-full w-full aspect-auto"
							src={webcamStream}
							alt="live stream"
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default LiveMonitoring;
