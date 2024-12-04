import { Skeleton } from '@/components/ui/skeleton';

const StoreFiltersSkeleton = () => {
	return (
		<div className="w-full xl:w-1/4 mb-8 xl:mb-0">
			<div className="mb-8">
				<Skeleton className="h-6 w-24 mb-4 hidden xl:block" />
				<div className="flex xl:flex-wrap gap-2 overflow-x-auto">
					{Array.from({ length: 4 }).map((_, index) => (
						<Skeleton
							key={index}
							className="h-8 w-20 rounded-lg flex-shrink-0 xl:flex-shrink"
						/>
					))}
				</div>
			</div>
			<div>
				<Skeleton className="h-6 w-24 mb-4 hidden xl:block" />
				<div className="flex xl:grid gap-2 overflow-x-auto">
					{Array.from({ length: 6 }).map((_, index) => (
						<Skeleton
							key={index}
							className="h-8 w-20 rounded-lg flex-shrink-0 xl:flex-shrink"
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default StoreFiltersSkeleton;
