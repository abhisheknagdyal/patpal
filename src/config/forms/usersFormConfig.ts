import { ConfigField } from '@/utils/types.ts';

export const UsersFormConfig: ConfigField[] = [
	{
		name: 'username',
		label: 'Username',
		element: 'input',
		desc: 'Enter users username.',
		elementConfig: {
			placeholder: 'johnDoe',
			type: 'text',
		},
	},
	{
		name: 'email',
		label: 'Email',
		element: 'input',
		desc: 'Enter users email.',
		elementConfig: {
			placeholder: 'john@doe.co',
			type: 'email',
		},
	},
	{
		name: 'role',
		label: 'User Role',
		element: 'radio',
		desc: '',
		elementConfig: [
			{ id: 'isAdmin', value: 'isAdmin', label: 'Admin' },
			{
				id: 'isPersonnelBoarder',
				value: 'isPersonnelBoarder',
				label: 'Boarder',
			},
			{
				id: 'isPersonnelGroomer',
				value: 'isPersonnelGroomer',
				label: 'Groomer',
			},
			{
				id: 'isPersonnelTransporter',
				value: 'isPersonnelTransporter',
				label: 'Transporter',
			},
		],
	},
];
