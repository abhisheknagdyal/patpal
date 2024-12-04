import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';

import TableLayout from '@/components/admins/table/tableLayout.tsx';
import Spinner from '@/components/spinner.tsx';
import Paginator from '@/components/paginator/paginator.tsx';
import GenericEditForm from '@/components/admins/genericEditForm.tsx';

import useUrlDispatch from '@/hooks/useUrlDispatch.ts';
import productsTableConfig from '@/config/tables/productsTableConfig.ts';
import { getAdminProducts } from '@/redux/reducers/admin/productsReducer.ts';
import { PAGINATION_CHANGED } from '@/hooks/urlReducer.ts';
import { isEmpty, omit } from '@/utils/lodash.ts';

import { ProductsConfig } from '@/config/forms/productsConfig.ts';
import { EditProductSchema } from '@/utils/types.ts';
import { z } from 'zod';
import { updateProduct } from '@/redux/reducers/store/editProductReducer.ts';
import { deleteProduct } from '@/redux/reducers/store/deleteProductReducer.ts';
import { Refresh } from '@/pages/admins/adminPage.tsx';

const DEFAULT_TAKE = 10;

const ProductsTable = ({
	parentRefresh,
}: {
	parentRefresh: Refresh['product'];
}) => {
	const appDispatch = useAppDispatch();
	const [showModal, setShowModal] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [editId, setEditId] = useState('');
	const { dispatch } = useUrlDispatch({ replace: true });
	const query = queryString.parse(location.search);
	const { loading, products } = useAppSelector((state) => state.admin.products);
	const { loading: updatingProduct } = useAppSelector(
		(state) => state.store.updateProduct
	);
	const { loading: deletingProduct, idInState } = useAppSelector(
		(state) => state.store.deleteProduct
	);
	const showCaption = !loading && products.count < DEFAULT_TAKE;

	const setPagination = (pagination: number) => {
		dispatch({
			type: PAGINATION_CHANGED,
			payload: {
				skip: pagination,
				customField: 'productsSkip',
			},
		});
	};

	const onEditClicked = (id: string) => {
		setEditId(id);
		setShowModal(true);
	};

	const onSubmitEdit = (values: z.infer<typeof EditProductSchema>) => {
		let finalValues = values;
		if (values.category !== 'Accessories') {
			finalValues = omit(finalValues, ['sizesAvailable', 'colorsAvailable']);
		}
		appDispatch(updateProduct({ body: finalValues, id: editId })).then(
			(res) => {
				if (res.meta.requestStatus === 'fulfilled') {
					setShowModal(false);
					setRefresh((prevState) => !prevState);
				}
			}
		);
	};

	const onDelete = (id: string) => {
		appDispatch(deleteProduct(id)).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setRefresh((prevState) => !prevState);
			}
		});
	};

	useEffect(() => {
		appDispatch(getAdminProducts({ skip: Number(query.productsSkip) || 0 }));
	}, [appDispatch, query.productsSkip, refresh, parentRefresh]);

	return (
		<div className="w-full">
			<TableLayout
				title="Products"
				tableCaption="A list of all products available for purchase."
				tableConfig={productsTableConfig}
				data={products.results}
				loading={loading}
				showTableCaption={showCaption}
				hasEdit
				onEdit={onEditClicked}
				hasDelete
				onDelete={onDelete}
				deleteLoading={deletingProduct}
				deleteStateId={idInState}
			/>
			{loading && isEmpty(products.results) && (
				<div className="w-full flex justify-center items-center mt-5">
					<Spinner />
				</div>
			)}
			<Paginator
				count={products.count}
				skip={Number(query.productsSkip) || 0}
				setPagination={setPagination}
			/>
			<GenericEditForm
				open={showModal}
				setOpen={setShowModal}
				config={ProductsConfig}
				schema={EditProductSchema}
				headerTitle={`Edit Product - ${
					(products.results.find((it) => (it as any)._id === editId) as any)
						?.name
				}`}
				desc={
					"Use this form to edit the details of a your Product. Click 'Submit' when you’re finished."
				}
				onSubmit={onSubmitEdit}
				loading={updatingProduct}
				defaultValues={products.results.find(
					(it) => (it as any)._id === editId
				)}
			/>
		</div>
	);
};

export default ProductsTable;
