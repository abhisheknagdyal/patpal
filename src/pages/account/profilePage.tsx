import { useUser } from '@/hooks/useUser.ts';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/tabs.tsx';
import EditUserButton from '@/components/account/editUserButton.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ROUTES } from '@/constants/routes.ts';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
	const navigate = useNavigate();
	const { user, userRole } = useUser();
	const { details, username, email, subscription_model } = user || {};
	const { name, address, contact, photo_url, city } = details || {};

	return (
		<div className="xl:px-20 py-20 xl:py-12">
			<div className="max-w-7xl mx-auto p-8 shadow-lg rounded-xl">
				<div className="flex flex-col md:flex-row justify-between gap-8 items-center">
					<div className="flex items-center space-x-6">
						<img
							src={photo_url || 'https://via.placeholder.com/150'}
							alt={name || 'User Profile'}
							className="w-20 h-20 rounded-full border-4 border-primary"
						/>
						<div>
							<h1 className="text-3xl font-semibold text-gray-200 capitalize">
								{name}
							</h1>
							<p className="text-sm text-gray-600">{username}</p>
						</div>
					</div>
					{userRole === 'user' && <EditUserButton defaultValues={details} />}
				</div>
				<div className="mt-8">
					<Tabs defaultValue="contact">
						<TabsList className="grid grid-flow-col justify-self-center max-w-3xl">
							<TabsTrigger value="contact">Contact Info</TabsTrigger>
							<TabsTrigger value="subscription">Subscription</TabsTrigger>
							<TabsTrigger value="address">Address</TabsTrigger>
						</TabsList>
						<div className="mt-6">
							<TabsContent value="contact">
								<div>
									<h2 className="text-2xl font-semibold text-gray-200">
										Contact Information
									</h2>
									<ul className="space-y-3 mt-4">
										<li className="text-gray-400">
											<strong>Phone:</strong> {contact || 'No phone provided'}
										</li>
										<li className="text-gray-400">
											<strong>Email:</strong> {email}
										</li>
									</ul>
								</div>
							</TabsContent>
							<TabsContent value="subscription">
								<div>
									<h2 className="text-2xl font-semibold text-gray-200">
										Subscription Details
									</h2>
									<p className="text-gray-400 mt-4">
										<strong>Model:</strong>{' '}
										{subscription_model || 'No subscription model available'}
									</p>
									<Button
										className="mt-4"
										variant="secondary"
										onClick={() => navigate(ROUTES.SUBSCRIPTION)}
									>
										Check Pricing
									</Button>
								</div>
							</TabsContent>
							<TabsContent value="address">
								<div>
									<h2 className="text-2xl font-semibold text-gray-200">
										Address
									</h2>
									<p className="text-gray-400 mt-4">
										{address || 'No address provided'}
									</p>
									{city && <p className="text-gray-400 mt-2">{city}</p>}
								</div>
							</TabsContent>
						</div>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
