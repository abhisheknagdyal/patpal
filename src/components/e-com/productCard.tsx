import { IndianRupee, ShoppingBasket } from 'lucide-react';

import { Card, CardContent, CardFooter } from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';

import { Product } from '@/utils/types.ts';

type Props = {
	handleNavigate: (id: string) => void;
	product: Product;
};
const ProductCard = ({ handleNavigate, product }: Props) => {
	return (
		<Card className="w-64" onClick={() => handleNavigate(product._id)}>
			<CardContent className="p-0">
				<div className="h-64">
					<img
						className="object-cover h-full w-full rounded-t-lg"
						alt="product"
						src={product.images[0]}
					/>
				</div>
			</CardContent>
			<CardFooter className="flex px-4 bg-primary-foreground py-5">
				<div className="flex-1 gap-2">
					<div className="text-xl font-semibold">{product.name}</div>
					<div className="flex font-semibold text-lg items-center text-[#F69946]">
						<IndianRupee size={18} /> {product.price.toFixed(0)}
					</div>
				</div>
				<Badge className="py-2 self-start px-2">
					<ShoppingBasket size={28} className="text-[#F69946]" />
				</Badge>
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
