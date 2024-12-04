import { ConfigField } from '@/utils/types.ts';

export const PetsFormConfig: ConfigField[] = [
	{
		name: 'name',
		label: 'Name',
		element: 'input',
		desc: "Enter the pet's name.",
		elementConfig: {
			placeholder: 'Kasper',
			type: 'text',
		},
	},
	{
		name: 'color',
		label: 'Color',
		element: 'input',
		desc: 'Specify the primary color of the pet (e.g., Black, White).',
		elementConfig: {
			placeholder: 'Black',
			type: 'text',
		},
	},
	{
		name: 'weight',
		label: 'Weight',
		element: 'input',
		desc: "Enter the pet's weight kilograms.",
		elementConfig: {
			placeholder: 33,
			type: 'number',
			onChange: (e: any) => e.target.valueAsNumber,
		},
	},
	{
		name: 'species',
		label: 'Species',
		element: 'input',
		desc: 'Specify the species of the pet (e.g., Dog, Cat).',
		elementConfig: {
			placeholder: 'Dog',
			type: 'text',
		},
	},
	{
		name: 'breed',
		label: 'Breed',
		element: 'input',
		desc: 'Specify the breed of the pet (e.g., Boxer, Persian Cat).',
		elementConfig: {
			placeholder: 'Boxer',
			type: 'text',
		},
	},
	{
		name: 'location',
		label: 'Location',
		element: 'textarea',
		desc: 'Provide the current location of the pet (e.g., city or shelter).',
		elementConfig: {
			placeholder: 'City name',
		},
	},
	{
		name: 'age',
		label: 'Age',
		element: 'slider',
		desc: "Specify the pet's age.",
		elementConfig: {
			min: 0,
			max: '100',
			step: 1,
			defaultValue: 0,
		},
	},
	{
		name: 'description',
		label: 'Description',
		element: 'textarea',
		desc: "Provide a brief description of the pet's personality and background.",
		className: 'col-span-12',
		elementConfig: {
			placeholder: 'Enter details about the pet...',
		},
	},
	{
		name: 'medical_conditions',
		label: 'Medical Conditions',
		element: 'textarea',
		desc: 'List any known medical conditions the pet has.',
		className: 'col-span-12',
		elementConfig: {
			placeholder: 'E.g., allergies, arthritis...',
		},
	},
	{
		name: 'special_needs',
		label: 'Special Needs',
		element: 'textarea',
		desc: 'Specify any special care needs for the pet.',
		className: 'col-span-12',
		elementConfig: {
			placeholder: 'E.g., daily medication, extra attention...',
		},
	},
	{
		label: 'Last Checkup',
		name: 'last_checkup_date',
		element: 'date-picker',
		desc: "Select the date of the pet's last medical checkup.",
	},
	{
		name: 'vaccinated',
		label: 'Vaccinated',
		element: 'radio',
		desc: 'Is the pet vaccinated?',
		elementConfig: [
			{ id: 'vaccinated-yes', value: true, label: 'Yes' },
			{ id: 'vaccinated-no', value: false, label: 'No' },
		],
	},
	{
		name: 'good_with_children',
		label: 'Good with Children',
		element: 'radio',
		desc: 'Is the pet friendly with children?',
		elementConfig: [
			{ id: 'yes', value: true, label: 'Yes' },
			{ id: 'no', value: false, label: 'No' },
		],
	},
	{
		name: 'good_with_pets',
		label: 'Good with Other Pets',
		element: 'radio',
		desc: 'Does the pet get along well with other animals?',
		elementConfig: [
			{ id: 'yes', value: true, label: 'Yes' },
			{ id: 'no', value: false, label: 'No' },
		],
	},
	{
		name: 'spayed_neutered',
		label: 'Spayed/Neutered',
		element: 'radio',
		desc: 'Has the pet been spayed or neutered?',
		elementConfig: [
			{ id: 'yes', value: true, label: 'Yes' },
			{ id: 'no', value: false, label: 'No' },
		],
	},
	{
		name: 'gender',
		label: 'Gender',
		element: 'radio',
		desc: 'Specify the gender of the pet.',
		elementConfig: [
			{ id: 'M', value: 'male', label: 'Male' },
			{ id: 'F', value: 'female', label: 'Female' },
		],
	},
	{
		name: 'size',
		label: 'Size',
		element: 'radio',
		desc: 'Specify the size category of the pet.',
		elementConfig: [
			{ id: 's', value: 'small', label: 'Small' },
			{ id: 'm', value: 'medium', label: 'Medium' },
			{ id: 'l', value: 'large', label: 'Large' },
		],
	},
	{
		name: 'activity_level',
		label: 'Activity Level',
		element: 'radio',
		desc: 'What is the activity level of the pet?',
		elementConfig: [
			{ id: 'high', value: 'high', label: 'High' },
			{ id: 'mid', value: 'mid', label: 'Medium' },
			{ id: 'low', value: 'low', label: 'Low' },
		],
	},
	{
		name: 'photo_url',
		label: 'Photo',
		element: 'file-input',
		desc: 'Upload photos or documents related to the pet (e.g., vaccination records, profile pictures).',
		elementConfig: {
			maxFiles: 5,
			maxSize: 1024 * 1024 * 4, // 4 MB
			acceptedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
		},
	},
];
