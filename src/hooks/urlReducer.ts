import queryString from 'query-string';
import { Action } from './useUrlDispatch';

export const PAGINATION_CHANGED = 'PAGINATION_CHANGED';
export const PET_TAB_CHANGED = 'PET_TAB_CHANGED';
export const FILTERS_CHANGED = 'FILTERS_CHANGED';
export const STORE_FILTERS_CHANGED = 'STORE_FILTERS_CHANGED';

type OldLocation = {
	pathname: string;
	search: string;
};

const paginatedFields = {
	skip: 'skip',
};

const urlReducer = (oldLocation: OldLocation, action: Action) => {
	const { pathname, search } = oldLocation;
	const query = queryString.parse(search);

	switch (action.type) {
		case PAGINATION_CHANGED: {
			const { customField } = action.payload;
			const oldSkip = query[customField || paginatedFields.skip];
			const newSkip = action.payload.skip ?? oldSkip;
			const newQuery = {
				...query,
				[customField || paginatedFields.skip]: newSkip,
			};
			return `${pathname}?${queryString.stringify(newQuery)}`;
		}
		case FILTERS_CHANGED: {
			const { newFilters, filterName } = action.payload;
			const newQuery = {
				...query,
				[filterName]: newFilters,
			};
			return `${pathname}?${queryString.stringify(newQuery)}`;
		}
		case PET_TAB_CHANGED: {
			const { pet, tab } = action.payload;
			const newQuery = {
				...query,
				pet,
				tab,
			};
			return `${pathname}?${queryString.stringify(newQuery)}`;
		}
		case STORE_FILTERS_CHANGED: {
			const { category, petType, sort } = action.payload;
			const newQuery = {
				...query,
				...(query.category === category
					? { category: undefined }
					: category && { category }),
				...(query.petType === petType
					? { petType: undefined }
					: petType && { petType }),
				...(query.sort === sort ? { sort: undefined } : sort && { sort }),
			};
			return `${pathname}?${queryString.stringify(newQuery)}`;
		}

		default:
			return oldLocation;
	}
};

export default urlReducer;
