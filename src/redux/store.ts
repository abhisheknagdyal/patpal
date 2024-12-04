import { configureStore, combineReducers } from '@reduxjs/toolkit';

import LoginReducer from './reducers/auth/loginReducer';
import RegisterReducer from './reducers/auth/registerReducer';
import ConfigReducer from '@/redux/reducers/configReducer.ts';
import CreatePaymentReducer from '@/redux/reducers/payments/createPaymentReducer.ts';
import UsersReducer from '@/redux/reducers/admin/usersReducer.ts';
import AdoptionPetsReducer from '@/redux/reducers/admin/adoptionPetsReducer.ts';
import ProductsReducer from '@/redux/reducers/admin/productsReducer.ts';
import SubscriptionReducer from '@/redux/reducers/payments/subscriptionReducer.ts';
import CreateMyPetReducer from '@/redux/reducers/pets/createMyPetReducer.ts';
import CreateAdoptionReducer from '@/redux/reducers/pets/createAdoptionReducer.ts';
import RegisterNewUserReducer from '@/redux/reducers/admin/registerNewUserReducer.ts';
import CheckCredentialsReducer from '@/redux/reducers/auth/checkCredentialsReducer.ts';
import FetchGroomersReducer from '@/redux/reducers/groomers/fetchGroomersReducer.ts';
import FetchBoardersReducer from '@/redux/reducers/boarders/fetchBoardersReducer.ts';
import OnBoardGroomerReducer from '@/redux/reducers/groomers/onBoardGroomerReducer.ts';
import OnBoardBoarderReducer from '@/redux/reducers/boarders/onBoardBoarderReducer.ts';
import OnBoardUserReducer from '@/redux/reducers/users/onBoardUserReducer.ts';
import PetAdoptionReducer from '@/redux/reducers/pets/petAdoptionReducer.ts';
import GetAdoptablePetByIdReducer from '@/redux/reducers/pets/getAdoptionReducer.ts';
import FetchMyPetsReducer from '@/redux/reducers/pets/fetchMyPetsReducer.ts';
import FetchMySinglePetReducer from '@/redux/reducers/pets/fetchMySinglePetReducer.ts';
import PutPetForAdoptionReducer from '@/redux/reducers/pets/putPetForAdoptionReducer.ts';
import CancelAdoptionReducer from '@/redux/reducers/pets/cancelAdoptionReducer.ts';
import RequestGroomerServiceReducer from '@/redux/reducers/groomers/requestGroomerServiceReducer.ts';
import FetchMyGroomerRequestsReducer from '@/redux/reducers/groomers/fetchMyGroomerRequestsReducer.ts';
import GroomerRequests from '@/redux/reducers/groomers/groomerRequests.ts';
import GroomerActionsReducer from '@/redux/reducers/groomers/groomerActionsReducer.ts';
import RequestBoarderServiceReducer from '@/redux/reducers/boarders/requestBoarderServiceReducer.ts';
import FetchMyBoarderRequestsReducer from '@/redux/reducers/boarders/fetchMyBoarderRequestsReducer.ts';
import BoardersActionsReducer from '@/redux/reducers/boarders/boardersActionsReducer.ts';
import BoardersRequests from '@/redux/reducers/boarders/boardersRequests.ts';
import MonitoringReducer from '@/redux/reducers/boarders/monitoring/monitoringReducer.ts';
import FetchDoctorsReducer from '@/redux/reducers/doctors/fetchDoctorsReducer.ts';
import UpdateMyPetReducer from '@/redux/reducers/pets/updateMyPetReducer.ts';
import FetchAllPetsReducer from '@/redux/reducers/pets/fetchAllPetsReducer.ts';
import GetMatchScoreReducer from '@/redux/reducers/breeding/getMatchScoreReducer.ts';
import FetchSinglePetReducer from '@/redux/reducers/pets/fetchSinglePetReducer.ts';
import CancelSubscriptionReducer from '@/redux/reducers/payments/cancelSubscriptionReducer.ts';
import GetFiltersReducer from '@/redux/reducers/pets/filtersReducer.ts';
import FetchSingleDoctorReducer from '@/redux/reducers/doctors/fetchSingleDoctorReducer.ts';
import FetchProductsReducer from '@/redux/reducers/store/fetchProductsReducer.ts';
import FetchSingleProductReducer from '@/redux/reducers/store/fetchSingleProductReducer.ts';
import UpdateCartReducer from '@/redux/reducers/store/updateCartReducer.ts';
import FetchCartReducer from '@/redux/reducers/store/fetchCartReducer.ts';
import FetchFiltersReducer from '@/redux/reducers/store/fetchFiltersReducer.ts';
import DeleteFromCartReducer from '@/redux/reducers/store/deleteFromCartReducer.ts';
import AddToWishlistReducer from '@/redux/reducers/store/addToWishlistReducer.ts';
import FetchWishlistReducer from '@/redux/reducers/store/fetchWishlistReducer.ts';
import FetchMyOrdersReducer from '@/redux/reducers/store/fetchMyOrdersReducer.ts';
import CreateOrderReducer from '@/redux/reducers/payments/createOrderReducer.ts';
import FetchOrderInvoiceReducer from '@/redux/reducers/payments/fetchOrderInvoiceReducer.ts';
import GetStatusReducer from '@/redux/reducers/social/getStatusReducer.ts';
import GetMessagesByIdReducer from '@/redux/reducers/social/getMessagesByIdReducer.ts';
import CreateProductReducer from '@/redux/reducers/store/createProductReducer.ts';
import FetchAllUsersReducer from '@/redux/reducers/social/fetchAllUsersReducer.ts';
import LikeUserReducer from '@/redux/reducers/social/likeUserReducer.ts';
import UnlikeUserReducer from '@/redux/reducers/social/unlikeUserReducer.ts';
import UnmatchReducer from '@/redux/reducers/social/unmatchReducer.ts';
import FetchMyMatchesReducer from '@/redux/reducers/social/fetchMyMatches.ts';
import FetchMyBreedingMatches from '@/redux/reducers/social/fetchMyBreedingMatches.ts';
import EditProductReducer from '@/redux/reducers/store/editProductReducer.ts';
import EditAdoptionPetReducer from '@/redux/reducers/pets/editAdoptionPetReducer.ts';
import DeleteAdoptionPetReducer from '@/redux/reducers/pets/deleteAdoptionPetReducer.ts';
import DeleteProductReducer from '@/redux/reducers/store/deleteProductReducer.ts';
import CreateDoctorReducer from '@/redux/reducers/doctors/createDoctorReducer.ts';
import UpdateUserReducer from '@/redux/reducers/users/updateUserReducer.ts';
import EditDoctorsReducer from '@/redux/reducers/doctors/editDoctorsReducer.ts';
import DeleteDoctorReducer from '@/redux/reducers/doctors/deleteDoctorReducer.ts';
import OnBoardTransportersReducers from '@/redux/reducers/transport/onBoardTransportersReducers.ts';
import FetchTransportersReducer from '@/redux/reducers/transport/fetchTransportersReducer.ts';
import RequestTransporterServiceReducer from '@/redux/reducers/transport/requestTransporterServiceReducer.ts';
import TransporterActionsReducer from '@/redux/reducers/transport/transporterActionsReducer.ts';
import TransporterRequestsReducer from '@/redux/reducers/transport/transporterRequestsReducer.ts';
import FetchMyTransportationRequestsReducer from '@/redux/reducers/transport/fetchMyTransportationRequestsReducer.ts';

