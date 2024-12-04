import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Send } from 'lucide-react';
import MarkdownIt from 'markdown-it';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { getAuthToken } from '@/utils/auth/workflow.ts';
import { baseUrl } from '@/utils/constants.ts';

import { MessageContent } from '@/redux/reducers/social/getMessagesByIdReducer.ts';
import { User } from '@/utils/types.ts';
import { isEmpty } from '@/utils/lodash.ts';
import { extractTimeFromDateString } from '@/utils/time.ts';
import { useLocation } from 'react-router-dom';

const md = new MarkdownIt();

type Props = {
	contextFromWrapper: MessageContent[];
	onUnMatch: () => void;
	user: User;
	receiver: {
		_id: string;
		username: string;
		details: {
			name: string;
			photo_url: string;
		};
	};
};

const ChatWindow = ({
	user,
	receiver,
	contextFromWrapper,
	onUnMatch,
}: Props) => {
	const [socket, setSocket] = useState<Socket>();
	const location = useLocation();
	const [context, setContext] = useState<any>(contextFromWrapper);
	const [input, setInput] = useState('');
	const [connectError, setConnectError] = useState('');
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const [receiverTyping, setReceiverTyping] = useState(false);

	let p1, p2;
	const fromBreedingPage = location?.state?.from === 'breedingPage';
	if (fromBreedingPage) {
		p1 = location.state.p1;
		p2 = location.state.p2;
	}

	const handleSendMessage = () => {
		if (input.trim() && socket) {
			socket.emit('private_message', {
				senderId: user.id,
				receiverId: receiver._id,
				message: input,
				createdAt: new Date().toISOString(),
			});
			setContext((prevMessages: any) => [
				...prevMessages,
				{
					senderId: user.id,
					message: input,
					createdAt: new Date().toISOString(),
				},
			]);
			socket.emit('stop-typing', { receiverId: receiver._id });
			setInput('');
		}
	};

	useEffect(() => {
		const newSocket = io(baseUrl, {
			auth: {
				token: getAuthToken(),
			},
		});
		setSocket(newSocket);

		newSocket.emit('join', user.id);
		newSocket.on('private_message', ({ senderId, message, createdAt }) => {
			setContext((prevMessages: any) => [
				...prevMessages,
				{ senderId, message, createdAt },
			]);
		});
		newSocket.on('typing', () => {
			setReceiverTyping(true);
		});
		newSocket.on('stop-typing', () => {
			setReceiverTyping(false);
		});
		newSocket.on('connect_error', (err) => {
			setConnectError(err.message);
		});

		return () => {
			if (newSocket) {
				newSocket.disconnect();
			}
		};
	}, [user.id]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
	}, [context.length, connectError]);

	const handleInputChange = (e: any) => {
		setInput(e.target.value);
		if (!socket) return;
		if (e.target.value) {
			socket.emit('typing', { receiverId: receiver._id });
		} else {
			socket.emit('stop-typing', { receiverId: receiver._id });
		}
	};

	return (
		<div className="h-[88vh] py-4 px-4">
			<Card className="max-w-3xl w-full mx-auto rounded-2xl flex flex-col h-full border-black">
				<CardHeader className="bg-gray-900 rounded-2xl">
					<div className="flex items-center justify-between">
						<div className="flex gap-5 items-center">
							<Avatar>
								<AvatarImage
									className="h-8 w-8 rounded-full cursor-pointer"
									src={receiver.details.photo_url}
									alt="@shadcn"
								/>
								<AvatarFallback className="h-10 w-10 rounded-full cursor-pointer">
									{`${receiver.username?.[0]}${receiver.username?.[receiver.username?.length - 1]}`.toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<span>{receiver.details.name}</span>
						</div>
						<Button variant="destructive" onClick={onUnMatch}>
							Unmatch
						</Button>
					</div>
				</CardHeader>
				<CardContent className="flex-1 p-4 flex flex-col justify-end overflow-hidden relative">
					{isEmpty(context) && fromBreedingPage && (
						<div className="absolute top-3 text-md w-full flex justify-center">
							{`Your Pet ${p1} and ${receiver.details.name}'s pet ${p2} are breeding compatible! start chatting`}
						</div>
					)}
					{isEmpty(context) && (
						<div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-zinc-500">
							Its a Match! start chatting.
						</div>
					)}
					<div className="space-y-4 overflow-y-auto">
						{!connectError &&
							context.map(
								(
									content: {
										senderId: string;
										message: string;
										createdAt: Date;
									},
									i: number
								) => (
									<div
										key={i}
										className={`flex items-end space-x-3 ${
											content.senderId === user.id
												? 'flex-row-reverse justify-start gap-2'
												: 'justify-start'
										}`}
									>
										<div
											className={`px-3 py-2 rounded-lg relative flex gap-2 max-w-[75%]  ${
												content.senderId === user.id
													? 'bg-[#673ab7] text-white'
													: 'bg-zinc-800'
											}`}
										>
											<div
												className="text-sm h-fit break-words"
												dangerouslySetInnerHTML={{
													__html: md.render(content.message),
												}}
											></div>
											<span className="text-[6px] self-end">
												{extractTimeFromDateString(content.createdAt)}
											</span>
										</div>
									</div>
								)
							)}
						{receiverTyping && (
							<div className="flex items-end space-x-3 justify-start">
								<div className="px-3 py-2 rounded-lg max-w-[15%] text-sm h-fit bg-zinc-800 w-fit animate-pulse">
									Typing...
								</div>
							</div>
						)}
						{connectError && (
							<div className="text-red-600 flex justify-center">
								{`There was an error while connecting, please try again later - ${connectError}`}
							</div>
						)}
						<div ref={scrollRef} />
					</div>
				</CardContent>
				<CardFooter className="p-4">
					<div className="flex items-center w-full bg-primary-foreground rounded-full pr-1 h-12">
						<Textarea
							placeholder={`Type to chat with ${receiver.details.name}...`}
							value={input}
							disabled={!!connectError}
							onChange={handleInputChange}
							className="flex-1 resize-none border-none pl-6 py-3 focus-visible:ring-0 pr-1 min-h-6 max-h-10 items-center"
							onKeyDown={(e) => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault();
									handleSendMessage();
								}
							}}
						/>
						<Button
							variant="outline"
							className="rounded-full h-10 w-10"
							onClick={handleSendMessage}
							disabled={!input.trim() || !!connectError}
						>
							<Send size={10} />
						</Button>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default ChatWindow;
