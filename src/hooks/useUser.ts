import { useAppSelector } from '@/hooks/reduxHooks.ts';

import { SubscriptionLevel } from '@/utils/types.ts';
import { Role } from '@/config/routesConfig.tsx';

export const useUser = () => {
	const { user } = useAppSelector((state) => state.auth.login);

	if (!user) {
		return { userSubscription: null, userRole: null, email: null };
	}

	const userSubscription: SubscriptionLevel = user?.subscription_model;
	const userRole: Role = user?.isAdmin
		? 'admin'
		: user?.isPersonnelBoarder
			? 'boarder'
			: user?.isPersonnelGroomer
				? 'groomer'
				: user?.isPersonnelTransporter
					? 'transporter'
					: 'user';
	const email = user?.email;

	return { userSubscription, userRole, email, username: user.username, user };
};
