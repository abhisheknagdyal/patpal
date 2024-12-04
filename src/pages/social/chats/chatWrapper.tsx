import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '@/hooks/useUser.ts';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { getMessagesById } from '@/redux/reducers/social/getMessagesByIdReducer.ts';
import { getStatus } from '@/redux/reducers/social/getStatusReducer.ts';
import { unMatch } from '@/redux/reducers/social/unmatchReducer.ts';

import ChatWindow from '@/components/social/chatWindow.tsx';
import Spinner from '@/components/spinner.tsx';

import { ROUTES } from '@/constants/routes.ts';

const ChatWrapper = () => {
	const { id } = useParams();
	const { user } = useUser();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { status, loading } = useAppSelector((state) => state.social.getStatus);
	const {
		messages,
		loaded,
		loading: messagesLoading,
	} = useAppSelector((state) => state.social.getMessages);
	const showChat =
		!!status && user?.id && !loading && !messagesLoading && loaded;

	useEffect(() => {
		if (id) dispatch(getStatus({ id }));
	}, [dispatch, id]);

	useEffect(() => {
		if (id && status) dispatch(getMessagesById({ id }));
	}, [dispatch, id, status]);

	const onUnMatch = () => {
		if (id)
			dispatch(unMatch(id)).then((res) => {
				if (res.meta.requestStatus === 'fulfilled') {
					navigate(ROUTES.SOCIAL_NETWORK.myChats);
				}
			});
	};

	return (
		<div>
			{loaded ||
				(messagesLoading && (
					<div className="w-full flex justify-center items-center">
						<Spinner />
					</div>
				))}
			{showChat && id && (
				<ChatWindow
					user={user}
					receiver={status}
					onUnMatch={onUnMatch}
					contextFromWrapper={messages}
				/>
			)}
		</div>
	);
};

export default ChatWrapper;
