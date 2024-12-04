import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

const SliderDisplay = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		disabled={true}
		className={cn(
			'relative flex w-full touch-none select-none items-center border  p-0.5 rounded-lg ',
			className
		)}
		{...props}
	>
		<SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-gradient-to-r from-red-500 to-green-500">
			<SliderPrimitive.Range className="absolute h-full bg-transparent" />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className="h-8 w-8 border-zinc-600 rounded-full border bg-primary-foreground shadow-xl transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center">
			<span className="text-[12px]">{props.value}</span>
		</SliderPrimitive.Thumb>
	</SliderPrimitive.Root>
));
SliderDisplay.displayName = SliderPrimitive.Root.displayName;

export { SliderDisplay };
