import { type ReactNode } from 'react';
import { z, ZodType } from 'zod';

export type LoginData = {
	password: string;
	email: string;
};

export type RegisterData = {
	username: string;
	password: string;
	email: string;
};

export type Pet = z.infer<typeof PetSchema>;

export const LoginSchema: ZodType<LoginData> = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(4, { message: 'Password must be at least 4 characters long' })
		.max(12, { message: 'Password must not exceed 12 characters' }),
});

export const RegisterSchema: ZodType<RegisterData> = z.object({
	username: z.string().min(1, { message: 'Username is required' }),
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(4, { message: 'Password must be at least 4 characters long' })
		.max(12, { message: 'Password must not exceed 12 characters' }),
});

export type LoginFormShape = z.infer<typeof LoginSchema>;
export type RegisterFormShape = z.infer<typeof RegisterSchema>;

export type SubscriptionLevel = 'basic' | 'plus' | 'gold';

export type User = {
	id: string;
	email: string;
	username: string;
	isAdmin: boolean;
	isPersonnelBoarder: boolean;
	isPersonnelGroomer: boolean;
	isPersonnelTransporter: boolean;
	subscription_model: SubscriptionLevel;
	isActive: boolean;
	details?: {
		photo_url: string;
		name: string;
		address: string;
		contact: number;
		city?: string;
	};
};

export type TableConfig = {
	columnTitle: string;
	columnId: string;
	type: 'string' | 'number' | 'boolean' | 'datetime';
	nodeElement?: (props: { value: any }) => ReactNode;
	alignment?: 'center' | 'right' | 'left';
}[];

export type ConfigField = {
	name: string;
	label: string;
	element:
		| 'radio'
		| 'input'
		| 'slider'
		| 'date-picker'
		| 'textarea'
		| 'file-input'
		| 'select'
		| 'tag'
		| 'datetime'
		| 'multi-select';
	elementConfig?: any;
	desc: string;
	className?: string;
	placeholder?: string;
	conditional?: boolean;
	condition?: any;
};

export const PetSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	species: z.string().min(1, 'Species is required'),
	age: z.number().nonnegative('Age must be a non-negative number'),
	breed: z.string().min(1, 'Breed is required'),
	weight: z.number().positive('Weight must be a positive number'),
	photo_url: z.any().optional(),
	color: z.string().optional(),
	location: z.string().min(1, 'Location is required'),
	description: z.string().optional(),
	medical_conditions: z.string().optional(),
	special_needs: z.string().optional(),
	last_checkup_date: z.date().optional(),
	vaccinated: z.boolean().optional(),
	good_with_children: z.boolean().optional(),
	good_with_pets: z.boolean().optional(),
	spayed_neutered: z.boolean().optional(),
	gender: z.enum(['male', 'female']).optional(),
	size: z.enum(['small', 'medium', 'large']),
	activity_level: z.enum(['high', 'mid', 'low']),
});

export const RegisterUserSchema = z.object({
	username: z.string().min(1, { message: 'Username is required' }),
	email: z.string().email({ message: 'Invalid email address' }),
	role: z.string().min(1, 'Role is required'),
});

export const GroomerBoarderSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	contact: z.string().min(10, { message: 'Invalid contact' }),
	address: z.string().min(1, { message: 'Address is required' }),
	petType: z
		.array(z.string().min(1, { message: 'Pet is required' }))
		.optional(),
	timeAvailable: z.object({
		to: z.date(),
		from: z.date(),
	}),
	city: z.string().optional(),
	photo_url: z
		.array(
			z.object({
				data: z.string(),
				name: z.string(),
			})
		)
		.optional(),
});

export const UserBoardSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	contact: z.string().min(10, { message: 'Invalid contact' }),
	address: z.string().min(1, { message: 'Address is required' }),
	photo_url: z
		.array(
			z.object({
				data: z.string(),
				name: z.string(),
			})
		)
		.optional(),
});

export const BookServiceSchema = z.object({
	petId: z.string().min(1, { message: 'Pet is required' }),
	timeSlot: z.object({
		to: z.date(),
		from: z.date(),
	}),
});

export type SubmitValues = z.infer<typeof BookServiceSchema>;

export type Personnel = {
	photo_url: string;
	_id: string;
	name: string;
	contact: string;
	address: string;
	petType: string[];
	timeAvailable: [number, number];
	city: string;
};

export type PersonnelRequest = {
	_id: string;
	createdAt: string;
	petType: string;
	updatedAt: string;
	status: string;
	timeSlot: [number, number];
	petId: Pet;
	userSubscriptionModel?: SubscriptionLevel;
	requesterId: {
		_id: string;
		details: {
			name: string;
			contact: string;
			address: string;
		};
	};
	requestedId: z.infer<typeof GroomerBoarderSchema> & { _id: string };
};

export type TransporterRequest = {
	_id: string;
	createdAt: string;
	petType: string;
	updatedAt: string;
	status: string;
	petId: Pet;
	userSubscriptionModel?: SubscriptionLevel;
	requesterId: {
		_id: string;
		details: {
			name: string;
			contact: string;
			address: string;
		};
	};
	requestedId: z.infer<typeof TransporterSchema> & { _id: string };
	pickUpDate: string;
	locationFrom: string;
	locationTo: string;
};

