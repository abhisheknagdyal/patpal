import { ComponentType, Dispatch, SetStateAction } from 'react';
import { ZodSchema } from 'zod';

import { Button } from '@/components/ui/button.tsx';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import FormBuilder from '@/components/form-components/formBuilder.tsx';

import { ConfigField } from '@/utils/types.ts';

type ModalProps = {
	headerTitle: string;
	desc: string;
	buttonTitle?: string;
	config: ConfigField[];
	schema: ZodSchema;
	Icon?: ComponentType;
	onSubmit: (values: any) => void;
	isLoading: boolean;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	variant?:
		| 'secondary'
		| 'link'
		| 'default'
		| 'destructive'
		| 'outline'
		| 'ghost';
	defaultValues?: any;
	headless?: boolean;
};

const FormModal = ({
	headerTitle,
	Icon,
	buttonTitle,
	desc,
	config,
	schema,
	onSubmit,
	isLoading,
	open,
	setOpen,
	defaultValues,
	variant = 'outline',
	headless = false,
}: ModalProps) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{!headless && (
					<Button variant={variant}>
						{Icon && <Icon />}
						{buttonTitle}
					</Button>
				)}
			</DialogTrigger>
			<DialogContent
				loading={isLoading}
				className="max-w-4xl max-h-[80vh] overflow-y-auto"
				onInteractOutside={(e) => {
					if (isLoading) e.preventDefault();
				}}
			>
				<DialogHeader>
					<DialogTitle>{headerTitle}</DialogTitle>
					<DialogDescription>{desc}</DialogDescription>
				</DialogHeader>
				<ScrollArea>
					<FormBuilder
						config={config}
						schema={schema}
						onSubmitForm={onSubmit}
						isLoading={isLoading}
						defaultValues={defaultValues}
					/>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

export default FormModal;
