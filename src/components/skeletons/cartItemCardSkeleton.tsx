import { Skeleton } from '@/components/ui/skeleton';

const CartItemCardSkeleton = () => {
	return (
		<div className="flex flex-col sm:flex-row rounded-lg shadow p-4 space-y-4 sm:space-y-0 sm:space-x-6">
			<Skeleton className="w-full sm:w-40 h-40 rounded-lg" />
			<div className="flex-1 space-y-4">
				<div className="space-y-2">
					<Skeleton className="h-6 w-3/4" />
					<Skeleton className="h-6 w-1/3" />
				</div>
				<div className="flex items-center space-x-4">
					<Skeleton className="w-8 h-8 rounded-full" />
					<Skeleton className="h-6 w-10" />
					<Skeleton className="w-8 h-8 rounded-full" />
				</div>
				<div className="space-y-2">
					<Skeleton className="h-6 w-20" />
					<div className="flex gap-2">
						<Skeleton className="w-10 h-10 rounded-md" />
						<Skeleton className="w-10 h-10 rounded-md" />
						<Skeleton className="w-10 h-10 rounded-md" />
					</div>
				</div>
			</div>
			<Skeleton className="w-8 h-8 rounded-full self-start sm:self-auto" />
		</div>
	);
};

export default CartItemCardSkeleton;
