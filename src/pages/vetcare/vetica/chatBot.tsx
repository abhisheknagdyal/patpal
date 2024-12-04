import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { Send, Bot, User } from 'lucide-react';
import MarkdownIt from 'markdown-it';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { getAuthToken } from '@/utils/auth/workflow.ts';
import { isEmpty } from '@/utils/lodash.ts';
import { baseUrl } from '@/utils/constants.ts';

import './chatBot.css';

const md = new MarkdownIt();

const extractContext = (botContext: any, setContext: any, setError: any) => {
	if (botContext.error) {
		setError(botContext.error);
	} else {
		setContext((prevContext: any) => [
			...prevContext,
			botContext.response?.candidates?.[0]?.content,
		]);
	}
};

const ChatBot = () => {
	const [socket, setSocket] = useState<Socket>();
	const [context, setContext] = useState<any>([]);
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);
	const [connectError, setConnectError] = useState('');
	const [error, setError] = useState('');
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const { id } = useParams();

	const handleSendMessage = () => {
		if (socket && input.trim()) {
			setContext((prevState: any) => [
				...prevState,
				{ role: 'user', parts: [{ text: input }] },
			]);
			socket.emit('user-event', context, input);
			setInput('');
			setError('');
			setLoading(true);
		}
	};

	useEffect(() => {
		const newSocket = io(baseUrl, {
			auth: {
				token: getAuthToken(),
			},
		});
		setSocket(newSocket);

		newSocket.emit('register', id);
		newSocket.on('bot-event', (botMessage) => {
			extractContext(botMessage, setContext, setError);
			setLoading(false);
		});
		newSocket.on('connect_error', (err) => {
			setLoading(false);
			setConnectError(err.message);
		});
		return () => {
			if (newSocket) {
				newSocket.disconnect();
			}
		};
	}, [id]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
	}, [loading, context.length, error, connectError]);

	return (
		<div className="h-[88vh] py-4">
			<Card className="max-w-3xl w-full mx-auto rounded-2xl flex flex-col h-full border-black">
				<CardContent className="flex-1 p-4 flex flex-col justify-end overflow-hidden relative">
					{isEmpty(context) && (
						<div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-zinc-500">
							What can I help with?
						</div>
					)}
					<div className="space-y-4 overflow-y-auto">
						{!connectError &&
							context.map(
								(
									content: {
										role: 'user' | 'model';
										parts: { text: string }[];
									},
									i: number
								) => (
									<div
										key={i}
										className={`flex items-end space-x-3 ${
											content.role === 'user'
												? 'flex-row-reverse justify-start gap-2'
												: 'justify-start'
										}`}
									>
										{content.role === 'model' ? (
											<Bot size={20} className="text-gray-500" />
										) : (
											<User size={20} className="text-[#673ab7]" />
										)}
										<div
											dangerouslySetInnerHTML={{
												__html: md.render(content.parts[0].text),
											}}
											className={`px-3 py-2 rounded-lg max-w-[75%] text-sm h-fit break-words ${
												content.role === 'user'
													? 'bg-[#673ab7] text-white'
													: 'bg-zinc-800'
											}`}
										></div>
									</div>
								)
							)}
						{loading && (
							<div className="flex items-end space-x-3 justify-start">
								<Bot size={20} className="text-gray-500" />
								<div className="px-3 py-2 rounded-lg max-w-[75%] text-sm h-fit break-words bg-zinc-800 analysing">
									Analysing...
								</div>
							</div>
						)}
						{error && (
							<div className="flex items-end space-x-3 justify-start">
								<Bot size={20} className="text-gray-500" />
								<div className="px-3 py-2 rounded-lg max-w-[75%] text-sm h-fit break-words bg-zinc-800 text-red-600">
									{error}
								</div>
							</div>
						)}
						{connectError && (
							<div className="text-red-600 flex justify-center">
								{`There was an error connecting to VETICA, please try again later - ${connectError}`}
							</div>
						)}
						<div ref={scrollRef} />
					</div>
				</CardContent>
				<CardFooter className="p-4">
					<div className="flex items-center w-full bg-primary-foreground rounded-full pr-1 h-12">
						<Textarea
							placeholder="Chat with Vetica"
							value={input}
							disabled={!!connectError || loading}
							onChange={(e) => setInput(e.target.value)}
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
							disabled={!input.trim() || !!connectError || loading}
						>
							<Send size={10} />
						</Button>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default ChatBot;
