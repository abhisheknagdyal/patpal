import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card.tsx';

const DoctorCardSkeleton = () => {
	return (
		<Card className="max-w-xs w-full shadow-lg rounded-lg overflow-hidden">
			<Skeleton className="bg-zinc-800 h-52 w-full" />
			<div className="p-6 space-y-4">
				<div>
					<Skeleton className="h-5 w-2/3 bg-zinc-700 mb-2" />
					<Skeleton className="h-4 w-1/3 bg-zinc-700" />
				</div>
				<div className="flex items-center space-x-2">
					<Skeleton className="h-2 w-2/3 bg-zinc-700 rounded-full" />
					<Skeleton className="h-4 w-8 bg-zinc-700" />
				</div>
				<div className="pt-4">
					<Skeleton className="h-10 w-full bg-zinc-700 rounded-md" />
				</div>
			</div>
		</Card>
	);
};

export default DoctorCardSkeleton;
