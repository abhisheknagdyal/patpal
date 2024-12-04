import { ConfigField } from '@/utils/types.ts';

export const DoctorsFormConfig: ConfigField[] = [
	{
		name: 'name',
		label: 'Doctor Name',
		element: 'input',
		desc: 'Enter the full name of the doctor.',
		elementConfig: {
			placeholder: 'Dr. John Doe',
			type: 'text',
		},
	},
	{
		name: 'specialization',
		label: 'Specialization',
		element: 'input',
		desc: 'Specify the field of specialization (e.g., Dermatology, Surgery).',
		elementConfig: {
			placeholder: 'e.g., Dermatology',
			type: 'text',
		},
	},
	{
		name: 'licenseNumber',
		label: 'License Number',
		element: 'input',
		desc: 'Enter the unique license number of the doctor.',
		elementConfig: {
			placeholder: 'e.g., ABC12345',
			type: 'text',
		},
	},
	{
		name: 'contact.phone',
		label: 'Contact Number',
		element: 'input',
		desc: "Enter the doctor's contact number.",
		elementConfig: {
			placeholder: '+91',
			type: 'text',
		},
	},
	{
		name: 'contact.email',
		label: 'Email',
		element: 'input',
		desc: "Enter the doctor's email address.",
		elementConfig: {
			placeholder: 'doctor@example.com',
			type: 'email',
		},
	},
	{
		name: 'clinicAddress.street',
		label: 'Street Address',
		element: 'textarea',
		desc: 'Provide the street address of the clinic.',
		elementConfig: {
			placeholder: 'e.g., 123 Main St',
		},
	},
	{
		name: 'clinicAddress.city',
		label: 'City',
		element: 'input',
		desc: 'Provide the city where the clinic is located.',
		elementConfig: {
			placeholder: 'e.g., New York',
			type: 'text',
		},
	},
	{
		name: 'clinicAddress.state',
		label: 'State',
		element: 'input',
		desc: 'Provide the state where the clinic is located.',
		elementConfig: {
			placeholder: 'e.g., California',
			type: 'text',
		},
	},
	{
		name: 'clinicAddress.postalCode',
		label: 'Postal Code',
		element: 'input',
		desc: "Enter the postal code of the clinic's address.",
		elementConfig: {
			placeholder: 'e.g., 902100',
			type: 'text',
		},
	},
	{
		name: 'clinicAddress.country',
		label: 'Country',
		element: 'input',
		desc: 'Enter the country where the clinic is located.',
		elementConfig: {
			placeholder: 'e.g., USA',
			type: 'text',
		},
	},
	{
		name: 'experienceYears',
		label: 'Years of Experience',
		element: 'slider',
		desc: 'Specify the number of years the doctor has been practicing.',
		elementConfig: {
			min: 0,
			max: 50,
			step: 1,
			defaultValue: 0,
		},
		className: 'col-span-12',
	},
	{
		name: 'bio',
		label: 'Biography',
		element: 'textarea',
		desc: 'Provide a brief biography of the doctor, including expertise and background.',
		className: 'col-span-12',
		elementConfig: {
			placeholder: 'Enter details about the doctor...',
		},
	},
	{
		name: 'availability.timeSlots',
		label: 'Available Time Slots',
		element: 'datetime',
		desc: 'Specify the time range the doctor is available.',
		elementConfig: {
			showDate: false,
		},
		className: 'col-span-12 md:col-span-6',
	},
	{
		label: 'Available Days',
		name: 'availability.days',
		element: 'multi-select',
		desc: 'Select the days when doctor is available.',
		placeholder: 'Select days',
		elementConfig: [
			{ value: 'monday', label: 'Monday' },
			{ value: 'tuesday', label: 'Tuesday' },
			{ value: 'wednesday', label: 'Wednesday' },
			{ value: 'thursday', label: 'Thursday' },
			{ value: 'friday', label: 'Friday' },
			{ value: 'saturday', label: 'Saturday' },
			{ value: 'sunday', label: 'Sunday' },
		],
	},
	{
		name: 'profilePicture',
		label: 'Profile Picture',
		element: 'file-input',
		desc: 'Upload a profile picture of the doctor.',
		elementConfig: {
			maxFiles: 1,
			maxSize: 1024 * 1024 * 4, // 4 MB
			acceptedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
		},
		className: 'col-span-12 md:col-span-6',
	},
];
