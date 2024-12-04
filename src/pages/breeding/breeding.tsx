import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import queryString from 'query-string';
import { Info } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import useUrlDispatch from '@/hooks/useUrlDispatch.ts';

import { getMyPets } from '@/redux/reducers/pets/fetchMyPetsReducer.ts';
import { getAllPets } from '@/redux/reducers/pets/fetchAllPetsReducer.ts';
import { getFilters } from '@/redux/reducers/pets/filtersReducer.ts';
import { safeWrapInArray } from '@/utils/lodash.ts';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select.tsx';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import TooltipWrapper from '@/components/tooltipWrapper.tsx';
import MyPetsMapper from '@/components/pets/myPetsMapper.tsx';
import AllPetsMapper from '@/components/pets/allPetsMapper.tsx';
import FiltersDropdown from '@/components/filters/filters-dropdown.tsx';

import { FILTERS_CHANGED, PET_TAB_CHANGED } from '@/hooks/urlReducer.ts';
import { ROUTES } from '@/constants/routes.ts';
import useScrollToTop from '@/hooks/useScrollToTop.ts';

const Breeding = () => {
	const appDispatch = useAppDispatch();
	const location = useLocation();
	const { dispatch } = useUrlDispatch({ replace: true });
	const query = queryString.parse(location.search);
	const stringHookDep = String(query.filters);
	const queryFilters = useMemo(
		() => safeWrapInArray(query.filters),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[stringHookDep] // As filters are stored in array, we will treat them as exhaustive deps
	);
	const navigate = useNavigate();
	const scrollRef = useScrollToTop(query);

	const { pets, loading } = useAppSelector((state) => state.pets.getMyPets);
	const { filters } = useAppSelector((state) => state.pets.getFilters);
	const { pets: allPets, loading: allPetsLoading } = useAppSelector(
		(state) => state.pets.getAllPets
	);

	useEffect(() => {
		appDispatch(getMyPets());
	}, [appDispatch]);

	useEffect(() => {
		appDispatch(getFilters());
	}, [appDispatch]);

	useEffect(() => {
		if (query.tab === 'other_pets' && query.pet) {
			appDispatch(
				getAllPets({
					skip: Number(query.skip) || 0,
					filters: queryFilters,
				})
			);
		}
	}, [appDispatch, query.pet, query.tab, query.skip, queryFilters]);

	const handleValueChange = (value: string) => {
		dispatch({
			type: PET_TAB_CHANGED,
			payload: { pet: value, tab: query.tab },
		});
	};

	const handleTabChange = (value: string) => {
		dispatch({
			type: PET_TAB_CHANGED,
			payload: { pet: query.pet, tab: value },
		});
	};

	const handleCardClick = (potentialPet: string) => {
		const newQuery = { myPet: query.pet, potentialPet: potentialPet };
		navigate(`${ROUTES.BREEDING.match}?${queryString.stringify(newQuery)}`);
	};

	const handleFilterChange = (e: any) => {
		let newFilters;
		if (queryFilters.length > 0 && queryFilters.includes(e.target.id)) {
			newFilters = queryFilters.filter((item) => item !== e.target.id);
		} else {
			newFilters = [...queryFilters, e.target.id];
		}
		dispatch({
			type: FILTERS_CHANGED,
			payload: { newFilters, filterName: 'filters' },
		});
	};

	return (
		<div className="xl:px-20 xl:py-12 p-4">
			<div className="space-y-6">
				<div className="flex items-center justify-between gap-5">
					<Badge variant="secondary" className="py-2">
						<TooltipWrapper
							Icon={<Info />}
							content={`Only vaccinated pets are eligible for breeding.
					 Ensure all pet details are complete and up-to-date for optimal results.`}
						/>
					</Badge>
					{query.tab === 'other_pets' && (
						<FiltersDropdown
							data={filters.filters}
							onChange={handleFilterChange}
							selected={queryFilters as string[]}
						/>
					)}
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-12">
					{loading ? (
						<>
							<div className="space-y-2">
								<Skeleton className="h-5 w-44" />
								<Skeleton className="h-10 w-full" />
							</div>{' '}
							<div className="space-y-2">
								<Skeleton className="h-5 w-44" />
								<Skeleton className="h-10 w-full" />
							</div>
						</>
					) : (
						<>
							<div className="space-y-2">
								<Label>Select the Pet you want to breed</Label>
								<Select
									onValueChange={handleValueChange}
									value={query.pet as string}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select your Pet" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{pets.results
												.filter(
													(pet) =>
														pet.vaccinated === true &&
														pet.adoption_status !== 'available'
												)
												.map((pet) => (
													<SelectItem key={pet._id} value={pet._id}>
														{pet.name}
													</SelectItem>
												))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label>Select the Pet you want to breed</Label>
								<Tabs value={query.tab as string}>
									<TabsList className="grid w-full grid-cols-2">
										<TabsTrigger
											value="my_pets"
											onClick={() => handleTabChange('my_pets')}
										>
											My Pets
										</TabsTrigger>
										<TabsTrigger
											value="other_pets"
											onClick={() => handleTabChange('other_pets')}
										>
											Other Pets
										</TabsTrigger>
									</TabsList>
								</Tabs>
							</div>
						</>
					)}
				</div>
			</div>
			<div className="mt-12" ref={scrollRef}>
				{query.tab === 'my_pets' && query.pet && (
					<MyPetsMapper
						pets={pets.results}
						handleCardClick={handleCardClick}
						selectedPet={query.pet as string}
					/>
				)}
				{query.tab === 'other_pets' && query.pet && (
					<AllPetsMapper
						loading={allPetsLoading}
						pets={allPets}
						handleCardClick={handleCardClick}
					/>
				)}
			</div>
		</div>
	);
};

export default Breeding;
