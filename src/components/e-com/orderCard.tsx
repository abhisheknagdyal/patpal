import { IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MyOrder } from '@/utils/types.ts';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion.tsx';
import Spinner from '@/components/spinner.tsx';

type OrderProps = {
	order: MyOrder;
	loading: boolean;
	onInvoiceClick: (invoiceId: string) => void;
	onOrderItemClick: (orderId: string) => void;
};

const OrderCard = ({
	order,
	loading,
	onInvoiceClick,
	onOrderItemClick,
}: OrderProps) => {
	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value={order._id} className="">
				<AccordionTrigger className="border-0 select-none flex justify-between">
					<div className="flex-1">
						<h2 className="text-md font-semibold">Order ID: {order._id}</h2>
						<p className="text-sm text-gray-600">
							Date: {new Date(order.createdAt).toLocaleDateString()}
						</p>
					</div>
					<Button
						onClick={(e) => {
							e.preventDefault();
							onInvoiceClick(order.invoiceId);
						}}
						variant="outline"
						disabled={loading}
						className="text-sm mr-3"
					>
						{loading ? <Spinner /> : 'Invoice'}
					</Button>
				</AccordionTrigger>
				<AccordionContent className="border p-4 md:p-8 mt-3 mb-8 rounded-xl bg-zinc-900">
					<div className="space-y-4">
						{order.cart.items.map((item) => (
							<div
								key={item._id}
								className="flex gap-4 items-center py-2 cursor-pointer"
								onClick={() => onOrderItemClick(item.product._id)}
							>
								<img
									src={item.product.images[0]}
									alt={item.product.name}
									className="w-24 h-24 object-cover rounded-lg"
								/>
								<div className="flex-1">
									<h3 className="text-md font-medium">{item.product.name}</h3>
									<p className="text-sm text-gray-600">
										{item.product.category} - {item.size}
									</p>
									<div className="flex justify-between">
										<div className="flex items-center gap-2 mt-1 text-[#F69946] font-semibold">
											<IndianRupee size={14} /> {item.product.price.toFixed(2)}
											<span className="text-gray-500">x {item.quantity}</span>
										</div>
										<div className="font-semibold text-gray-500 mt-1">
											{(item.product.price * item.quantity).toFixed(2)}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="mt-4 flex justify-between items-center pt-4 border-t">
						<span className="text-lg font-semibold">Total</span>
						<span className="flex items-center text-[#F69946] text-lg font-bold">
							<IndianRupee size={18} />{' '}
							{order.cart.items
								.reduce(
									(total, item) => total + item.product.price * item.quantity,
									0
								)
								.toFixed(2)}
						</span>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default OrderCard;
