import { TableConfig } from '@/utils/types.ts';
import StockBlock from '@/components/admins/table/stockBlock.tsx';

const productsTableConfig: TableConfig = [
	{ columnTitle: 'Name', columnId: 'name', type: 'string' },
	{ columnTitle: 'Brand', columnId: 'brand', type: 'string' },
	{ columnTitle: 'Category', columnId: 'category', type: 'string' },
	{ columnTitle: 'Price', columnId: 'price', type: 'number' },
	{ columnTitle: 'Pet type', columnId: 'petType', type: 'string' },
	{ columnTitle: 'Created at', columnId: 'createdAt', type: 'datetime' },
	{
		columnTitle: 'Stock',
		columnId: 'stock',
		type: 'number',
		nodeElement: StockBlock,
	},
];

export default productsTableConfig;
