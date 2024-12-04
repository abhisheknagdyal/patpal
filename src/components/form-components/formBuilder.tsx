import * as z from 'zod';
import { useForm, get } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form.tsx';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button.tsx';
import RadioButton from '@/components/form-components/formRadioGroup..tsx';
import FormInput from '@/components/form-components/formInput.tsx';
import FormTextarea from '@/components/form-components/formTextarea.tsx';
import FormSlider from '@/components/form-components/formSlider.tsx';
import FormFileInput from '@/components/form-components/formFileInput.tsx';
import FormDatePicker from '@/components/form-components/formDatePicker.tsx';
import FormSelect from '@/components/form-components/formSelect..tsx';
import Spinner from '@/components/spinner.tsx';
import FormInputTag from '@/components/form-components/formTagInput.tsx';
import FormMultiSelect from '@/components/form-components/formMultiSelect.tsx';

import { ConfigField } from '@/utils/types.ts';
import FormDateTimePicker from '@/components/form-components/formDateTimePicker.tsx';
import { ZodSchema } from 'zod';

type FormBuilderProps = {
	config: ConfigField[];
	schema: ZodSchema;
	onSubmitForm: (value: any) => any;
	isLoading: boolean;
	defaultValues?: any;
};

const FormBuilder = ({
	config,
	schema,
	onSubmitForm,
	isLoading,
	defaultValues,
}: FormBuilderProps) => {
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		...(defaultValues ? { defaultValues } : {}),
	});

	function onSubmit(values: z.infer<typeof schema>) {
		try {
			onSubmitForm(values);
		} catch {
			toast.error('Failed to submit the form. Please try again.');
		}
	}

	const renderField = (fieldConfig: ConfigField) => {
		switch (fieldConfig.element) {
			case 'radio':
				return (
					<FormField
						control={form.control}
						name={fieldConfig.name}
						render={({ field }) => (
							<RadioButton
								label={fieldConfig.label}
								value={field.value}
								onChange={field.onChange}
								desc={fieldConfig.desc}
								options={fieldConfig.elementConfig}
								error={get(form.formState.errors, fieldConfig.name)}
							/>
						)}
					/>
				);
			case 'input':
				return (
					<FormField
						control={form.control}
						name={fieldConfig.name}
						render={({ field }) => (
							<FormInput
								label={fieldConfig.label}
								value={field.value}
								placeholder={fieldConfig.elementConfig.placeholder}
								error={get(form.formState.errors, fieldConfig.name)}
								desc={fieldConfig.desc}
								onChange={field.onChange}
								type={fieldConfig.elementConfig.type}
							/>
						)}
					/>
				);
			case 'textarea':
				return (
					<FormField
						control={form.control}
						name={fieldConfig.name}
						render={({ field }) => (
							<FormTextarea
								label={fieldConfig.label}
								placeholder={fieldConfig.elementConfig.placeholder}
								error={get(form.formState.errors, fieldConfig.name)}
								desc={fieldConfig.desc}
								field={field}
							/>
						)}
					/>
				);
			case 'slider':
				return (
					<FormField
						control={form.control}
						name={fieldConfig.name}
						render={({ field: { value, onChange } }) => (
							<FormSlider
								label={fieldConfig.label}
								error={get(form.formState.errors, fieldConfig.name)}
								desc={fieldConfig.desc}
								defaultValue={[fieldConfig.elementConfig.defaultValue]}
								value={value}
								onChange={onChange}
								min={fieldConfig.elementConfig.min}
								max={fieldConfig.elementConfig.max}
								step={fieldConfig.elementConfig.step}
							/>
						)}
					/>
				);
			case 'file-input':
				return (
					<FormField
						control={form.control}
						name={fieldConfig.name}
						render={({ field }) => (
							<FormFileInput
								label={fieldConfig.label}
								desc={fieldConfig.desc}
								error={get(form.formState.errors, fieldConfig.name)}
								field={field}
								maxFiles={fieldConfig.elementConfig.maxFiles}
							/>
						)}
					/>
				);
			case 'date-picker':
				return (
					<FormField
						control={form.control}
						name={fieldConfig.name}
						render={({ field }) => (
							<FormDatePicker
								label={fieldConfig.label}
								desc={fieldConfig.desc}
								value={field.value}
								onChange={field.onChange}
								error={get(form.formState.errors, fieldConfig.name)}
							/>
						)}
					/>
				);
			case 'datetime':
				return (
					<FormField
						control={form.control}
						name={fieldConfig.name}
						render={({ field }) => (
							<FormDateTimePicker
								label={fieldConfig.label}
								showDate={fieldConfig.elementConfig.showDate}
								desc={fieldConfig.desc}
								value={field.value}
								onChange={field.onChange}
								error={get(form.formState.errors, fieldConfig.name)}
							/>
						)}
					/>
				);
			case 'select':
				return (
					<FormField
						control={form.control}
						name={fieldConfig.name}
						render={({ field }) => (
							<FormSelect
								placeholder={fieldConfig.placeholder}
								label={fieldConfig.label}
								desc={fieldConfig.desc}
								value={field.value}
								onChange={field.onChange}
								options={fieldConfig.elementConfig}
								error={get(form.formState.errors, fieldConfig.name)}
							/>
						)}
					/>
				);
			case 'multi-select':
				return (
					<FormField
						control={form.control}
						name={fieldConfig.name}
						render={({ field }) => (
							<FormMultiSelect
								placeholder={fieldConfig.placeholder}
								label={fieldConfig.label}
								desc={fieldConfig.desc}
								value={field.value}
								onChange={field.onChange}
								options={fieldConfig.elementConfig}
								error={get(form.formState.errors, fieldConfig.name)}
							/>
						)}
					/>
				);
			case 'tag':
				return (
					<FormField
						control={form.control}
						name={fieldConfig.name}
						render={({ field }) => (
							<FormInputTag
								label={fieldConfig.label}
								desc={fieldConfig.desc}
								value={field.value || []}
								onChange={field.onChange}
								placeholder={fieldConfig.elementConfig.placeholder}
								error={get(form.formState.errors, fieldConfig.name)}
							/>
						)}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 max-w-3xl mx-auto py-10"
				>
					<div className="grid grid-cols-12 gap-4">
						{config.map((fieldConfig) => (
							<div
								className={`${fieldConfig.className || 'col-span-6'}`}
								key={fieldConfig.name}
							>
								{fieldConfig?.conditional
									? fieldConfig?.condition(form.watch())
										? renderField(fieldConfig)
										: null
									: renderField(fieldConfig)}
							</div>
						))}
					</div>
					<Button disabled={isLoading} type="submit">
						{isLoading ? <Spinner /> : 'Save'}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default FormBuilder;
