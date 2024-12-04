import { Card } from '@/components/ui/card.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const DoctorDetailsSkeleton = () => {
	return (
		<div className="max-w-3xl mx-auto p-6 space-y-6">
			<Card className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
				<div className="md:w-1/3 w-full bg-zinc-900 h-52">
					<Skeleton className="object-cover h-full w-full bg-center" />
				</div>
				<div className="p-6 flex flex-col justify-between space-y-4 md:w-2/3">
					<Skeleton className="w-3/4 h-6" />
					<Skeleton className="w-1/2 h-5 bg-[#673ab7]" />
					<Skeleton className="w-1/3 h-4" />
				</div>
			</Card>

			<Card className="shadow-lg rounded-lg p-6 space-y-4">
				<Skeleton className="w-2/3 h-6" />
				<Skeleton className="h-4" />
			</Card>

			<Card className="shadow-lg rounded-lg p-6 space-y-4">
				<Skeleton className="w-1/2 h-6" />
				<Skeleton className="h-4 " />
				<Skeleton className="h-4 " />
			</Card>

			<Card className="shadow-lg rounded-lg p-6 space-y-4">
				<Skeleton className="w-1/3 h-6" />
				<Skeleton className="h-4 " />
			</Card>
		</div>
	);
};

export default DoctorDetailsSkeleton;
