import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';

const PetProfileCardSkeleton = () => {
	return (
		<div className="relative group w-80">
			<Card className="w-full overflow-hidden">
				<CardHeader className="p-3 rounded-xl">
					<Skeleton className="h-56 w-full rounded-xl" />
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-6 w-48" />
						<Skeleton className="h-4 w-48" />
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default PetProfileCardSkeleton;
