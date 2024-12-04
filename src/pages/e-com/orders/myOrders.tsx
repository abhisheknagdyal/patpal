import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { getMyOrders } from '@/redux/reducers/store/fetchMyOrdersReducer.ts';

import OrderCard from '@/components/e-com/orderCard.tsx';
import MyOrdersSkeleton from '@/components/skeletons/myOrdersSkeleton.tsx';

import { ROUTES } from '@/constants/routes.ts';
import { fetchInvoiceFromOrder } from '@/redux/reducers/payments/fetchOrderInvoiceReducer.ts';

const MyOrders = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { orders, loading } = useAppSelector(
		(state) => state.store.fetchMyOrders
	);
	const { loading: invoiceLoading, idInState } = useAppSelector(
		(state) => state.store.fetchInvoice
	);

	useEffect(() => {
		dispatch(getMyOrders({ skip: 0 }));
	}, [dispatch]);

	const handleInvoiceClick = (invoiceID: string) => {
		dispatch(fetchInvoiceFromOrder({ invoiceID }));
	};

	const handleOrderItemClick = (productId: string) => {
		navigate(ROUTES.STORE.getProductPath(productId));
	};

	return (
		<div className="max-w-screen-lg mx-auto md:p-6 p-4">
			<div className="text-2xl font-semibold mb-6">My Orders</div>
			{loading ? (
				<MyOrdersSkeleton />
			) : orders.count === 0 ? (
				<div className="text-center text-gray-500 text-lg">
					You have no orders yet.
				</div>
			) : (
				<div className="space-y-6">
					{orders.results.map((order) => (
						<OrderCard
							key={order._id}
							order={order}
							loading={invoiceLoading && idInState === order.invoiceId}
							onInvoiceClick={handleInvoiceClick}
							onOrderItemClick={handleOrderItemClick}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default MyOrders;
