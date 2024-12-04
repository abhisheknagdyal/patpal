import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form.tsx';

import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { TagsInput } from '@/components/ui/TagInput.tsx';

type FormInputProps = {
	label: string;
	desc: string | undefined;
	error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
	value: string[];
	onChange: (value: string[]) => void;
	placeholder: string;
};

const FormInputTag = ({
	label,
	value,
	onChange,
	error,
	desc,
	placeholder,
}: FormInputProps) => {
	return (
		<FormItem>
			<FormLabel>{label}</FormLabel>
			<FormControl>
				<TagsInput
					onValueChange={onChange}
					value={value}
					placeholder={placeholder}
				/>
			</FormControl>
			<FormDescription>{error ? <FormMessage /> : desc}</FormDescription>
		</FormItem>
	);
};

export default FormInputTag;
