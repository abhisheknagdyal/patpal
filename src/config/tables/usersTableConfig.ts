import { TableConfig } from '@/utils/types.ts';
import StatusBlock from '@/components/admins/table/statusBlock.tsx';

const usersTableConfig: TableConfig = [
	{ columnTitle: 'Username', columnId: 'username', type: 'string' },
	{ columnTitle: 'Email', columnId: 'email', type: 'string' },
	{ columnTitle: 'Admin', columnId: 'isAdmin', type: 'boolean' },
	{ columnTitle: 'Groomer', columnId: 'isPersonnelGroomer', type: 'boolean' },
	{ columnTitle: 'Boarder', columnId: 'isPersonnelBoarder', type: 'boolean' },
	{
		columnTitle: 'Transporter',
		columnId: 'isPersonnelTransporter',
		type: 'boolean',
	},
	{ columnTitle: 'Created at', columnId: 'createdAt', type: 'datetime' },
	{
		columnTitle: 'Active status',
		columnId: 'isActive',
		type: 'boolean',
		nodeElement: StatusBlock,
		alignment: 'center',
	},
];

export default usersTableConfig;
