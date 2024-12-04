import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form.tsx';
import { Slider } from '@/components/ui/slider.tsx';

import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type FormSliderProps = {
	label: string;
	onChange: (value: number | string) => void;
	desc: string | undefined;
	error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
	min: number;
	max: number;
	step: number;
	defaultValue: [number];
	value: number;
};

const FormSlider = ({
	label,
	value,
	min,
	max,
	step,
	defaultValue,
	onChange,
	error,
	desc,
}: FormSliderProps) => {
	return (
		<FormItem>
			<FormLabel>
				{label} - {value || defaultValue}
			</FormLabel>
			<FormControl>
				<Slider
					min={min}
					max={max}
					step={step}
					value={value ? [value] : defaultValue}
					defaultValue={defaultValue}
					onValueChange={(vals) => {
						onChange(vals[0]);
					}}
				/>
			</FormControl>
			<FormDescription>{error ? <FormMessage /> : desc}</FormDescription>
		</FormItem>
	);
};

export default FormSlider;
