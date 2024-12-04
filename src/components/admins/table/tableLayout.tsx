import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import CellMap from '@/components/admins/table/cellMap.tsx';
import { TableConfig } from '@/utils/types.ts';

type Props<T extends Record<string, any>> = {
	title: string;
	tableCaption?: string;
	tableConfig: TableConfig;
	data: T[];
	loading: boolean;
	showTableCaption: boolean;
	hasEdit?: boolean;
	onEdit?: (id: string) => void;
	hasDelete?: boolean;
	onDelete?: (id: string) => void;
	deleteLoading?: boolean;
	deleteStateId?: string;
};

const getAlignment = (alignment?: 'center' | 'left' | 'right') => {
	if (!alignment) return '';
	return `text-${alignment}`;
};

const TableLayout = <T extends Record<string, any>>({
	title,
	tableCaption,
	tableConfig,
	data,
	loading,
	showTableCaption,
	hasEdit,
	onEdit,
	hasDelete,
	onDelete,
	deleteLoading,
	deleteStateId,
}: Props<T>) => {
	return (
		<div className="w-full">
			<Table title={title}>
				{tableCaption && showTableCaption && (
					<TableCaption>{tableCaption}</TableCaption>
				)}
				<TableHeader>
					<TableRow>
						{tableConfig.map((column) => (
							<TableHead
								key={String(column.columnId)}
								className={getAlignment(column.alignment)}
							>
								{column.columnTitle}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody className={loading ? 'opacity-70 animate-pulse' : ''}>
					{data.map((row, rowIndex) => (
						<TableRow key={rowIndex}>
							{tableConfig.map((column) => (
								<TableCell
									key={`${column.columnId}-${rowIndex}`}
									className={getAlignment(column.alignment)}
								>
									<CellMap
										value={row[column.columnId]}
										type={column.type}
										nodeElement={column.nodeElement}
									/>
								</TableCell>
							))}
							{hasEdit && (
								<TableCell onClick={() => (onEdit ? onEdit(row._id) : {})}>
									<CellMap type="edit" />
								</TableCell>
							)}
							{hasDelete && (
								<TableCell onClick={() => (onDelete ? onDelete(row._id) : {})}>
									<CellMap
										value={deleteLoading && deleteStateId === row._id}
										type="delete"
									/>
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default TableLayout;
