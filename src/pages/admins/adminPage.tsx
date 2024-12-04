import { useState } from 'react';
import ResizeableGrid from '@/components/resizableGrid/resizeableGrid.tsx';
import UsersTable from '@/components/admins/table/usersTable.tsx';
import PetsTable from '@/components/admins/table/petsTable.tsx';
import ProductsTable from '@/components/admins/table/productsTable.tsx';
import DoctorsTable from '@/components/admins/table/doctorsTable.tsx';
import AdoptionButton from '@/components/admins/adoptionButton.tsx';
import UsersButton from '@/components/admins/usersButton.tsx';
import AddProductButton from '@/components/admins/addProductButton.tsx';
import AddDoctorsButton from '@/components/admins/addDoctorsButton.tsx';

export type Refresh = {
	user: boolean;
	adoption: boolean;
	product: boolean;
	doctors: boolean;
};

const AdminPage = () => {
	const [parentRefresh, setParentRefresh] = useState<Refresh>({
		user: false,
		adoption: false,
		product: false,
		doctors: false,
	});
	return (
		<div className="h-[88vh] w-full px-3 py-3 flex flex-col gap-5 fixed">
			<div className="flex items-center justify-between">
				<span>Welcome to your admin panel</span>
				<div className="flex items-center justify-between gap-5">
					<UsersButton setParentRefresh={setParentRefresh} />
					<AdoptionButton setParentRefresh={setParentRefresh} />
					<AddProductButton setParentRefresh={setParentRefresh} />
					<AddDoctorsButton setParentRefresh={setParentRefresh} />
				</div>
			</div>
			<ResizeableGrid
				panelOneElement={<UsersTable parentRefresh={parentRefresh.user} />}
				panelTwoElement={<DoctorsTable parentRefresh={parentRefresh.doctors} />}
				panelThreeElement={<PetsTable parentRefresh={parentRefresh.adoption} />}
				panelFourElement={
					<ProductsTable parentRefresh={parentRefresh.product} />
				}
			/>
		</div>
	);
};

export default AdminPage;
