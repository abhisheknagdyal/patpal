import { TableConfig } from '@/utils/types.ts';

const doctorsTableConfig: TableConfig = [
	{ columnTitle: 'Name', columnId: 'name', type: 'string' },
	{ columnTitle: 'License Number', columnId: 'licenseNumber', type: 'string' },
	{
		columnTitle: 'Years of Experience',
		columnId: 'experienceYears',
		type: 'string',
	},
	{ columnTitle: 'Specialization', columnId: 'specialization', type: 'string' },
	{ columnTitle: 'Created at', columnId: 'createdAt', type: 'datetime' },
];

export default doctorsTableConfig;