const authReducer = combineReducers({
	login: LoginReducer,
	register: RegisterReducer,
	config: ConfigReducer,
	check: CheckCredentialsReducer,
});

const adminReducer = combineReducers({
	monitoredUsers: UsersReducer,
	monitoredUsersRegister: RegisterNewUserReducer,
	adoptablePets: AdoptionPetsReducer,
	products: ProductsReducer,
});

const paymentReducer = combineReducers({
	paymentCreation: CreatePaymentReducer,
	getSubscriptions: SubscriptionReducer,
	cancelSubscription: CancelSubscriptionReducer,
	createOrder: CreateOrderReducer,
});

const petsReducer = combineReducers({
	createMyPet: CreateMyPetReducer,
	createAdoption: CreateAdoptionReducer,
	editAdoption: EditAdoptionPetReducer,
	deleteAdoption: DeleteAdoptionPetReducer,
	adoptPet: PetAdoptionReducer,
	getAdoptionPet: GetAdoptablePetByIdReducer,
	getMyPets: FetchMyPetsReducer,
	fetchMySinglePet: FetchMySinglePetReducer,
	putForAdoption: PutPetForAdoptionReducer,
	cancelAdoption: CancelAdoptionReducer,
	updatePet: UpdateMyPetReducer,
	getAllPets: FetchAllPetsReducer,
	getSinglePet: FetchSinglePetReducer,
	getFilters: GetFiltersReducer,
});

