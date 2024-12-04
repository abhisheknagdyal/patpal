import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form.tsx';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select.tsx';

import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type FormSelectProps = {
	label: string;
	desc: string | undefined;
	error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
	value: string | undefined;
	onChange: (value: string | undefined) => void;
	options: [];
	placeholder?: string;
};

const FormSelect = ({
	label,
	value,
	onChange,
	error,
	desc,
	options,
	placeholder,
}: FormSelectProps) => {
	return (
		<FormItem>
			<FormLabel>{label}</FormLabel>
			<Select onValueChange={onChange} defaultValue={value}>
				<FormControl>
					<SelectTrigger>
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>
				</FormControl>
				<SelectContent>
					{options.map((option: { value: string; label: string }) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<FormDescription>{error ? <FormMessage /> : desc}</FormDescription>
		</FormItem>
	);
};

export default FormSelect;
