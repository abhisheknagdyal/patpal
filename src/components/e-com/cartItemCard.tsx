import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, Minus, Plus, X } from 'lucide-react';

type CartItemCardProps = {
	product: {
		_id: string;
		name: string;
		price: number;
		images: string[];
		stock: number;
		description: string;
		category: string;
		sizesAvailable?: string[];
		colorsAvailable?: string[];
	};
	quantity: number;
	color?: string;
	size?: string;
	onQuantityChange: (
		id: string,
		delta: number,
		action: 'add' | 'remove',
		e: React.MouseEvent<HTMLButtonElement>
	) => void;
	onSizeChange: (
		id: string,
		size: string,
		qty: number,
		e: React.MouseEvent<HTMLButtonElement>
	) => void;
	onColorChange: (
		id: string,
		color: string,
		qty: number,
		e: React.MouseEvent<HTMLButtonElement>
	) => void;
	onDelete: (
		id: string,
		name: string,
		e: React.MouseEvent<HTMLButtonElement>
	) => void;
	onCardClick: (id: string) => void;
};

const CartItemCard = ({
	product,
	quantity,
	color,
	size,
	onQuantityChange,
	onSizeChange,
	onColorChange,
	onDelete,
	onCardClick,
}: CartItemCardProps) => {
	return (
		<Card
			className="flex flex-col sm:flex-row rounded-lg shadow p-4"
			onClick={() => onCardClick(product._id)}
		>
			<div className="w-full sm:w-40 h-40 rounded-lg overflow-hidden">
				<img
					src={product.images[0]}
					alt={product.name}
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="flex-1 sm:ml-6 mt-4 sm:mt-0">
				<CardHeader className="p-0">
					<CardTitle className="text-xl font-semibold">
						{product.name}
					</CardTitle>
					<p className="text-lg font-medium text-gray-600 flex items-center">
						<IndianRupee size={18} />
						{product.price.toFixed(2)}
					</p>
				</CardHeader>
				<div className="flex flex-col md:flex-row xl:gap-12 gap-4 md:gap-8 mt-4 nd:items-center flex-wrap">
					<div className="flex items-center space-x-4">
						<Button
							disabled={quantity <= 1 || quantity === product.stock}
							variant="outline"
							onClick={(e) => onQuantityChange(product._id, -1, 'remove', e)}
							size="icon"
						>
							<Minus size={16} />
						</Button>
						<span className="text-xl">{quantity}</span>
						<Button
							variant="outline"
							disabled={quantity >= product.stock}
							onClick={(e) => onQuantityChange(product._id, 1, 'add', e)}
							size="icon"
						>
							<Plus size={16} />
						</Button>
					</div>

					{product.category === 'Accessories' && (
						<>
							<div className="">
								<div className="flex gap-2 mt-1">
									{product.sizesAvailable?.map((availableSize) => (
										<Button
											key={availableSize}
											variant={size === availableSize ? 'default' : 'outline'}
											onClick={(e) =>
												onSizeChange(product._id, availableSize, quantity, e)
											}
											className="text-sm px-3 py-1"
										>
											{availableSize}
										</Button>
									))}
								</div>
							</div>
							<div className="">
								<div className="flex gap-2 mt-1">
									{product.colorsAvailable?.map((colorAvailable) => (
										<Button
											key={colorAvailable}
											onClick={(e) =>
												onColorChange(product._id, colorAvailable, quantity, e)
											}
											className={`w-8 h-8 rounded-full ${colorAvailable === color ? 'ring-1 ring-offset-2 ring-offset-blue-400' : ''}`}
											style={{ backgroundColor: colorAvailable }}
										/>
									))}
								</div>
							</div>
						</>
					)}
				</div>
				<div className="mt-4 text-gray-400 ">{product.description}</div>
			</div>
			<Button
				variant="ghost"
				className="self-start sm:self-auto sm:ml-auto mt-4 sm:mt-0 text-gray-400 hover:text-red-600"
				onClick={(e) => onDelete(product._id, product.name, e)}
			>
				<X size={20} />
			</Button>
		</Card>
	);
};

export default CartItemCard;
