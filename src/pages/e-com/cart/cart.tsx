import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CartItemCard from '@/components/e-com/cartItemCard.tsx';
import { Button } from '@/components/ui/button';
import CartSkeleton from '@/components/skeletons/cartSkeleton.tsx';
import Spinner from '@/components/spinner.tsx';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import {
	getCart,
	addItemQuantity,
	removeItemQuantity,
	changeItemColor,
	changeItemSize,
	deleteItem,
} from '@/redux/reducers/store/fetchCartReducer.ts';
import { updateCart } from '@/redux/reducers/store/updateCartReducer.ts';
import { deleteFromCart } from '@/redux/reducers/store/deleteFromCartReducer.ts';
import { createOrder } from '@/redux/reducers/payments/createOrderReducer.ts';
import { ROUTES } from '@/constants/routes.ts';
import { IndianRupee } from 'lucide-react';

const Cart = () => {
	const dispatch = useAppDispatch();
	const path = '/store';
	const navigate = useNavigate();

	const { cart, loading } = useAppSelector((state) => state.store.getCart);
	const { loading: creatingOrder } = useAppSelector(
		(state) => state.payments.createOrder
	);

	useEffect(() => {
		dispatch(getCart());
	}, [dispatch]);

	const handleQuantityChange = (
		id: string,
		delta: number,
		action: 'add' | 'remove',
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.stopPropagation();
		dispatch(updateCart({ body: { productId: id, quantity: delta } }));
		switch (action) {
			case 'add':
				dispatch(addItemQuantity(id));
				break;
			case 'remove':
				dispatch(removeItemQuantity(id));
				break;
		}
	};

	const handleSizeChange = (
		id: string,
		size: string,
		qty: number,
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.stopPropagation();
		dispatch(
			updateCart({ body: { productId: id, quantity: qty, size: size } })
		);
		dispatch(changeItemSize({ id: id, size: size }));
	};

	const handleColorChange = (
		id: string,
		color: string,
		qty: number,
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.stopPropagation();
		dispatch(
			updateCart({ body: { productId: id, quantity: qty, color: color } })
		);
		dispatch(changeItemColor({ id: id, color: color }));
	};

	const handleDelete = (
		id: string,
		name: string,
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.stopPropagation();
		dispatch(deleteItem(id));
		dispatch(
			deleteFromCart({
				body: { productId: id },
				name: name,
			})
		);
	};

	const handleNavigate = (id: string) => {
		navigate(ROUTES.STORE.getProductPath(id));
	};

	if (loading) {
		return <CartSkeleton />;
	}
	return (
		<div className="xl:px-10 px-4 py-4 xl:py-8 max-w-screen-xl mx-auto rounded-lg shadow-md">
			<h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
			<div className="flex-col flex xl:flex-row gap-8 relative">
				<div className="space-y-6 flex-1">
					{cart.items.length === 0 ? (
						<div>
							<p className="text-lg text-gray-500 font-medium mt-4">
								Your cart is empty. Start shopping to add items!
							</p>
						</div>
					) : (
						cart?.items?.map(({ product, quantity, color, size }) => (
							<CartItemCard
								key={product._id}
								product={product}
								quantity={quantity}
								color={color}
								size={size}
								onQuantityChange={handleQuantityChange}
								onSizeChange={handleSizeChange}
								onColorChange={handleColorChange}
								onDelete={handleDelete}
								onCardClick={handleNavigate}
							/>
						))
					)}
				</div>
				<div className="flex flex-col xl:w-1/4 xl:h-96 mb-6 xl:mb-0 sticky top-10 ring-0 gap-4 self-end xl:self-start">
					{cart.items.length > 0 && (
						<>
							<div className="text-2xl font-semibold flex gap-2">
								Total:
								<div className="flex items-center">
									<IndianRupee />
									{cart?.items
										.reduce(
											(acc, item) => acc + item.product.price * item.quantity,
											0
										)
										.toFixed(2)}
								</div>
							</div>
							<Button
								className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
								disabled={creatingOrder}
								onClick={() => dispatch(createOrder({ path }))}
							>
								{creatingOrder ? <Spinner /> : 'Proceed to Checkout'}
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Cart;
