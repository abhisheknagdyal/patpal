const getClass = (value: number) => {
	if (value < 10) return 'text-red-600';
	if (value < 20) return 'text-yellow-600';
};

const StockBlock = ({ value }: { value: number }) => {
	return <div className={getClass(value)}>{value}</div>;
};

export default StockBlock;
