import { ConfigField } from '@/utils/types.ts';

export const GroomerBoarderOnBoardFormConfig: ConfigField[] = [
	{
		name: 'name',
		label: 'Name',
		element: 'input',
		desc: 'Enter your name',
		elementConfig: {
			placeholder: 'John Doe',
			type: 'text',
		},
		className: 'col-span-12 ',
	},
	{
		name: 'contact',
		label: 'Contact Number',
		element: 'input',
		desc: 'Enter your contact number',
		elementConfig: {
			placeholder: '+91',
			type: 'text',
		},
		className: 'col-span-12',
	},
	{
		name: 'address',
		label: 'Address',
		element: 'textarea',
		desc: 'Enter your address',
		elementConfig: {
			placeholder: '',
		},
		className: 'col-span-12',
	},
	{
		name: 'petType',
		label: 'Types of Pet',
		element: 'tag',
		desc: 'Enter the types of pets you are comfortable with',
		elementConfig: {
			placeholder: 'Cat',
		},
		className: 'col-span-12',
	},
	{
		name: 'city',
		label: 'City',
		element: 'input',
		desc: 'Provide the current location of the pet (e.g., city or shelter).',
		elementConfig: {
			placeholder: 'City name',
		},
		className: 'col-span-12 ',
	},
	{
		name: 'photo_url',
		label: 'Photo',
		element: 'file-input',
		desc: 'Upload photos or documents related to your service.',
		elementConfig: {
			maxFiles: 5,
			maxSize: 1024 * 1024 * 4, // 4 MB
			acceptedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
		},
		className: 'col-span-12 ',
	},
	{
		name: 'timeAvailable',
		label: 'Time Range',
		element: 'datetime',
		desc: 'Specify the time range you are available at',
		elementConfig: {
			showDate: false,
		},
	},
];
