import FormModal from '@/components/form-components/formModal.tsx';

type Props = {
	open: boolean;
	setOpen: any;
	onSubmit: any;
	loading: boolean;
	defaultValues: any;
	headerTitle: string;
	config: any;
	schema: any;
	desc: string;
};

const GenericEditForm = ({
	open,
	setOpen,
	onSubmit,
	loading,
	defaultValues,
	headerTitle,
	desc,
	config,
	schema,
}: Props) => {
	return (
		<FormModal
			headless
			headerTitle={headerTitle}
			desc={desc}
			config={config}
			schema={schema}
			onSubmit={onSubmit}
			isLoading={loading}
			open={open}
			setOpen={setOpen}
			defaultValues={defaultValues}
		/>
	);
};

export default GenericEditForm;
