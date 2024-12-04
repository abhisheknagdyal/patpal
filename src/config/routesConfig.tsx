import React from 'react';
import {
	Store as StoreIcon,
	Home as HomeIcon,
	Hospital,
	Heart,
	Cat,
	Rss,
	Backpack,
	Scissors,
	Truck,
} from 'lucide-react';

import Adoption from '@/pages/adoption/adoption.tsx';
import Boarding from '@/pages/boarding/boarding.tsx';
import Breeding from '@/pages/breeding/breeding.tsx';
import Home from '@/pages/home/home.tsx';
import PetSocialNetwork from '@/pages/social/petSocialNetwork.tsx';
import ProductStore from '@/pages/e-com/store/productStore.tsx';
import VetCare from '@/pages/vetcare/vetCare.tsx';
import AdminPage from '@/pages/admins/adminPage.tsx';
import PersonnelBoarder from '@/pages/admins/personnelBoarder.tsx';
import PersonnelGroomer from '@/pages/admins/personnelGroomer.tsx';
import Grooming from '@/pages/grooming/grooming.tsx';
import Cart from '@/pages/e-com/cart/cart.tsx';
import Wishlist from '@/pages/e-com/wishlist/wishlist.tsx';
import OnBoarding from '@/pages/auth/onBoarding.tsx';
import MyPets from '@/pages/account/myPets.tsx';
import PetDetailsWrapper from '@/components/pets/petDetailsWrapper.tsx';
import MyRequests from '@/pages/account/myRequests.tsx';
import AcceptedRequestsGroomers from '@/pages/admins/requests/acceptedRequestsGroomers.tsx';
import AcceptedRequestsBoarders from '@/pages/admins/requests/acceptedRequestsBoarders.tsx';
import LiveMonitoring from '@/pages/account/liveMonitoring.tsx';
import BreedingMatch from '@/pages/breeding/breedingMatch.tsx';
import Subscriptions from '@/pages/subscriptions/subscriptions.tsx';
import Doctors from '@/pages/vetcare/doctors/doctors.tsx';
import ChatBot from '@/pages/vetcare/vetica/chatBot.tsx';
import DoctorDetails from '@/pages/vetcare/doctors/doctorDetails.tsx';
import ProductDetails from '@/pages/e-com/store/productDetails.tsx';
import MyOrders from '@/pages/e-com/orders/myOrders.tsx';
import ChatWrapper from '@/pages/social/chats/chatWrapper.tsx';
import MyChatsPage from '@/pages/social/chats/myChatsPage.tsx';
import ActivityTracking from '@/pages/account/activityTracking.tsx';
import ProfilePage from '@/pages/account/profilePage.tsx';
import Transport from '@/pages/transport/transport.tsx';
import PersonnelTransporter from '@/pages/admins/personnelTransporter.tsx';
import AcceptRequestsTransporters from '@/pages/admins/requests/acceptRequestsTransporters.tsx';

import { ROUTES } from '@/constants/routes.ts';

export type Role = 'user' | 'admin' | 'boarder' | 'groomer' | 'transporter';

export type RouteConfig = {
	path: string;
	title: string;
	element: React.ReactNode;
	requiredSubscription: 'basic' | 'plus' | 'gold';
	nonHeader?: boolean;
	role: Role[];
	icon?: React.ReactNode;
};

