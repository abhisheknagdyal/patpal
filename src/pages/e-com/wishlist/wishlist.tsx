import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';

import { getMyWishlist } from '@/redux/reducers/store/fetchWishlistReducer.ts';
import { addToWishlist } from '@/redux/reducers/store/addToWishlistReducer.ts';

import Spinner from '@/components/spinner.tsx';
import WishlistSkeleton from '@/components/skeletons/wishlistSkeleton.tsx';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes.ts';

const Wishlist = () => {
	const dispatch = useAppDispatch();
	const [refresh, setRefresh] = useState(false);
	const navigate = useNavigate();

	const { wishlist, loading: wishlistLoading } = useAppSelector(
		(state) => state.store.fetchWishlist
	);
	const { loading, idInState } = useAppSelector(
		(state) => state.store.addToWishlist
	);

	useEffect(() => {
		dispatch(getMyWishlist());
	}, [dispatch, refresh]);

	const handleRemoveFromWishlist = (id: string, name: string) => {
		dispatch(
			addToWishlist({ body: { productId: id }, name: name, action: 'remove' })
		).then(() => setRefresh((prevState) => !prevState));
	};

	if (wishlistLoading) {
		return <WishlistSkeleton />;
	}

	return (
		<div className="px-6 py-12 max-w-6xl mx-auto">
			<h1 className="text-3xl font-semibold mb-8">My Wishlist</h1>

			{wishlist?.items.length === 0 ? (
				<div className="text-center">
					<p className="text-lg text-gray-500 mb-4">Your wishlist is empty</p>
					<Button
						variant="outline"
						className="bg-blue-600 text-white"
						onClick={() => navigate(ROUTES.STORE.store)}
					>
						Browse Products
					</Button>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
					{wishlist?.items.map(({ product }) => (
						<div
							key={product._id}
							className="border rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105"
							onClick={() => navigate(ROUTES.STORE.getProductPath(product._id))}
						>
							<img
								src={product.images[0]}
								alt={product.name}
								className="w-full h-48 object-cover"
							/>
							<div className="p-4 space-y-2">
								<div className="flex justify-between items-center">
									<h2 className="text-xl font-semibold">{product.name}</h2>
								</div>
								<p className="text-xl font-semibold">₹{product.price}</p>
								<div className="pt-6">
									<Button
										disabled={loading}
										variant="outline"
										className="w-full"
										onClick={(e) => {
											e.stopPropagation();
											handleRemoveFromWishlist(product._id, product.name);
										}}
									>
										{loading && idInState === product._id ? (
											<Spinner />
										) : (
											<>
												<Trash size={18} /> Remove
											</>
										)}
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Wishlist;
