import { useEffect } from 'react';
import queryString from 'query-string';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';

import TableLayout from '@/components/admins/table/tableLayout.tsx';
import Spinner from '@/components/spinner.tsx';
import Paginator from '@/components/paginator/paginator.tsx';

import useUrlDispatch from '@/hooks/useUrlDispatch.ts';
import usersTableConfig from '@/config/tables/usersTableConfig.ts';
import { getAdminUsers } from '@/redux/reducers/admin/usersReducer.ts';
import { PAGINATION_CHANGED } from '@/hooks/urlReducer.ts';
import { isEmpty } from '@/utils/lodash.ts';
import { Refresh } from '@/pages/admins/adminPage.tsx';

const UsersTable = ({ parentRefresh }: { parentRefresh: Refresh['user'] }) => {
	const appDispatch = useAppDispatch();
	const { dispatch } = useUrlDispatch({ replace: true });
	const query = queryString.parse(location.search);
	const { loading, users } = useAppSelector(
		(state) => state.admin.monitoredUsers
	);
	const showCaption = !loading && users.count < 10;

	const setPagination = (pagination: number) => {
		dispatch({
			type: PAGINATION_CHANGED,
			payload: {
				skip: pagination,
				customField: 'usersSkip',
			},
		});
	};

	useEffect(() => {
		appDispatch(getAdminUsers({ skip: Number(query.usersSkip) || 0 }));
	}, [appDispatch, query.usersSkip, parentRefresh]);

	return (
		<div className="w-full">
			<TableLayout
				title="Users"
				tableCaption="A list of all monitored users."
				tableConfig={usersTableConfig}
				data={users.results}
				loading={loading}
				showTableCaption={showCaption}
			/>
			{loading && isEmpty(users.results) && (
				<div className="w-full flex justify-center items-center mt-5">
					<Spinner />
				</div>
			)}
			<Paginator
				count={users.count}
				skip={Number(query.usersSkip) || 0}
				setPagination={setPagination}
			/>
		</div>
	);
};

export default UsersTable;
