import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import querystring from 'query-string';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { getAdoptablePetById } from '@/redux/reducers/pets/getAdoptionReducer.ts';
import { adoptPet } from '@/redux/reducers/pets/petAdoptionReducer.ts';
import { getMyPetById } from '@/redux/reducers/pets/fetchMySinglePetReducer.ts';
import { listForAdoption } from '@/redux/reducers/pets/putPetForAdoptionReducer.ts';
import { cancelAdoption } from '@/redux/reducers/pets/cancelAdoptionReducer.ts';

import PetDetails from '@/components/pets/petDetails.tsx';
import { useUser } from '@/hooks/useUser.ts';

type Props = {
	isAdoption: boolean;
};

const PetDetailsWrapper = ({ isAdoption }: Props) => {
	const [refresh, setRefresh] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const location = useLocation();
	const { status } = querystring.parse(location.search);
	const conditionalAdoption = isAdoption || status === 'available';
	const { userSubscription } = useUser();

	const { pet, loading } = useAppSelector((state) =>
		conditionalAdoption
			? state.pets.getAdoptionPet
			: state.pets.fetchMySinglePet
	);
	const buttonTitle = () => {
		if (isAdoption) {
			return 'Adopt Me';
		} else if (!isAdoption && status === 'available') {
			return 'Cancel Adoption';
		} else {
			return 'Put me for adoption';
		}
	};

	useEffect(() => {
		if (id) {
			if (conditionalAdoption) {
				dispatch(getAdoptablePetById(id));
			} else {
				dispatch(getMyPetById(id));
			}
		}
	}, [conditionalAdoption, dispatch, id, refresh]);

	const handleClick = () => {
		if (isAdoption) {
			dispatch(adoptPet({ id: pet._id!, navigate: navigate }));
		} else if (!isAdoption && status === 'available') {
			dispatch(cancelAdoption({ id: pet._id!, navigate: navigate }));
		} else {
			dispatch(listForAdoption({ id: pet._id!, navigate: navigate }));
		}
	};

	return (
		<PetDetails
			pet={pet}
			onClick={handleClick}
			buttonTitle={buttonTitle()}
			isLoading={loading}
			setRefresh={setRefresh}
			role={userSubscription}
		/>
	);
};

export default PetDetailsWrapper;
