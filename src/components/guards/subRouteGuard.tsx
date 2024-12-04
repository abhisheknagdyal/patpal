import { ReactNode } from 'react';

import Subscriptions from '@/pages/subscriptions/subscriptions.tsx';

import { useUser } from '@/hooks/useUser.ts';
import { SubscriptionLevel } from '@/utils/types.ts';

type SubRouteGuardProps = {
	children: ReactNode;
	requiredSubscription: SubscriptionLevel;
};

const isValidSubscriptionLevel = (level?: string): boolean => {
	return ['basic', 'plus', 'gold'].includes(level ?? '');
};

const SubRouteGuard = ({
	requiredSubscription,
	children,
}: SubRouteGuardProps) => {
	const { userSubscription } = useUser();
	const subscriptionLevels: Record<SubscriptionLevel, number> = {
		basic: 1,
		plus: 2,
		gold: 3,
	};

	window.scrollTo(0, 0);

	if (!userSubscription || !isValidSubscriptionLevel(userSubscription)) {
		return <Subscriptions />;
	}

	const userLevel = subscriptionLevels[userSubscription as SubscriptionLevel];
	const requiredLevel = subscriptionLevels[requiredSubscription];

	if (userLevel >= requiredLevel) {
		return <>{children}</>;
	}

	return <Subscriptions />;
};

export default SubRouteGuard;
