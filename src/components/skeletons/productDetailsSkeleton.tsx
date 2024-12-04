import { Skeleton } from '@/components/ui/skeleton';

const ProductDetailsSkeleton = () => {
	return (
		<div className="px-4 md:px-10 py-6 max-w-7xl mx-auto">
			<div className="flex flex-col md:flex-row gap-6">
				<div className="flex-1">
					<Skeleton className="w-full h-80 md:h-[400px] rounded-lg" />
				</div>
				<div className="flex-1 space-y-4">
					<div className="space-y-2">
						<Skeleton className="h-6 w-3/4 md:w-1/2" />
						<Skeleton className="h-4 w-1/4" />
						<Skeleton className="h-6 w-1/3" />
					</div>
					<Skeleton className="h-1 w-full" />
					<div className="space-y-4">
						<div>
							<Skeleton className="h-5 w-1/4" />
							<div className="flex gap-2 mt-2">
								<Skeleton className="h-10 w-10 rounded-lg" />
								<Skeleton className="h-10 w-10 rounded-lg" />
								<Skeleton className="h-10 w-10 rounded-lg" />
							</div>
						</div>
						<div>
							<Skeleton className="h-5 w-1/4" />
							<div className="flex gap-2 mt-2">
								<Skeleton className="h-10 w-10 rounded-full" />
								<Skeleton className="h-10 w-10 rounded-full" />
								<Skeleton className="h-10 w-10 rounded-full" />
							</div>
						</div>
					</div>
					<Skeleton className="h-1 w-full" />
					<div className="flex items-center gap-4">
						<Skeleton className="h-12 w-24 rounded-lg" />
						<Skeleton className="h-12 w-32 rounded-lg" />
						<Skeleton className="h-12 w-32 rounded-lg" />
					</div>
					<Skeleton className="h-1 w-full" />
					<Skeleton className="h-4 w-3/4" />
					<Skeleton className="h-4 w-2/3" />
					<Skeleton className="h-4 w-1/2" />
				</div>
			</div>
		</div>
	);
};

export default ProductDetailsSkeleton;
