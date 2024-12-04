import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import vet from '@/assets/vet.png';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';

import { getDoctorById } from '@/redux/reducers/doctors/fetchSingleDoctorReducer.ts';

import { Card } from '@/components/ui/card.tsx';
import DoctorDetailsSkeleton from '@/components/skeletons/doctorDetailsSkeleton.tsx';

import { convertNumberToTime } from '@/utils/time.ts';
import { Badge } from '@/components/ui/badge.tsx';

const DoctorDetails = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();

	const { doctor, loading } = useAppSelector(
		(state) => state.doctors.fetchSingleDoctor
	);

	useEffect(() => {
		dispatch(getDoctorById(id!));
	}, [dispatch, id]);

	if (loading) {
		return <DoctorDetailsSkeleton />;
	}
	return (
		<div className="max-w-3xl mx-auto p-6 space-y-6 py-4 xl:pt-6">
			<Card className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
				<div className="md:w-1/3 w-full bg-zinc-900 h-52">
					<img
						className="object-cover h-full w-full bg-center"
						src={doctor?.profilePicture || vet}
						alt={doctor.name}
					/>
				</div>
				<div className="p-6 flex flex-col justify-between space-y-4 md:w-2/3">
					<h2 className="text-3xl font-semibold text-zinc-400">
						{doctor.name}
					</h2>
					<p className="text-lg capitalize text-[#673ab7]">
						{doctor.specialization}
					</p>
					<div className="flex items-center text-sm text-gray-500">
						<span className="font-medium">Experience:</span>{' '}
						{doctor.experienceYears} years
					</div>
				</div>
			</Card>
			{doctor.bio && (
				<Card className="shadow-lg rounded-lg p-6 space-y-4">
					<h3 className="text-xl font-semibold text-zinc-500">
						About {doctor.name}
					</h3>
					<p className="text-gray-600">{doctor.bio}</p>
				</Card>
			)}
			<Card className="shadow-lg rounded-lg p-6 space-y-4">
				<h3 className="text-xl font-semibold text-zinc-500">
					Contact Information
				</h3>
				<div className="space-y-2">
					<div className="flex items-center space-x-2 text-sm text-gray-600">
						<span className="font-medium">Phone:</span>
						<a
							href={`tel:${doctor.contact.phone}`}
							className="text-[#673ab7] hover:underline"
						>
							{doctor.contact.phone}
						</a>
					</div>
					<div className="flex items-center space-x-2 text-sm text-gray-600">
						<span className="font-medium">Email:</span>
						<a
							href={`mailto:${doctor.contact.email}`}
							className="text-[#673ab7] hover:underline"
						>
							{doctor.contact.email}
						</a>
					</div>
					{doctor.clinicAddress && (
						<div className="text-sm text-gray-600 flex gap-2">
							<span className="font-medium">Clinic Address:</span>
							<p>{`${doctor.clinicAddress.street}, ${doctor.clinicAddress.city}, ${doctor.clinicAddress.state}, ${doctor.clinicAddress.postalCode}, ${doctor.clinicAddress.country}`}</p>
						</div>
					)}
				</div>
			</Card>
			<Card className="shadow-lg rounded-lg p-6 space-y-4">
				<h3 className="text-xl font-semibold text-zinc-500">Availability</h3>
				<div className="space-y-2">
					<div className="flex gap-2 items-center text-sm text-gray-600">
						<span className="font-medium">Available Days:</span>
						<span>{doctor.availability.days.join(', ')}</span>
					</div>
					<div className="flex gap-2 items-center text-sm text-gray-600">
						<span className="font-medium">Time Slots:</span>
						<Badge variant="outline" className="px-3 py-1 text-sm">
							{convertNumberToTime(doctor?.availability?.timeSlots[0])}
						</Badge>
						<span className="text-gray-400">to</span>
						<Badge variant="outline" className="px-3 py-1 text-sm">
							{convertNumberToTime(doctor?.availability?.timeSlots[1])}
						</Badge>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default DoctorDetails;
