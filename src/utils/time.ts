export const date = (timeString: string | Date) => new Date(timeString);

export const getFormattedTime = (
	s?: string | Date,
	format: 'full' | 'date-only' = 'full'
) => {
	if (!s) return null;
	const d = date(s);
	switch (format) {
		case 'full':
			return d.toLocaleTimeString('en-US', {
				day: 'numeric',
				month: 'short',
			});
		case 'date-only':
			return d.toLocaleDateString('en-US', {
				day: 'numeric',
				month: 'short',
			});
	}
};

export const convertToEpoch = (dateString: Date) => {
	const dateObject = date(String(dateString));
	return dateObject.getTime();
};

export const extractDateTimeFromEpoch = (epoch: any) => {
	const dateObject = date(epoch);
	const d = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
	}).format(dateObject);
	const t = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: false,
	}).format(dateObject);
	return [d, t];
};

export const extractTimeFromDateString = (dateString: Date) => {
	const dateObject = date(String(dateString));
	return new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: false,
	}).format(dateObject);
};

export const convertNumberToTime = (num: number) => {
	if (!num) return null;
	const timeString = num.toString().padStart(4, '0');
	return timeString.slice(0, 2) + ':' + timeString.slice(2);
};

export const getTimeFromRequest = (timeSlot: [number, number]) => {
	const [date, from] = extractDateTimeFromEpoch(timeSlot[0]);
	const [, to] = extractDateTimeFromEpoch(timeSlot[1]);
	return { date, from, to };
};

export const convertToTimeHHMM = (time: number) => {
	if (!time) return null;
	const hours = Math.floor(time / 100);
	const minutes = time % 100;
	const date = new Date();
	date.setHours(hours, minutes, 0, 0);
	return date;
};
