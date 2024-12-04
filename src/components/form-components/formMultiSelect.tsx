import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form.tsx';
import {
	MultiSelector,
	MultiSelectorContent,
	MultiSelectorInput,
	MultiSelectorItem,
	MultiSelectorList,
	MultiSelectorTrigger,
} from '@/components/ui/multiSelect.tsx';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type FormMultiSelectProps = {
	label: string;
	desc: string | undefined;
	error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
	value: string[];
	onChange: (value: string[]) => void;
	options: [];
	placeholder?: string;
};

const FormMultiSelect = ({
	label,
	desc,
	error,
	value,
	onChange,
	options,
	placeholder,
}: FormMultiSelectProps) => {
	return (
		<FormItem>
			<FormLabel>{label}</FormLabel>
			<FormControl>
				<MultiSelector
					values={value}
					onValuesChange={onChange}
					loop
					className="max-w-xs"
				>
					<MultiSelectorTrigger>
						<MultiSelectorInput placeholder={placeholder} />
					</MultiSelectorTrigger>
					<MultiSelectorContent>
						<MultiSelectorList>
							{options?.map((option: { value: string; label: string }) => (
								<MultiSelectorItem key={option.value} value={option.value}>
									{option.label}
								</MultiSelectorItem>
							))}
						</MultiSelectorList>
					</MultiSelectorContent>
				</MultiSelector>
			</FormControl>
			<FormDescription>{error ? <FormMessage /> : desc}</FormDescription>
		</FormItem>
	);
};

export default FormMultiSelect;
