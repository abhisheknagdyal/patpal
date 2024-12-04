import { Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { ProductSchema } from '@/utils/types.ts';
import { PackageOpen } from 'lucide-react';
import FormModal from '@/components/form-components/formModal.tsx';
import { z } from 'zod';
import { omit } from '@/utils/lodash.ts';
import { createProduct } from '@/redux/reducers/store/createProductReducer.ts';
import { ProductsConfig } from '@/config/forms/productsConfig.ts';
import { Refresh } from '@/pages/admins/adminPage.tsx';

const AddProductButton = ({
	setParentRefresh,
}: {
	setParentRefresh: Dispatch<SetStateAction<Refresh>>;
}) => {
	const [open, setOpen] = useState(false);

	const dispatch = useAppDispatch();
	const { loading } = useAppSelector((state) => state.store.createProduct);

	const onSubmit = (values: z.infer<typeof ProductSchema>) => {
		let finalValues = values;
		if (values.category !== 'Accessories') {
			finalValues = omit(finalValues, ['sizesAvailable', 'colorsAvailable']);
		}
		dispatch(createProduct(finalValues)).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setOpen(false);
				setParentRefresh((prevState) => ({
					...prevState,
					product: !prevState.product,
				}));
			}
		});
	};

	return (
		<FormModal
			headerTitle="Add a Product"
			buttonTitle="Add a Product"
			desc="Use this form to enter the details of a new Product. Click 'Save' when you’re finished."
			config={ProductsConfig}
			schema={ProductSchema}
			onSubmit={onSubmit}
			Icon={PackageOpen}
			isLoading={loading}
			open={open}
			setOpen={setOpen}
		/>
	);
};

export default AddProductButton;
