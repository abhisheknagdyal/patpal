const AdoptionBlock = ({ value }: { value: 'available' | 'pending' }) => {
	return (
		<div
			className={`text-center rounded-sm p-0.5 ${value === 'available' ? 'bg-green-700' : 'bg-yellow-500'}`}
		>
			{value === 'available' ? 'AVAILABLE' : 'PENDING'}
		</div>
	);
};

export default AdoptionBlock;
