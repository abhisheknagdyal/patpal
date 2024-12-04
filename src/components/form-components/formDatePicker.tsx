import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form.tsx';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar.tsx';

import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type DatePickerProps = {
	label: string;
	desc: string | undefined;
	error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
	value: Date | undefined;
	onChange: (value: Date | undefined) => void;
};

const FormDatePicker = ({
	label,
	error,
	desc,
	value,
	onChange,
}: DatePickerProps) => {
	return (
		<FormItem className="flex flex-col">
			<FormLabel>{label} </FormLabel>
			<Popover>
				<PopoverTrigger asChild>
					<FormControl>
						<Button
							variant={'outline'}
							className={cn(
								'w-[240px] pl-3 text-left font-normal',
								!value && 'text-muted-foreground'
							)}
						>
							{value ? format(value, 'PPP') : <span>Pick a date</span>}
							<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={value}
						onSelect={onChange}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
			<FormDescription>{error ? <FormMessage /> : desc}</FormDescription>
		</FormItem>
	);
};

export default FormDatePicker;
