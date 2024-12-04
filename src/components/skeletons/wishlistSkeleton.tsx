import { Skeleton } from '@/components/ui/skeleton.tsx';

const WishlistSkeleton = () => {
	return (
		<div className="px-6 py-12 max-w-6xl mx-auto">
			<h1 className="text-3xl font-semibold mb-8">My Wishlist</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{[...Array(6)].map((_, index) => (
					<div
						key={index}
						className="border rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105"
					>
						<Skeleton className="w-full h-48" />
						<div className="p-4 space-y-2">
							<Skeleton className="w-32 h-6" />
							<Skeleton className="w-20 h-6" />
							<Skeleton className="w-full h-8" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default WishlistSkeleton;
