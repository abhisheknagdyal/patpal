import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';

import {
	FieldError,
	FieldErrorsImpl,
	FieldValues,
	Merge,
} from 'react-hook-form';

type FormTextareaProps = {
	label: string;
	desc: string | undefined;
	error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
	field: FieldValues;
	placeholder: string;
};

const FormTextarea = ({
	label,
	placeholder,
	error,
	field,
	desc,
}: FormTextareaProps) => {
	return (
		<FormItem>
			<FormLabel>{label}</FormLabel>
			<FormControl>
				<Textarea
					{...field}
					placeholder={placeholder}
					className="resize-none"
				/>
			</FormControl>
			<FormDescription>{error ? <FormMessage /> : desc}</FormDescription>
		</FormItem>
	);
};

export default FormTextarea;
