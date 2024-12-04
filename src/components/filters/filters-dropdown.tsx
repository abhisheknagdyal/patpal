import { SlidersHorizontal } from 'lucide-react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

const FiltersDropdown = ({
	data,
	onChange,
	selected,
}: {
	data: string[];
	onChange: any;
	selected: string[];
}) => {
	return (
		<Popover>
			<PopoverTrigger>
				<SlidersHorizontal />
			</PopoverTrigger>
			<PopoverContent>
				<ScrollArea className="h-72">
					{data &&
						data.map((tag) => (
							<div key={tag} className="flex items-center gap-5">
								<Checkbox
									onClick={onChange}
									checked={selected.includes(tag)}
									id={tag}
								/>
								<span>{tag}</span>
							</div>
						))}
				</ScrollArea>
			</PopoverContent>
		</Popover>
	);
};

export default FiltersDropdown;
