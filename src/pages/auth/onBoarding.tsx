import { useEffect } from 'react';
import { useUser } from '@/hooks/useUser.ts';
import { useNavigate } from 'react-router-dom';
import { getHomeRoute } from '@/utils/auth/workflow.ts';
import GroomerOnBoardForm from '@/components/onBoardForms/groomerOnBoardForm.tsx';
import BoarderOnBoardForm from '@/components/onBoardForms/boarderOnBoardForm.tsx';
import UserOnBoardForm from '@/components/onBoardForms/userOnBoardForm.tsx';
import TransporterOnBoardForm from '@/components/onBoardForms/transporterOnBoardForm.tsx';

const OnBoarding = () => {
	const navigate = useNavigate();
	const { user, userRole } = useUser();

	useEffect(() => {
		if (user && user.isActive) navigate(getHomeRoute(user));
	}, [navigate, user]);

	if (!user) return null;

	const component = () => {
		switch (userRole) {
			case 'groomer':
				return <GroomerOnBoardForm user={user} />;
			case 'boarder':
				return <BoarderOnBoardForm user={user} />;
			case 'transporter':
				return <TransporterOnBoardForm user={user} />;
			case 'user':
				return <UserOnBoardForm user={user} />;
		}
	};

	return (
		<div className="flex flex-col justify-center items-center w-full min-h-screen py-12">
			<span className="text-2xl font-semibold">On Boarding</span>
			<div className=" px-6 border-2 rounded-2xl mt-6">{component()}</div>
		</div>
	);
};

export default OnBoarding;
