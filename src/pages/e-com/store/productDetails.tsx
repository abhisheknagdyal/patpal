import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { toast } from 'sonner';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import useUrlDispatch from '@/hooks/useUrlDispatch.ts';
import { FILTERS_CHANGED } from '@/hooks/urlReducer.ts';

import CustomCarousel from '@/components/e-com/customCarousel';
import ProductDetailsSkeleton from '@/components/skeletons/productDetailsSkeleton';
import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heart, IndianRupee } from 'lucide-react';

import { getProductById } from '@/redux/reducers/store/fetchSingleProductReducer';
import { updateCart } from '@/redux/reducers/store/updateCartReducer';
import { addToWishlist } from '@/redux/reducers/store/addToWishlistReducer';
import { getMyWishlist } from '@/redux/reducers/store/fetchWishlistReducer';

const ProductDetails = () => {
	const [refresh, setRefresh] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [errors, setErrors] = useState({
		colorError: false,
		sizeError: false,
	});
	const { id } = useParams();
	const location = useLocation();
	const query = queryString.parse(location.search);

	const { dispatch } = useUrlDispatch({ replace: true });
	const appDispatch = useAppDispatch();
	const { product, loading, error } = useAppSelector(
		(state) => state.store.fetchSingleProduct
	);
	const { wishlist, loading: wishlistLoading } = useAppSelector(
		(state) => state.store.fetchWishlist
	);
	const { loading: wishlistActionInProgress } = useAppSelector(
		(state) => state.store.addToWishlist
	);
	const { loading: cartUpdateLoading } = useAppSelector(
		(state) => state.store.updateCart
	);

	const loadWishlistButton = wishlistLoading || wishlistActionInProgress;
	const isPresentInWishlist =
		wishlist?.items.findIndex((wishlist) => wishlist.product._id === id) >= 0;

	useEffect(() => {
		if (id) {
			appDispatch(getProductById(id));
		}
	}, [appDispatch, id]);

	useEffect(() => {
		appDispatch(getMyWishlist());
	}, [appDispatch, refresh]);

	const handleIncrement = () => setQuantity((prev) => Math.min(prev + 1, 10));
	const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

	const handleAddToCart = () => {
		const hasColorError = product.category === 'Accessories' && !query.color;
		const hasSizeError = product.category === 'Accessories' && !query.size;

		setErrors({ colorError: hasColorError, sizeError: hasSizeError });

		if (hasColorError || hasSizeError) return;

		const newBody = {
			productId: product._id,
			quantity: quantity,
			...(query.color && { color: query.color as string }),
			...(query.size && { size: query.size as string }),
		};

		appDispatch(updateCart({ body: newBody })).then(() => {
			toast.success('Item added to cart', {
				action: {
					label: 'Ok',
					onClick: () => null,
				},
			});
		});
	};

	if (loading) {
		return <ProductDetailsSkeleton />;
	}
	if (error) {
		return (
			<div className="px-6 py-8 text-center text-md text-gray-400 font-semibold">
				{error}
			</div>
		);
	}
	return (
		<div className="px-4 md:px-10 py-6 max-w-7xl mx-auto">
			<div className="flex flex-col md:flex-row gap-6">
				<div className="flex-1">
					{product.images && <CustomCarousel images={product?.images} />}
				</div>
				<div className="flex-1 space-y-4">
					<div className="space-y-2">
						<h1 className="text-xl md:text-2xl font-semibold">
							{product.name}
						</h1>
						<div className="flex items-center gap-1 text-lg md:text-xl font-semibold">
							<IndianRupee size={20} /> {product.price}
						</div>
					</div>
					<Separator />
					{product.category === 'Accessories' && (
						<>
							<div className="space-y-2">
								<label
									className={`text-sm font-medium ${
										errors.sizeError ? 'text-red-600' : ''
									}`}
								>
									Size
								</label>
								<div className="flex flex-wrap gap-2">
									{product.sizesAvailable?.map((size) => (
										<button
											key={size}
											onClick={() =>
												dispatch({
													type: FILTERS_CHANGED,
													payload: {
														newFilters: size,
														filterName: 'size',
													},
												})
											}
											className={`px-3 py-2 border rounded-lg ${
												query.size === size
													? 'bg-blue-600 text-white'
													: 'bg-gray-100 text-gray-700'
											}`}
										>
											{size}
										</button>
									))}
								</div>
							</div>
							<div className="space-y-2">
								<label
									className={`text-sm font-medium ${
										errors.colorError ? 'text-red-600' : ''
									}`}
								>
									Color
								</label>
								<div className="flex flex-wrap gap-2">
									{product.colorsAvailable?.map((colorAvailable) => (
										<Button
											key={colorAvailable}
											onClick={() =>
												dispatch({
													type: FILTERS_CHANGED,
													payload: {
														newFilters: colorAvailable,
														filterName: 'color',
													},
												})
											}
											className={`w-8 h-8 rounded-full ${
												colorAvailable === query.color
													? 'ring-2 ring-blue-500'
													: ''
											}`}
											style={{ backgroundColor: colorAvailable }}
										/>
									))}
								</div>
							</div>
							<Separator />
						</>
					)}
					<div className="flex items-center gap-4">
						<div className="flex items-center border rounded-lg">
							<button
								onClick={handleDecrement}
								className="px-3 py-2 text-lg font-medium"
							>
								−
							</button>
							<div className="px-4 text-lg font-medium">{quantity}</div>
							<button
								onClick={handleIncrement}
								className="px-3 py-2 text-lg font-medium"
							>
								+
							</button>
						</div>
						<Button
							className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
							onClick={handleAddToCart}
							disabled={cartUpdateLoading}
						>
							{cartUpdateLoading ? <Spinner /> : 'Add to Cart'}
						</Button>
						{!isPresentInWishlist ? (
							<Button
								variant="outline"
								className="flex-1"
								onClick={() =>
									appDispatch(
										addToWishlist({
											body: { productId: product._id },
											name: product.name,
											action: 'add',
										})
									).then(() => setRefresh((prevState) => !prevState))
								}
							>
								{loadWishlistButton ? <Spinner /> : <Heart />}
							</Button>
						) : (
							<Button
								variant="outline"
								className="flex-1"
								onClick={() =>
									appDispatch(
										addToWishlist({
											body: { productId: product._id },
											name: product.name,
											action: 'remove',
										})
									).then(() => setRefresh((prevState) => !prevState))
								}
							>
								{loadWishlistButton ? (
									<Spinner />
								) : (
									<Heart fill="red" className=" text-red-500" size={40} />
								)}
							</Button>
						)}
					</div>
					<Separator />
					<div className="text-gray-600 text-sm">{product.description}</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
