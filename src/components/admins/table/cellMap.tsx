import { getFormattedTime } from '@/utils/time.ts';
import { TableConfig } from '@/utils/types.ts';
import { Button } from '@/components/ui/button.tsx';
import { Pencil, Trash2 } from 'lucide-react';
import Spinner from '@/components/spinner.tsx';

type Props = {
	value?: string | boolean;
	type: TableConfig[0]['type'] | 'edit' | 'delete';
	nodeElement?: TableConfig[0]['nodeElement'];
};

const CellMap = ({ value, type, nodeElement: Node }: Props) => {
	if (Node) return <Node value={value} />;

	switch (type) {
		case 'string':
			return <span>{String(value)}</span>;
		case 'boolean':
			return <span>{value ? 'Yes' : 'No'}</span>;
		case 'number':
			return <span>{Number(value)}</span>;
		case 'datetime':
			return (
				<span>{typeof value === 'string' && getFormattedTime(value)}</span>
			);
		case 'edit':
			return (
				<Button variant="secondary" className="h-6 w-6">
					<Pencil size={6} />
				</Button>
			);
		case 'delete':
			return (
				<Button variant="destructive" className="h-6 w-6">
					{value ? <Spinner /> : <Trash2 size={6} />}
				</Button>
			);
		default:
			return <span>{value}</span>;
	}
};

export default CellMap;