type Contact = {
	phone: string;
	email: string;
};

type Address = {
	street: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
};

type Availability = {
	days: string[];
	timeSlots: number[];
};

export type DoctorData = {
	_id: string;
	name: string;
	specialization: string;
	licenseNumber: string;
	contact: Contact;
	clinicAddress?: Address;
	experienceYears: number;
	availability: Availability;
	rating?: number;
	profilePicture?: string;
	bio?: string;
};

export type Product = {
	_id: string;
	name: string;
	description: string;
	category: string;
	price: number;
	stock: number;
	brand?: string;
	petType: string;
	isFeatured?: boolean;
	images: string[];
	rating?: number;
};

export type CartItem = {
	product: Product;
	quantity: number;
	size: string;
	_id: string;
};

export type Cart = {
	user: string;
	items: CartItem[];
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

export type MyOrder = {
	createdAt: string;
	_id: string;
	cart: Cart;
	invoiceId: string;
};

const createProductSchema = (isEdit: boolean) =>
	z
		.object({
			name: z.string().min(1, 'Name is required'),
			description: z.string().min(1, 'Description is required'),
			category: z.enum([
				'Food',
				'Toys',
				'Accessories',
				'Grooming',
				'Healthcare',
			]),
			price: z.number().min(100, 'Price must be above 100 Rupees'),
			stock: z.number().int().min(0, 'Stock must be a non-negative integer'),
			brand: z.string().min(1, 'Brand is required'),
			petType: z.enum([
				'Dog',
				'Cat',
				'Bird',
				'Reptile',
				'Fish',
				'Small Animal',
			]),
			isFeatured: z.boolean().optional(),
			images: isEdit
				? z
						.array(
							z.object({
								data: z.string(),
								name: z.string(),
							})
						)
						.optional()
				: z
						.array(
							z.object({
								data: z.string(),
								name: z.string(),
							})
						)
						.nonempty({ message: 'At least 1 image is required' }),
			sizesAvailable: z.array(z.string()).optional(),
			colorsAvailable: z.array(z.string()).optional(),
		})
		.refine(
			(data) => {
				if (data.category === 'Accessories') {
					return data.sizesAvailable && data.sizesAvailable.length > 0;
				}
				return true;
			},
			{
				message: 'required when the category is Accessories.',
				path: ['sizesAvailable'],
			}
		)
		.refine(
			(data) => {
				if (data.category === 'Accessories') {
					return data.colorsAvailable && data.colorsAvailable.length > 0;
				}
				return true;
			},
			{
				message: 'required when the category is Accessories.',
				path: ['colorsAvailable'],
			}
		);

export const ProductSchema = createProductSchema(false);
export const EditProductSchema = createProductSchema(true);

export type SocialUser = {
	_id: string;
	userName: string;
	details: {
		name: string;
		photo_url: string;
	};
	pets: {
		_id: string;
		name: string;
		species: string;
		breed: string;
		age: number;
		gender: string;
		size: string;
		owner_id: string;
		photo_url: string;
	}[];
};

export const DoctorSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	specialization: z.string().min(0, 'Specialization is required'),
	licenseNumber: z.string().min(0, 'License number is required'),
	contact: z.object({
		phone: z.string().min(10, { message: 'Invalid contact' }),
		email: z
			.string()
			.email('Invalid email address')
			.min(0, 'Email is required'),
	}),
	clinicAddress: z.object({
		street: z.string().min(1, 'Street is required'),
		city: z.string().min(1, 'City is required'),
		state: z.string().min(1, 'State is required'),
		postalCode: z.string().min(5, 'Postal Code is required'),
		country: z.string().optional(),
	}),
	experienceYears: z
		.number()
		.min(0, 'Experience years must be a positive number'),
	availability: z.object({
		days: z.array(z.string()).nonempty('At least one day must be specified'),
		timeSlots: z.object({
			to: z.date(),
			from: z.date(),
		}),
	}),
	rating: z
		.number()
		.min(0, 'Rating cannot be negative')
		.max(5, 'Rating cannot exceed 5')
		.optional(),
	profilePicture: z
		.array(
			z.object({
				data: z.string(),
				name: z.string(),
			})
		)
		.optional(),
	bio: z.string().optional(),
});

export const TransporterSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	contact: z.string().min(10, { message: 'Invalid contact' }),
	address: z.string().min(1, { message: 'Address is required' }),
	petType: z.array(z.string().min(1, { message: 'Pet is required' })),
	photo_url: z
		.array(
			z.object({
				data: z.string(),
				name: z.string(),
			})
		)
		.nonempty({ message: 'Image is required' }),
});

export type Transporter = Omit<Personnel, 'timeAvailable' | 'city'>;

export const BookTransportSchema = z.object({
	petId: z.string().min(1, { message: 'Pet is required' }),
	locationFrom: z.string().min(1, { message: 'Location is required' }),
	locationTo: z.string().min(1, { message: 'Location is required' }),
	pickUpDate: z.date({ required_error: 'Pick-up date is required' }),
});

export type SubmitValuesForTransport = z.infer<typeof BookTransportSchema>;
