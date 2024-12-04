import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form.tsx';
import { DatetimePicker } from '@/components/ui/dateTimePicker.tsx';

import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type FormInputProps = {
	label: string;
	onChange: (nextDate: Date | undefined) => void;
	desc: string | undefined;
	error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
	value: any;
	showDate?: boolean;
};

const FormInput = ({
	label,
	onChange,
	desc,
	error,
	value,
	showDate = true,
}: FormInputProps) => {
	return (
		<FormItem className="flex flex-col">
			<FormLabel>{label}</FormLabel>
			<FormControl>
				<DatetimePicker
					value={value}
					onChange={onChange}
					format={[
						showDate ? ['months', 'days', 'years'] : [],
						['hours', 'minutes', 'am/pm'],
						['hours', 'minutes', 'am/pm'],
					]}
				/>
			</FormControl>
			<FormDescription>{error ? <FormMessage /> : desc}</FormDescription>
		</FormItem>
	);
};

export default FormInput;
