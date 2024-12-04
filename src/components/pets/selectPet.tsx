import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { getMyPets } from '@/redux/reducers/pets/fetchMyPetsReducer.ts';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label.tsx';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select.tsx';
import { Skeleton } from '@/components/ui/skeleton';

import { Bot } from 'lucide-react';
import { ROUTES } from '@/constants/routes.ts';

export function SelectPet() {
	const [selectedPet, setSelectedPet] = useState<string | null>(null);
	const navigate = useNavigate();

	const appDispatch = useAppDispatch();
	const { pets, loading } = useAppSelector((state) => state.pets.getMyPets);

	useEffect(() => {
		appDispatch(getMyPets());
	}, [appDispatch]);

	const handleValueChange = (value: string) => {
		setSelectedPet(value);
	};

	const handleOnSubmit = () => {
		if (selectedPet) {
			navigate(ROUTES.VET_CARE.getBotPath(selectedPet));
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="flex flex-col items-center justify-center w-64 h-40 bg-[#4caf50] text-white rounded-lg shadow-lg cursor-pointer hover:bg-[#3b8f3a] transition-colors">
					<Bot size={40} className="mb-3" />
					<span className="text-xl font-semibold">Chat with Vetika</span>
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]" loading={false}>
				<DialogHeader>
					<DialogTitle>Select Pet to Start Chat</DialogTitle>
					<DialogDescription>
						Choose the pet you’d like to consult about before chatting with
						Vetika.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="space-y-2">
						<Label>Select a Pet to Start the Consultation</Label>
						{loading ? (
							<Skeleton className="h-10 w-full rounded-md" />
						) : (
							<Select
								onValueChange={handleValueChange}
								value={selectedPet || undefined}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select your Pet" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{pets.results.map((pet) => (
											<SelectItem key={pet._id} value={pet._id}>
												{pet.name}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						)}
					</div>
				</div>
				<DialogFooter>
					<Button
						disabled={!selectedPet}
						type="button"
						onClick={handleOnSubmit}
					>
						Start Chat
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
