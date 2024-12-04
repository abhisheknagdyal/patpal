import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form.tsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';
import { Label } from '@/components/ui/label.tsx';

import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type FormRadioGroupProps = {
	label: string;
	onChange: (value: number | string) => void;
	desc: string | undefined;
	error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
	value: string;
	options: [];
};

const RadioButton = ({
	label,
	value,
	onChange,
	options,
	error,
	desc,
}: FormRadioGroupProps) => {
	return (
		<FormItem>
			<FormLabel>{label}</FormLabel>
			<FormControl>
				<RadioGroup
					value={value}
					onValueChange={(value) => onChange(value)}
					className="flex space-x-4"
				>
					{options.map((option: any) => (
						<div className="flex items-center space-x-2" key={option.id}>
							<RadioGroupItem value={option.value} id={option.id} />
							<Label htmlFor={option.id}>{option.label}</Label>
						</div>
					))}
				</RadioGroup>
			</FormControl>
			<FormDescription>{error ? <FormMessage /> : desc}</FormDescription>
		</FormItem>
	);
};

export default RadioButton;
