import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CircleCheck, CircleX, IndianRupee } from 'lucide-react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import Spinner from '@/components/spinner.tsx';

import { useUser } from '@/hooks/useUser.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';

import { createPayment } from '@/redux/reducers/payments/createPaymentReducer.ts';
import { getSubscriptions } from '@/redux/reducers/payments/subscriptionReducer.ts';

import { SubscriptionLevel } from '@/utils/types.ts';
import { cancelSubscription } from '@/redux/reducers/payments/cancelSubscriptionReducer.ts';

const features = [
	{ feature: 'Adoption', basic: true, plus: true, gold: true },
	{ feature: 'Pets Products', basic: true, plus: true, gold: true },
	{ feature: 'Grooming', basic: false, plus: true, gold: true },
	{ feature: 'Pet Transport', basic: false, plus: false, gold: true },
	{
		feature: (
			<div className="flex gap-1">
				<div className="text-gray-400">Vet Care</div>
				<div>/ Consulting With AI</div>
			</div>
		),
		basic: false,
		plus: true,
		gold: true,
	},
	{
		feature: (
			<div className="flex gap-1">
				<div className="text-gray-400">Vet Care</div>
				<div>/ Consulting With Doctors</div>
			</div>
		),
		basic: false,
		plus: false,
		gold: true,
	},
	{ feature: 'Boarding', basic: false, plus: true, gold: true },
	{
		feature: (
			<div className="flex gap-1">
				<div className="text-gray-400">Boarding</div>
				<div>/ Activity Tracking</div>
			</div>
		),
		basic: false,
		plus: false,
		gold: true,
	},
	{
		feature: (
			<div className="flex gap-1">
				<div className="text-gray-400">Boarding</div>
				<div>/ Live Monitoring</div>
			</div>
		),
		basic: false,
		plus: false,
		gold: true,
	},
	{ feature: 'Ethical Breeding', basic: false, plus: false, gold: true },
	{ feature: 'Pet Social Network', basic: false, plus: false, gold: true },
];

const subscriptionLevels: Record<SubscriptionLevel, 1 | 2 | 3> = {
	basic: 1,
	plus: 2,
	gold: 3,
};

