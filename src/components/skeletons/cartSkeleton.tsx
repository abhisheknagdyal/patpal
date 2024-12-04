import CartItemCardSkeleton from '@/components/skeletons/cartItemCardSkeleton.tsx';

const CartSkeleton = () => {
	return (
		<div className="xl:px-10 px-4 py-4 xl:py-8 max-w-screen-xl mx-auto">
			<h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
			<div className="flex gap-8">
				<div className="space-y-6 flex-1">
					{[...Array(3)].map((_, index) => (
						<CartItemCardSkeleton key={index} />
					))}
				</div>
				<div className="w-1/4"></div>
			</div>
		</div>
	);
};

export default CartSkeleton;
