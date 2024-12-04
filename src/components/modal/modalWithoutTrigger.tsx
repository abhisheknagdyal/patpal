import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import Spinner from '@/components/spinner.tsx';

type Props = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	loading: boolean;
	buttonTitle: string;
	onClick: () => void;
	title?: string;
	description?: string;
	content: ReactNode;
};

const ModalWithoutTrigger = ({
	open,
	setOpen,
	loading,
	title,
	description,
	content,
	buttonTitle,
	onClick,
}: Props) => {
	return (
		<Dialog open={open}>
			<DialogContent
				className="sm:max-w-[425px]"
				loading={loading}
				onClose={() => setOpen(false)}
				onInteractOutside={(e) => {
					if (loading) e.preventDefault();
					else setOpen(false);
				}}
			>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{content}
				<DialogFooter>
					<Button onClick={onClick}>
						{loading ? <Spinner /> : `${buttonTitle}`}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ModalWithoutTrigger;
