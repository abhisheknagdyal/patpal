import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';

import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type FormInputProps = {
	label: string;
	onChange: (value: number | string) => void;
	type: 'text' | 'number' | 'email';
	desc: string | undefined;
	error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
	placeholder: string;
	value: any;
};

const FormInput = ({
	label,
	placeholder,
	type,
	onChange,
	desc,
	error,
	value,
}: FormInputProps) => {
	return (
		<FormItem>
			<FormLabel>{label}</FormLabel>
			<FormControl>
				<Input
					placeholder={placeholder}
					value={value}
					type={type}
					onChange={(e) => {
						const value =
							type === 'number' ? e.target.valueAsNumber : e.target.value;
						onChange(value);
					}}
				/>
			</FormControl>
			<FormDescription>{error ? <FormMessage /> : desc}</FormDescription>
		</FormItem>
	);
};

export default FormInput;
