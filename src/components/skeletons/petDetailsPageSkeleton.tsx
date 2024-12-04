import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Calendar, Heart, Info, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge.tsx';

const PetDetailsPageSkeleton = () => {
	return (
		<div className="flex flex-col items-center min-h-screen py-4 xl:py-12 px-4">
			<div className="w-full max-w-3xl bg-primary-foreground shadow-lg rounded-2xl overflow-hidden">
				<div className="relative w-full h-80">
					<Skeleton className="w-full h-full" />
					<div className="absolute bottom-4 left-4 px-4 py-2">
						<Skeleton className="w-32 h-8 mb-2" />
						<Skeleton className="w-24 h-6" />
					</div>
				</div>

				<div className="p-8 space-y-6">
					<div className="text-center">
						<Skeleton className="w-32 h-6 mx-auto mb-2" />
						<div className="flex items-center justify-center gap-2 mt-2">
							<MapPin className="w-5 h-5 text-gray-400" />
							<Skeleton className="w-24 h-6" />
						</div>
					</div>

					{/* Badges Skeleton */}
					<div className="grid grid-cols-2 gap-4 mt-4">
						{Array(6)
							.fill(null)
							.map((_, index) => (
								<Badge
									variant="secondary"
									key={index}
									className="flex flex-col items-center p-4 rounded-xl"
								>
									<Skeleton className="w-12 h-4 mb-2" />
									<Skeleton className="w-16 h-6" />
								</Badge>
							))}
					</div>

					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<Info className="w-5 h-5 text-gray-400" />
							<Skeleton className="w-3/4 h-6" />
						</div>
						<div className="flex items-center gap-2">
							<Heart className="w-5 h-5 text-gray-400" />
							<Skeleton className="w-2/3 h-6" />
						</div>
						<div className="flex items-center gap-2">
							<Calendar className="w-5 h-5 text-gray-400" />
							<Skeleton className="w-1/2 h-6" />
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4 mt-4">
						{Array(4)
							.fill(null)
							.map((_, index) => (
								<div key={index} className="flex items-center gap-2">
									<Skeleton className="w-6 h-6" />
									<Skeleton className="w-1/2 h-6" />
								</div>
							))}
					</div>

					<div className="flex justify-end mt-4">
						<Skeleton className="w-32 h-10 rounded-md" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PetDetailsPageSkeleton;
