import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

type Props = {
	count: number;
	skip: number;
	setPagination: (newSkip: number) => void;
};

const Paginator = ({ count, skip, setPagination }: Props) => {
	const pages = Math.ceil(count / 10);
	const currentPage = Math.ceil(skip / 10);
	if (pages <= 1) return null;
	return (
		<div className="mt-5">
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							className="cursor-pointer"
							onClick={() => (currentPage <= 0 ? {} : setPagination(skip - 10))}
						/>
					</PaginationItem>
					{currentPage !== 0 && (
						<PaginationItem>
							<PaginationLink
								onClick={() => setPagination(0)}
								className="cursor-pointer"
							>
								1
							</PaginationLink>
						</PaginationItem>
					)}
					{currentPage + 1 === pages && (
						<PaginationItem className="pointer-events-none">
							<PaginationEllipsis />
						</PaginationItem>
					)}
					<PaginationItem className="pointer-events-none">
						<PaginationLink isActive>{currentPage + 1}</PaginationLink>
					</PaginationItem>
					{currentPage === 0 && (
						<PaginationItem className="pointer-events-none">
							<PaginationLink>{currentPage + 2}</PaginationLink>
						</PaginationItem>
					)}
					{currentPage + 1 !== pages && (
						<PaginationItem className="pointer-events-none">
							<PaginationEllipsis />
						</PaginationItem>
					)}
					{currentPage + 1 !== pages && (
						<PaginationItem>
							<PaginationLink
								className="cursor-pointer"
								onClick={() => setPagination((pages - 1) * 10)}
							>
								{+pages}
							</PaginationLink>
						</PaginationItem>
					)}
					<PaginationItem>
						<PaginationNext
							className="cursor-pointer"
							onClick={() =>
								currentPage >= +pages - 1 ? {} : setPagination(skip + 10)
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};

export default Paginator;
