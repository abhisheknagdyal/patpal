import { type Dispatch, type SetStateAction } from 'react';
import FormModal from '@/components/form-components/formModal.tsx';

import {
	BookServiceSchema,
	BookTransportSchema,
	ConfigField,
	Pet,
	SubmitValues,
	SubmitValuesForTransport,
} from '@/utils/types.ts';

type ExtendedPet = Pet & { _id?: string };

type Props<V> = {
	onSubmit: (values: V, id: string) => void;
	personnelId: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	loading: boolean;
	pets: ExtendedPet[];
	headerTitle: string;
	desc: string;
	isTransporter: boolean;
};

const BookServiceButton = <V extends SubmitValues | SubmitValuesForTransport>({
	onSubmit,
	personnelId,
	open,
	setOpen,
	loading,
	pets,
	headerTitle,
	desc,
	isTransporter,
}: Props<V>) => {
	const getElementConfig = () => {
		return pets
			?.filter((pet) => (pet as any).adoption_status !== 'available')
			.map((pet) => ({
				value: pet._id,
				label: pet.name,
			}));
	};

	const Config: ConfigField[] = [
		{
			label: 'Select your Pet',
			name: 'petId',
			element: 'select',
			desc: 'Select the pet for which you want to book the service',
			placeholder: 'Select your Pet',
			elementConfig: getElementConfig(),
		},
		{
			name: 'timeSlot',
			label: 'Time Slot',
			element: 'datetime',
			desc: 'Specify the time range you are available at',
			elementConfig: {
				showDate: true,
			},
			className: 'col-span-12 overflow-x-scroll md:overflow-x-hidden',
		},
	];

	const TransporterConfig: ConfigField[] = [
		{
			label: 'Select Your Pet',
			name: 'petId',
			element: 'select',
			desc: 'Choose the pet you want to transport.',
			placeholder: 'Select Your Pet',
			elementConfig: getElementConfig(),
			className: 'col-span-12 md:col-span-6',
		},
		{
			name: 'locationFrom',
			label: 'Pick-up Location',
			element: 'input',
			desc: 'Enter the location from where the pet will be picked up.',
			elementConfig: {
				placeholder: 'Enter pick-up location',
				type: 'text',
			},
			className: 'col-span-12 md:col-span-6',
		},
		{
			name: 'locationTo',
			label: 'Drop-off Location',
			element: 'input',
			desc: 'Enter the location where the pet will be dropped off.',
			elementConfig: {
				placeholder: 'Enter drop-off location',
				type: 'text',
			},
			className: 'col-span-12 md:col-span-6',
		},
		{
			label: 'Pickup Date',
			name: 'pickUpDate',
			element: 'date-picker',
			desc: 'Select the date when the pet will be picked up for transport.',
			className: 'col-span-12 md:col-span-6',
		},
	];

	const onFormSubmit = (values: V) => {
		onSubmit(values, personnelId);
	};

	return (
		<div>
			<FormModal
				headerTitle={headerTitle}
				buttonTitle="Book Now!"
				desc={desc}
				config={isTransporter ? TransporterConfig : Config}
				schema={isTransporter ? BookTransportSchema : BookServiceSchema}
				onSubmit={onFormSubmit}
				isLoading={loading}
				open={open}
				setOpen={setOpen}
				variant="secondary"
			/>
		</div>
	);
};

export default BookServiceButton;
