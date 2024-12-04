import { Skeleton } from '@/components/ui/skeleton';

const MatchCardSkeleton = () => {
	return (
		<div className="relative w-full xl:w-1/2 rounded-3xl mb-10">
			<div className="xl:h-[75vh] h-[50vh] snap-y snap-mandatory overflow-y-scroll rounded-3xl">
				<div className="xl:h-[75vh] h-[50vh] relative bg-gradient-to-r from-zinc-900 via-black to-zinc-900 snap-start flex">
					<div className="md:w-1/2 w-full">
						<Skeleton className="object-cover h-full w-full" />
					</div>
					<div className="md:w-1/2 absolute md:static inset-0 right-0 bottom-0 w-1/2 flex items-center">
						<div className="pl-10 text-3xl font-bold text-white break-words">
							<Skeleton className="h-8 w-2/3 mb-2" />
						</div>
					</div>
				</div>
				{[...Array(3)].map((_, index) => (
					<div
						key={index}
						className="xl:h-[75vh] h-[50vh] relative bg-gradient-to-r from-zinc-900 via-black to-zinc-900 snap-start flex items-center justify-between"
					>
						<div className="md:w-1/2 w-full h-full overflow-hidden">
							<Skeleton className="object-cover w-full h-full" />
						</div>
						<div className="w-1/2 absolute md:static inset-0 max-md:bg-zinc-800/50 pl-8 flex flex-col justify-center text-white">
							<Skeleton className="h-6 w-1/2 mb-4" />
							<Skeleton className="h-5 w-1/3 mb-2" />
							<Skeleton className="h-5 w-1/3 mb-2" />
							<Skeleton className="h-5 w-1/3 mb-2" />
							<Skeleton className="h-5 w-1/4" />
						</div>
					</div>
				))}
			</div>
			<div className="absolute -bottom-10 left-10 xl:left-40">
				<Skeleton className="rounded-full h-20 w-20" />
			</div>
			<div className="absolute -bottom-10 right-10 xl:right-40">
				<Skeleton className="rounded-full h-20 w-20" />
			</div>
		</div>
	);
};

export default MatchCardSkeleton;
