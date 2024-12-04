import { Skeleton } from '@/components/ui/skeleton.tsx';

const MyOrdersSkeleton = () => {
	return (
		<div className="max-w-screen-lg mx-auto pb-4">
			<div className="">
				{[...Array(3)].map((_, index) => (
					<div className="border-b pb-6 pt-4">
						<div className="flex justify-between items-center" key={index}>
							<Skeleton className="w-1/3 h-6" />
							<div className="flex items-center">
								<Skeleton className="w-20 h-6 mr-4" />
								<Skeleton className="w-8 h-8 rounded-full" />{' '}
							</div>
						</div>
						<Skeleton className="w-1/5 h-6" />
					</div>
				))}
			</div>
		</div>
	);
};

export default MyOrdersSkeleton;
