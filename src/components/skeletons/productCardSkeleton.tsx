import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ProductCarSkeleton = () => {
	return (
		<Card className="w-64">
			<CardContent className="p-0">
				<div className="h-64">
					<Skeleton className="object-cover h-full w-full rounded-t-lg" />
				</div>
			</CardContent>
			<CardFooter className="flex px-4 bg-primary-foreground py-5">
				<div className="flex-1 gap-2">
					<Skeleton className="h-6 w-3/4 mb-2" />
					<Skeleton className="h-5 w-1/2 text-lg" />
				</div>
				<Skeleton className="h-10 w-10 rounded-full" />
			</CardFooter>
		</Card>
	);
};

export default ProductCarSkeleton;
