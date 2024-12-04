import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { useTimescape, type Options } from 'timescape/react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const timePickerInputBase =
	'p-1 inline tabular-nums h-fit border-none outline-none select-none content-box caret-transparent rounded-sm min-w-8 text-center focus:bg-foreground/20 focus-visible:ring-0 focus-visible:outline-none';
const timePickerSeparatorBase = 'text-xs text-gray-400';

type DateFormat = 'days' | 'months' | 'years';
type TimeFormat = 'hours' | 'minutes' | 'seconds' | 'am/pm';

type DateTimeArray<T extends DateFormat | TimeFormat> = T[];
type DateTimeFormatDefaults =
	| [
			DateTimeArray<DateFormat>,
			DateTimeArray<TimeFormat>,
			DateTimeArray<TimeFormat>,
	  ]
	| [DateTimeArray<TimeFormat>, DateTimeArray<TimeFormat>];

const DEFAULTS = [
	['months', 'days', 'years'],
	['hours', 'minutes', 'am/pm'],
	['hours', 'minutes', 'am/pm'],
] as DateTimeFormatDefaults;

type TimescapeReturn = ReturnType<typeof useTimescape>;
type InputPlaceholders = Record<DateFormat | TimeFormat, string>;
const INPUT_PLACEHOLDERS: InputPlaceholders = {
	months: 'MM',
	days: 'DD',
	years: 'YYYY',
	hours: 'HH',
	minutes: 'MM',
	seconds: 'SS',
	'am/pm': 'AM/PM',
};

/**
 * Date time picker Docs: {@link: https://shadcn-extension.vercel.app/docs/otp-input}
 */

const DatetimeGrid = forwardRef<
	HTMLDivElement,
	{
		format: DateTimeFormatDefaults;
		className?: string;
		timeScape: Pick<TimescapeReturn, 'getRootProps' | 'getInputProps'>;
		timeScape2: Pick<TimescapeReturn, 'getRootProps' | 'getInputProps'>;
		placeholders: InputPlaceholders;
	}
>(
	(
		{
			format,
			className,
			timeScape,
			timeScape2,
			placeholders,
		}: {
			format: DateTimeFormatDefaults;
			className?: string;
			timeScape: Pick<TimescapeReturn, 'getRootProps' | 'getInputProps'>;
			timeScape2: Pick<TimescapeReturn, 'getRootProps' | 'getInputProps'>;
			placeholders: InputPlaceholders;
		},
		ref
	) => {
		return (
			<div
				className={cn(
					'flex items-center w-fit p-1 border-2',
					className,
					'border-input rounded-md gap-1 selection:bg-transparent selection:text-foreground'
				)}
				{...timeScape.getRootProps()}
				ref={ref}
			>
				{format?.length
					? format.map((group, i) => (
							<React.Fragment key={i === 0 ? 'dates' : `times${i}`}>
								{group?.length
									? group.map((unit, j) => (
											<React.Fragment key={unit}>
												<Input
													className={cn(timePickerInputBase, 'min-w-8', {
														'min-w-12': unit === 'years',
														'bg-foreground/15': unit === 'am/pm',
													})}
													{...(i === 2
														? timeScape2.getInputProps(unit)
														: timeScape.getInputProps(unit))}
													placeholder={placeholders[unit]}
												/>
												{i === 0 && j < group.length - 1 ? (
													// date separator
													<span className={timePickerSeparatorBase}>/</span>
												) : (
													j < group.length - 2 && (
														// time separator
														<span className={timePickerSeparatorBase}>:</span>
													)
												)}
											</React.Fragment>
										))
									: null}
								{format[1]?.length && !i ? (
									// date-time separator - only if both date and time are present
									<span
										className={cn(
											timePickerSeparatorBase,
											'opacity-30 text-xl'
										)}
									>
										|
									</span>
								) : null}
							</React.Fragment>
						))
					: null}
			</div>
		);
	}
);

DatetimeGrid.displayName = 'DatetimeGrid';

interface DateTimeInput {
	value?: {
		to: Date;
		from: Date;
	};
	format: DateTimeFormatDefaults;
	placeholders?: InputPlaceholders;
	onChange: (state: any) => void;
	dtOptions?: Options;
	className?: string;
}

const DEFAULT_TS_OPTIONS = {
	// date: new Date(),
	hour12: true,
};

export const DatetimePicker = forwardRef<HTMLDivElement, DateTimeInput>(
	(
		{
			value = {
				from: new Date(),
				to: new Date(),
			},
			format = DEFAULTS,
			placeholders,
			dtOptions = DEFAULT_TS_OPTIONS,
			onChange,
			className,
		},
		ref
	) => {
		const [state, setState] = useState<{ to: any; from: any }>({
			to: value.to,
			from: value.from,
		});

		const handleFromDateChange = useCallback((nextDate: Date | undefined) => {
			setState((prevState) => ({
				...prevState,
				from: nextDate,
			}));
			// setState((prevState) => {
			// 	if (!nextDate || !prevState.to) return prevState;
			//
			// 	// Extract the hours, minutes, and seconds from the current `to` date
			// 	const toDateWithTime = new Date(nextDate);
			// 	toDateWithTime.setHours(prevState.to.getHours());
			// 	toDateWithTime.setMinutes(prevState.to.getMinutes());
			// 	toDateWithTime.setSeconds(prevState.to.getSeconds());
			//
			// 	return {
			// 		...prevState,
			// 		from: nextDate,
			// 		to: toDateWithTime,
			// 	};
			// });
		}, []);

		const handleToDateChange = useCallback((nextDate: Date | undefined) => {
			setState((prevState) => ({ ...prevState, to: nextDate }));
		}, []);

		useEffect(() => {
			onChange(state);
		}, [onChange, state]);

		const timeScape = useTimescape({
			date: state.from,
			onChangeDate: handleFromDateChange,
			...dtOptions,
		});
		const timeScape2 = useTimescape({
			date: state.to,
			onChangeDate: handleToDateChange,
			...dtOptions,
		});

		return (
			<DatetimeGrid
				format={format}
				className={className}
				timeScape={timeScape}
				timeScape2={timeScape2}
				placeholders={placeholders ?? INPUT_PLACEHOLDERS}
				ref={ref}
			/>
		);
	}
);

DatetimePicker.displayName = 'DatetimePicker';