const Subscriptions = ({ fromHome = false }: { fromHome?: boolean }) => {
	const { userSubscription } = useUser();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector((state) => state.payments.paymentCreation);
	const { models, loading: subscriptionLoading } = useAppSelector(
		(state) => state.payments.getSubscriptions
	);
	const { loading: cancelSubLoading } = useAppSelector(
		(state) => state.payments.cancelSubscription
	);
	useEffect(() => {
		dispatch(getSubscriptions());
	}, [dispatch]);

	const [duration, setDuration] = useState<'month' | 'year'>('month');
	const [plan, setPlan] = useState<'basic' | 'plus' | 'gold'>(
		userSubscription === 'plus' ? 'gold' : 'plus'
	);

	const handleClick = () => {
		dispatch(
			createPayment({
				subscriptionRequest: {
					newSubscriptionModel: subscriptionLevels[plan],
					redirectPath: location.pathname,
					term: duration,
				},
			})
		);
	};

	let headingMessage;
	if (userSubscription === 'gold') {
		headingMessage =
			'You’re on the Gold plan! Enjoy all the exclusive features';
	} else if (fromHome && userSubscription === 'basic') {
		headingMessage = 'Select a plan to get started with exclusive features';
	} else {
		headingMessage = 'Upgrade your plan to unlock additional features';
	}
	return (
		<div className="xl:py-6 space-y-12 lg:px-52 w-full pt-16 px-2">
			<div className="flex justify-center">
				<div className="text-4xl text-center font-semibold max-w-2xl">
					{headingMessage}
				</div>
			</div>
			{userSubscription !== 'gold' && (
				<div className="flex items-center flex-col space-y-6">
					<Tabs
						defaultValue="monthly"
						className="w-[350px] md:w-[400px]"
						value={duration}
						onValueChange={(value) => setDuration(value as 'month' | 'year')}
					>
						<TabsList className="grid w-full grid-cols-2 rounded-3xl">
							<TabsTrigger value="month" className="rounded-3xl">
								Monthly
							</TabsTrigger>
							<TabsTrigger value="year" className="rounded-3xl">
								Yearly
							</TabsTrigger>
						</TabsList>
					</Tabs>
					{subscriptionLoading ? (
						<Skeleton className="h-20 w-[350px] md:w-[400px]" />
					) : (
						<Tabs
							defaultValue="plus"
							className="w-[350px] md:w-[400px] "
							value={plan}
							onValueChange={(value) => setPlan(value as 'plus' | 'gold')}
						>
							<TabsList className="grid w-full grid-cols-2 h-fit">
								{models
									?.slice(1)
									.map(({ id, name, priceMonthly, priceYearly }) => (
										<TabsTrigger
											key={id}
											value={id}
											disabled={id === userSubscription}
										>
											<div>
												<div className="text-2xl">{name}</div>
												<div className="flex items-end space-x-2">
													<div className="text-2xl flex">
														<IndianRupee size="20" className="pt-1" />
														{priceMonthly && priceYearly
															? duration === 'month'
																? (priceMonthly / 100).toFixed(0)
																: (priceYearly / 100).toFixed(0)
															: null}
													</div>
													<div className="pb-1">/{duration}</div>
												</div>
											</div>
										</TabsTrigger>
									))}
							</TabsList>
						</Tabs>
					)}
					<Button
						className="font-semibold w-[350px] md:w-[400px]"
						onClick={handleClick}
						disabled={loading}
					>
						{loading ? <Spinner /> : `Continue with ${plan}`}
					</Button>
				</div>
			)}
			<Table>
				<TableHeader>
					<TableRow className="hover:bg-background border-none">
						<TableHead></TableHead>
						<TableHead className="text-xl text-center font-semibold">
							Basic
						</TableHead>
						<TableHead
							className={`text-xl text-center font-semibold ${plan === 'plus' ? 'bg-primary-foreground' : ''}`}
						>
							Plus
						</TableHead>
						<TableHead
							className={`text-xl text-center font-semibold ${plan === 'gold' ? 'bg-primary-foreground' : ''}`}
						>
							Gold
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{features.map(({ feature, basic, plus, gold }, i) => (
						<TableRow key={i} className="border-none hover:bg-background">
							<TableCell>{feature}</TableCell>
							<TableCell className="text-center">
								{basic ? (
									<CircleCheck className="text-green-500 inline" />
								) : (
									<CircleX className="text-red-500 inline" />
								)}
							</TableCell>
							<TableCell
								className={`text-center ${plan === 'plus' ? 'bg-primary-foreground' : ''}`}
							>
								{plus ? (
									<CircleCheck className="text-green-500 inline" />
								) : (
									<CircleX className="text-red-500 inline" />
								)}
							</TableCell>
							<TableCell
								className={`text-center ${plan === 'gold' ? 'bg-primary-foreground' : ''}`}
							>
								{gold ? (
									<CircleCheck className="text-green-500 inline" />
								) : (
									<CircleX className="text-red-500 inline" />
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{fromHome &&
			(userSubscription === 'gold' || userSubscription === 'plus') ? (
				<div className="flex flex-col items-center justify-center w-full gap-2 py-6">
					<div className="text-center text-md text-gray-400 max-w-lg">
						You’re on the{' '}
						{userSubscription.charAt(0).toUpperCase() +
							userSubscription.slice(1)}{' '}
						plan.
					</div>
					<Button
						variant="secondary"
						onClick={() => dispatch(cancelSubscription())}
					>
						{cancelSubLoading ? <Spinner /> : 'Cancel Subscription'}
					</Button>
				</div>
			) : (
				<></>
			)}
		</div>
		// </div>
	);
};

export default Subscriptions;
