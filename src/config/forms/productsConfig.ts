import { ConfigField } from '@/utils/types.ts';

export const ProductsConfig: ConfigField[] = [
	{
		name: 'name',
		label: 'Product Name',
		element: 'input',
		desc: 'Enter the name of the product.',
		elementConfig: {
			placeholder: 'Dog Sweater',
			type: 'text',
		},
	},
	{
		name: 'brand',
		label: 'Brand Name',
		element: 'input',
		desc: 'Enter the brand of the product.',
		elementConfig: {
			placeholder: 'Nike',
			type: 'text',
		},
	},
	{
		label: 'Product Category',
		name: 'category',
		element: 'select',
		desc: 'Select the category for the product.',
		placeholder: 'Select a category',
		elementConfig: [
			{ value: 'Food', label: 'Food' },
			{ value: 'Toys', label: 'Toys' },
			{ value: 'Accessories', label: 'Accessories' },
			{ value: 'Grooming', label: 'Grooming' },
			{ value: 'Healthcare', label: 'Healthcare' },
		],
	},
	{
		label: 'Pet Type',
		name: 'petType',
		element: 'select',
		desc: 'Select the type of pet for which this product is intended.',
		placeholder: 'Select a pet type',
		elementConfig: [
			{ value: 'Dog', label: 'Dog' },
			{ value: 'Cat', label: 'Cat' },
			{ value: 'Bird', label: 'Bird' },
			{ value: 'Reptile', label: 'Reptile' },
			{ value: 'Fish', label: 'Fish' },
			{ value: 'Small Animal', label: 'Small Animal' },
		],
	},
	{
		conditional: true,
		condition: (form: any) => form.category === 'Accessories',
		label: 'Available Sizes',
		name: 'sizesAvailable',
		element: 'multi-select',
		desc: 'Select the available sizes for this product.',
		placeholder: 'Select sizes',
		elementConfig: [
			{ value: 'XS', label: 'XS' },
			{ value: 'S', label: 'S' },
			{ value: 'M', label: 'M' },
			{ value: 'L', label: 'L' },
			{ value: 'XL', label: 'XL' },
			{ value: 'XXL', label: 'XXL' },
		],
	},
	{
		conditional: true,
		condition: (form: any) => form.category === 'Accessories',
		name: 'colorsAvailable',
		label: 'Available Colors',
		element: 'tag',
		desc: 'Enter the colors available for the product.',
		elementConfig: {
			placeholder: 'e.g., blue, red, green',
		},
	},
	{
		name: 'description',
		label: 'Product Description',
		element: 'textarea',
		desc: 'Provide a detailed description of the product.',
		elementConfig: {
			placeholder: 'A cozy sweater for dogs...',
		},
		className: 'col-span-12',
	},
	{
		name: 'price',
		label: 'Price (₹)',
		element: 'input',
		desc: 'Enter the price of the product in rupees.',
		elementConfig: {
			placeholder: 500,
			type: 'number',
			onChange: (e: any) => e.target.valueAsNumber,
		},
	},
	{
		name: 'stock',
		label: 'Stock Quantity',
		element: 'input',
		desc: 'Enter the available stock quantity.',
		elementConfig: {
			placeholder: 50,
			type: 'number',
			onChange: (e: any) => e.target.valueAsNumber,
		},
	},
	{
		name: 'isFeatured',
		label: 'Featured Product',
		element: 'radio',
		desc: 'Mark this product as a featured item.',
		elementConfig: [
			{ id: 'true', value: true, label: 'Yes' },
			{ id: 'false', value: false, label: 'No' },
		],
	},
	{
		name: 'images',
		label: 'Product Photo',
		element: 'file-input',
		desc: 'Upload product photos. Maximum 5 files, up to 4 MB each.',
		elementConfig: {
			maxFiles: 5,
			maxSize: 1024 * 1024 * 4,
			acceptedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
		},
	},
];
