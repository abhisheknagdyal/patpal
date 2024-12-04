import { Skeleton } from '@/components/ui/skeleton.tsx';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card.tsx';

const PetCardSkeleton = () => {
	return (
		<Card className="w-80 cursor-pointer">
			<CardHeader className="p-3 rounded-xl">
				<Skeleton className="h-56 rounded-xl w-full object-contain object-center" />
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					<Skeleton className="h-4 w-1/2 bg-gray-300 rounded" />
					<Skeleton className="h-6 w-3/4 bg-gray-300 rounded" />
					<div className="flex items-center gap-2">
						<Skeleton className="h-4 w-4 bg-gray-300 rounded" />
						<Skeleton className="h-4 w-1/3 bg-gray-300 rounded" />
					</div>
				</div>
				<div className="flex space-x-4 mt-6 text-red-500 h-6">
					<Skeleton className="h-6 w-6 rounded-full" />
					<Skeleton className="h-6 w-6 rounded-full" />
					<Skeleton className="h-6 w-6 rounded-full" />
					<Skeleton className="h-6 w-6 rounded-full" />
				</div>
			</CardContent>
			<CardFooter>
				<Skeleton className="h-10 w-full rounded" />
			</CardFooter>
		</Card>
	);
};

export default PetCardSkeleton;
