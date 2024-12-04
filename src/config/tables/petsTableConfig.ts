import { TableConfig } from '@/utils/types.ts';
import AdoptionBlock from '@/components/admins/table/adoptionBlock.tsx';

const petsTableConfig: TableConfig = [
	{ columnTitle: 'Name', columnId: 'name', type: 'string' },
	{ columnTitle: 'Animal', columnId: 'species', type: 'string' },
	{ columnTitle: 'Breed', columnId: 'breed', type: 'string' },
	{ columnTitle: 'Age', columnId: 'age', type: 'number' },
	{ columnTitle: 'Vaccinated', columnId: 'vaccinated', type: 'boolean' },
	{ columnTitle: 'Neutered', columnId: 'spayed_neutered', type: 'boolean' },
	{ columnTitle: 'Created at', columnId: 'createdAt', type: 'datetime' },
	{
		columnTitle: 'Status',
		columnId: 'adoption_status',
		type: 'string',
		nodeElement: AdoptionBlock,
		alignment: 'center',
	},
];

export default petsTableConfig;