const groomersReducer = combineReducers({
	fetchGroomer: FetchGroomersReducer,
	onBoard: OnBoardGroomerReducer,
	requestService: RequestGroomerServiceReducer,
	fetchMyRequests: FetchMyGroomerRequestsReducer,
	requests: GroomerRequests,
	actions: GroomerActionsReducer,
});

const boardersReducer = combineReducers({
	fetchBoarder: FetchBoardersReducer,
	onBoard: OnBoardBoarderReducer,
	requestService: RequestBoarderServiceReducer,
	fetchMyRequests: FetchMyBoarderRequestsReducer,
	actions: BoardersActionsReducer,
	requests: BoardersRequests,
	monitoring: MonitoringReducer,
});

const userReducer = combineReducers({
	onBoard: OnBoardUserReducer,
	update: UpdateUserReducer,
});

const breedingReducer = combineReducers({
	getMatchScore: GetMatchScoreReducer,
});

const doctorsReducer = combineReducers({
	fetchDoctors: FetchDoctorsReducer,
	fetchSingleDoctor: FetchSingleDoctorReducer,
	createDoctor: CreateDoctorReducer,
	editDoctor: EditDoctorsReducer,
	deleteDoctor: DeleteDoctorReducer,
});

const storeReducer = combineReducers({
	fetchProducts: FetchProductsReducer,
	fetchSingleProduct: FetchSingleProductReducer,
	updateCart: UpdateCartReducer,
	getCart: FetchCartReducer,
	getFilters: FetchFiltersReducer,
	deleteFromCart: DeleteFromCartReducer,
	addToWishlist: AddToWishlistReducer,
	fetchWishlist: FetchWishlistReducer,
	fetchMyOrders: FetchMyOrdersReducer,
	fetchInvoice: FetchOrderInvoiceReducer,
	createProduct: CreateProductReducer,
	updateProduct: EditProductReducer,
	deleteProduct: DeleteProductReducer,
});

const socialReducer = combineReducers({
	getStatus: GetStatusReducer,
	getMessages: GetMessagesByIdReducer,
	getUsers: FetchAllUsersReducer,
	getMatches: FetchMyMatchesReducer,
	getBreedingMatches: FetchMyBreedingMatches,
	likeUser: LikeUserReducer,
	unlikeUser: UnlikeUserReducer,
	unMatch: UnmatchReducer,
});

const transportReducer = combineReducers({
	onBoard: OnBoardTransportersReducers,
	fetchTransporters: FetchTransportersReducer,
	requestService: RequestTransporterServiceReducer,
	actions: TransporterActionsReducer,
	requests: TransporterRequestsReducer,
	fetchMyRequests: FetchMyTransportationRequestsReducer,
});

export const store = configureStore({
	reducer: {
		auth: authReducer,
		payments: paymentReducer,
		admin: adminReducer,
		pets: petsReducer,
		groomers: groomersReducer,
		boarders: boardersReducer,
		users: userReducer,
		breeding: breedingReducer,
		doctors: doctorsReducer,
		store: storeReducer,
		social: socialReducer,
		transport: transportReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActionPaths: [
					'payload.config',
					'payload.headers',
					'payload.request',
					'meta.arg',
				],
			},
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