export const routesConfig: RouteConfig[] = [
	{
		path: ROUTES.HOME,
		title: 'Home',
		element: <Home />,
		requiredSubscription: 'basic',
		role: ['user'],
		icon: <HomeIcon />,
	},
	{
		path: ROUTES.ADMIN,
		element: <AdminPage />,
		title: 'Home',
		requiredSubscription: 'basic',
		role: ['admin'],
		icon: <HomeIcon />,
	},
	{
		path: ROUTES.PERSONNEL_BOARDER,
		title: 'Home',
		element: <PersonnelBoarder />,
		requiredSubscription: 'basic',
		role: ['boarder'],
		icon: <HomeIcon />,
	},
	{
		path: ROUTES.PERSONNEL_GROOMER,
		title: 'Home',
		element: <PersonnelGroomer />,
		requiredSubscription: 'basic',
		role: ['groomer'],
		icon: <HomeIcon />,
	},
	{
		path: ROUTES.PERSONNEL_TRANSPORTER,
		title: 'Home',
		element: <PersonnelTransporter />,
		requiredSubscription: 'basic',
		role: ['transporter'],
		icon: <HomeIcon />,
	},
	{
		path: ROUTES.PROFILE,
		title: 'Profile',
		element: <ProfilePage />,
		requiredSubscription: 'basic',
		role: ['user', 'boarder', 'groomer', 'transporter'],
		nonHeader: true,
	},
	{
		path: ROUTES.ADOPTION.index,
		title: 'Adoption',
		element: <Adoption />,
		requiredSubscription: 'basic',
		role: ['user'],
		icon: <Cat />,
	},
	{
		path: ROUTES.ADOPTION.getAdoptablePetPath(':id'),
		title: 'Pet Details',
		element: <PetDetailsWrapper isAdoption={true} />,
		requiredSubscription: 'basic',
		role: ['user'],
		nonHeader: true,
	},
	{
		path: ROUTES.GROOMING,
		title: 'Grooming',
		element: <Grooming />,
		requiredSubscription: 'plus',
		role: ['user'],
		icon: <Scissors />,
	},
	{
		path: ROUTES.TRANSPORT,
		title: 'Transport',
		element: <Transport />,
		requiredSubscription: 'gold',
		role: ['user'],
		icon: <Truck />,
	},
	{
		path: ROUTES.BOARDING,
		title: 'Boarding',
		element: <Boarding />,
		requiredSubscription: 'plus',
		role: ['user'],
		icon: <Backpack />,
	},
	{
		path: ROUTES.BREEDING.index,
		title: 'Breeding',
		element: <Breeding />,
		requiredSubscription: 'gold',
		role: ['user'],
		icon: <Heart />,
	},
	{
		path: ROUTES.BREEDING.match,
		title: 'Breeding Match',
		element: <BreedingMatch />,
		requiredSubscription: 'gold',
		role: ['user'],
		nonHeader: true,
	},
	{
		path: ROUTES.VET_CARE.index,
		title: 'Vet Care',
		element: <VetCare />,
		requiredSubscription: 'plus',
		role: ['user'],
		icon: <Hospital />,
	},
	{
		path: ROUTES.VET_CARE.doctors,
		title: 'Doctors',
		element: <Doctors />,
		requiredSubscription: 'gold',
		role: ['user'],
		nonHeader: true,
	},
	{
		path: ROUTES.VET_CARE.bot,
		title: 'Vetica',
		element: <ChatBot />,
		requiredSubscription: 'plus',
		role: ['user'],
		nonHeader: true,
	},
	{
		path: ROUTES.VET_CARE.getDoctorPath(':id'),
		title: 'Doctor Details',
		element: <DoctorDetails />,
		requiredSubscription: 'gold',
		role: ['user'],
		nonHeader: true,
	},
	{
		path: ROUTES.SOCIAL_NETWORK.index,
		title: 'Social',
		element: <PetSocialNetwork />,
		requiredSubscription: 'gold',
		role: ['user'],
		icon: <Rss />,
	},
	{
		path: ROUTES.SOCIAL_NETWORK.myChats,
		title: 'Social My Chats',
		element: <MyChatsPage />,
		requiredSubscription: 'gold',
		role: ['user'],
		nonHeader: true,
	},
	{
		path: ROUTES.SOCIAL_NETWORK.singleChat,
		title: 'Social Single Chat',
		element: <ChatWrapper />,
		requiredSubscription: 'gold',
		role: ['user'],
		nonHeader: true,
	},
	{
		path: ROUTES.STORE.store,
		title: 'Store',
		element: <ProductStore />,
		requiredSubscription: 'basic',
		role: ['user', 'groomer', 'boarder', 'transporter'],
		icon: <StoreIcon />,
	},
	{
		path: ROUTES.STORE.cart,
		title: 'Cart',
		element: <Cart />,
		requiredSubscription: 'basic',
		nonHeader: true,
		role: ['user', 'boarder', 'groomer', 'transporter'],
	},
	{
		path: ROUTES.STORE.wishlist,
		title: 'Wishlist',
		element: <Wishlist />,
		requiredSubscription: 'basic',
		nonHeader: true,
		role: ['user', 'boarder', 'groomer', 'transporter'],
	},
	{
		path: ROUTES.STORE.myOrders,
		title: 'My Orders',
		element: <MyOrders />,
		requiredSubscription: 'basic',
		nonHeader: true,
		role: ['user', 'boarder', 'groomer', 'transporter'],
	},
	{
		path: ROUTES.STORE.getProductPath(':id'),
		title: 'Wishlist',
		element: <ProductDetails />,
		requiredSubscription: 'basic',
		nonHeader: true,
		role: ['user', 'boarder', 'groomer', 'transporter'],
	},
	{
		path: ROUTES.MY_PETS.index,
		title: 'My Pets',
		element: <MyPets />,
		requiredSubscription: 'basic',
		role: ['user'],
		nonHeader: true,
	},
	{
		path: ROUTES.MY_PETS.singlePet,
		title: 'My Pets',
		element: <PetDetailsWrapper isAdoption={false} />,
		requiredSubscription: 'basic',
		role: ['user'],
		nonHeader: true,
	},
	{
		path: ROUTES.ONBOARDING,
		title: 'Onboarding',
		element: <OnBoarding />,
		requiredSubscription: 'basic',
		role: ['user', 'boarder', 'groomer', 'transporter'],
		nonHeader: true,
	},
	{
		path: ROUTES.MY_REQUESTS,
		title: 'My Requests',
		element: <MyRequests />,
		requiredSubscription: 'basic',
		role: ['user'],
		nonHeader: true,
	},
	{
		path: ROUTES.MY_REQUESTS,
		title: 'My Requests',
		element: <AcceptedRequestsGroomers />,
		requiredSubscription: 'basic',
		role: ['groomer'],
		nonHeader: true,
	},
	{
		path: ROUTES.MY_REQUESTS,
		title: 'My Requests',
		element: <AcceptedRequestsBoarders />,
		requiredSubscription: 'basic',
		role: ['boarder'],
		nonHeader: true,
	},
	{
		path: ROUTES.MY_REQUESTS,
		title: 'My Requests',
		element: <AcceptRequestsTransporters />,
		requiredSubscription: 'basic',
		role: ['transporter'],
		nonHeader: true,
	},
	{
		path: ROUTES.LIVE_MONITORING.index,
		title: 'Live Monitoring',
		element: <LiveMonitoring />,
		requiredSubscription: 'gold',
		role: ['user'],
		nonHeader: true,
	},
	{
		path: ROUTES.ACTIVITY_TRACKING.index,
		title: 'Activity Tracking',
		element: <ActivityTracking />,
		requiredSubscription: 'gold',
		role: ['user'],
		nonHeader: true,
	},
	{
		path: ROUTES.SUBSCRIPTION,
		title: 'Subscription',
		element: <Subscriptions fromHome={true} />,
		requiredSubscription: 'basic',
		role: ['user'],
		nonHeader: true,
	},
];
