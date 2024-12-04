import { Skeleton } from '@/components/ui/skeleton.tsx';

const ServiceCardSkeleton = () => {
	return (
		<div className="w-96 shadow-lg rounded-lg overflow-hidden bg-primary-foreground">
			<div className="relative h-80 p-4">
				<Skeleton className="object-cover h-full w-full rounded-lg" />
			</div>
			<div className="p-6 pt-2 w-full flex flex-col gap-4 justify-between">
				<div>
					<Skeleton className="h-6 w-2/3 mb-2 rounded-md" />
					<div className="flex items-center gap-2 mb-1">
						<Skeleton className="h-4 w-6 rounded-md" />
						<Skeleton className="h-4 w-2/3 rounded-md" />
					</div>
					<div className="flex items-center gap-2 mb-1">
						<Skeleton className="h-4 w-6 rounded-md" />
						<Skeleton className="h-4 w-2/3 rounded-md" />
					</div>
					<div className="flex gap-2 py-1">
						<Skeleton className="h-6 w-12 rounded-md" />
						<Skeleton className="h-6 w-12 rounded-md" />
						<Skeleton className="h-6 w-12 rounded-md" />
					</div>
					<div className="flex items-center gap-2 mt-2">
						<Skeleton className="h-4 w-6 rounded-md" />
						<Skeleton className="h-4 w-24 rounded-md" />
						<div className="flex items-center gap-2">
							<Skeleton className="h-6 w-16 rounded-md" />
							<Skeleton className="h-4 w-8 rounded-md" />
							<Skeleton className="h-6 w-16 rounded-md" />
						</div>
					</div>
				</div>
				<div className="text-center mt-4">
					<Skeleton className="h-10 w-3/4 rounded-lg" />
				</div>
			</div>
		</div>
	);
};

export default ServiceCardSkeleton;
