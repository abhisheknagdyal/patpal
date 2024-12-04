import { ReactNode } from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip.tsx';

function TooltipWrapper({
	Icon,
	content,
}: {
	Icon: ReactNode;
	content: string;
}) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild className="cursor-pointer">
					{Icon}
				</TooltipTrigger>
				<TooltipContent>
					<p>{content}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

export default TooltipWrapper;
