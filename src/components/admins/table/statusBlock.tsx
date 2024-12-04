const StatusBlock = ({ value }: { value: boolean }) => {
	return (
		<div
			className={`text-center rounded-sm p-0.5 ${value ? 'bg-green-700' : 'bg-red-700'}`}
		>
			{value ? 'ACTIVE' : 'INACTIVE'}
		</div>
	);
};

export default StatusBlock;
