import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CustomCarousel = ({ images }: { images: string[] }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPrevious = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + images.length) % images.length
		);
	};

	const goToNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	return (
		<div className="">
			<div className="w-full h-[450px] overflow-hidden rounded-lg relative">
				<img
					src={images[currentIndex]}
					alt={images[currentIndex]}
					className="w-full h-full object-cover"
				/>
				<button
					onClick={goToPrevious}
					className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 rounded-full bg-primary-foreground h-8 w-8 flex items-center justify-center shadow-md"
				>
					<ChevronLeft />
				</button>
				<button
					onClick={goToNext}
					className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-primary-foreground h-8 w-8 flex items-center justify-center rounded-full shadow-md"
				>
					<ChevronRight />
				</button>
			</div>
			<div className="mt-4 gap-2 overflow-x-auto flex flex-wrap">
				{images?.map((image, index) => (
					<button
						key={image}
						onClick={() => setCurrentIndex(index)}
						className={`w-24 h-24 rounded-lg border-2 overflow-hidden ${
							currentIndex === index ? 'border-blue-500' : 'border-gray-300'
						}`}
					>
						<img
							src={image}
							alt={image}
							className="w-full h-full object-cover rounded-lg"
						/>
					</button>
				))}
			</div>
		</div>
	);
};

export default CustomCarousel;
