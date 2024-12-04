import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Badge } from '@/components/ui/badge.tsx';

const RequestsCardSkeleton = () => {
	return (
		<div>
			<Card className="w-80 bg-primary-foreground border-none">
				<CardHeader className="p-5">
					<div className="flex gap-4">
						<Skeleton className="h-14 w-14 rounded-lg" />
						<div className="flex justify-end flex-1">
							<div className="flex-1 w-full">
								<Skeleton className="h-4 w-3/4 mb-1" />
								<Skeleton className="h-4 w-1/2" />
							</div>
							<div className="ml-2 w-8 h-8">
								<Badge
									className="w-full h-full p-0 flex justify-center"
									variant="secondary"
								>
									<Skeleton className="w-full h-full rounded-full" />
								</Badge>
							</div>
						</div>
					</div>
				</CardHeader>
				<CardContent className="px-5 pb-5">
					<div className="bg-zinc-800 px-4 py-3 rounded-lg flex justify-between">
						<div className="flex text-xs items-center gap-2">
							<Skeleton className="h-4 w-16" />
						</div>
						<div className="flex text-xs items-center gap-2">
							<Skeleton className="h-4 w-20" />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default RequestsCardSkeleton;
