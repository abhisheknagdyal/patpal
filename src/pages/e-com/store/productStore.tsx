import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import useUrlDispatch from '@/hooks/useUrlDispatch';
import useScrollToTop from '@/hooks/useScrollToTop.ts';

import ProductCard from '@/components/e-com/productCard';
import ProductCardSkeleton from '@/components/skeletons/productCardSkeleton';
import StoreFiltersSkeleton from '@/components/skeletons/storeFIltersSkeleton.tsx';

import { PAGINATION_CHANGED, STORE_FILTERS_CHANGED } from '@/hooks/urlReducer';
import { getProducts } from '@/redux/reducers/store/fetchProductsReducer';
import { getFilters } from '@/redux/reducers/store/fetchFiltersReducer';
import { ROUTES } from '@/constants/routes';

import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import Paginator from '@/components/paginator/paginator.tsx';

const ProductStore = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const query = queryString.parse(location.search);
	const scrollRef = useScrollToTop(query);

	const appDispatch = useAppDispatch();
	const { dispatch } = useUrlDispatch({ replace: true });
	const { products, loading } = useAppSelector(
		(state) => state.store.fetchProducts
	);
	const { filters, loading: filtersLoading } = useAppSelector(
		(state) => state.store.getFilters
	);

	useEffect(() => {
		appDispatch(
			getProducts({
				skip: Number(query.skip) || 0,
				petType: query.petType as string,
				category: query.category as string,
				sort: query.sort as string,
			})
		);
	}, [appDispatch, query.category, query.petType, query.skip, query.sort]);

	useEffect(() => {
		appDispatch(getFilters());
	}, [appDispatch]);

	const handleSortChange = (value: string) =>
		dispatch({ type: STORE_FILTERS_CHANGED, payload: { sort: value } });

	const handleCategoryChange = (category: string) => {
		dispatch({ type: STORE_FILTERS_CHANGED, payload: { category: category } });
	};

	const handlePetTypeChange = (type: string) => {
		dispatch({ type: STORE_FILTERS_CHANGED, payload: { petType: type } });
	};

	const navigateFunction = (id: string) =>
		navigate(ROUTES.STORE.getProductPath(id));

	const setPagination = (pagination: number) => {
		dispatch({
			type: PAGINATION_CHANGED,
			payload: { skip: pagination },
		});
	};
	return (
		<div
			className="xl:px-10 px-4 py-4 xl:py-8 max-w-screen-xl mx-auto flex flex-col xl:flex-row xl:gap-8"
			ref={scrollRef}
		>
			{filtersLoading ? (
				<StoreFiltersSkeleton />
			) : (
				<div className="xl:w-1/4">
					<div className="mb-8">
						<h2 className="text-lg font-semibold mb-4 hidden xl:block">
							Pet Type
						</h2>
						<div className="flex xl:flex-wrap gap-2 overflow-x-auto">
							{filters?.petType?.map((type) => (
								<Button
									variant="secondary"
									key={type}
									onClick={() => handlePetTypeChange(type)}
									className={`flex items-center justify-start gap-2 w-fit p-3 rounded-lg ${
										query.petType === type
											? 'bg-[#F69946] text-white hover:bg-amber-500'
											: ''
									}`}
								>
									<span className="text-sm">{type}</span>
								</Button>
							))}
						</div>
					</div>
					<div className="mb-8">
						<h2 className="text-lg font-semibold mb-4 hidden xl:block">
							Categories
						</h2>
						<div className="xl:grid gap-2 flex overflow-x-auto">
							{filters?.categories?.map((category) => (
								<Button
									key={category}
									variant="ghost"
									onClick={() => handleCategoryChange(category)}
									className={`w-fit text-sm justify-start ${
										query.category == category
											? 'bg-[#F69946] text-white hover:bg-amber-500'
											: ''
									}`}
								>
									{category}
								</Button>
							))}
						</div>
					</div>
				</div>
			)}
			<div className="xl:w-3/4">
				<div className="w-52 justify-self-end mb-6 xl:pr-6">
					<Select
						value={query.sort as string}
						defaultValue="default"
						onValueChange={handleSortChange}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select an option" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="default">Default Sorting</SelectItem>
							<SelectItem value="lowToHigh">Price: Low to High</SelectItem>
							<SelectItem value="highToLow">Price: High to Low</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="grid gap-6 grid-cols-1 justify-self-center md:grid-cols-2 lg:grid-cols-3">
					{loading ? (
						[...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)
					) : products.count === 0 ? (
						<div className="col-span-full text-center text-lg font-medium text-gray-500">
							No Products to show at the moment. Please try again later
						</div>
					) : (
						products.results?.map((product) => (
							<ProductCard
								key={product._id}
								product={product}
								handleNavigate={navigateFunction}
							/>
						))
					)}
				</div>
				<div className="pt-6">
					<Paginator
						count={products.count}
						skip={Number(query.skip) || 0}
						setPagination={setPagination}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductStore;
