import { ACTION_TYPE } from '../actions';

const initialState = {
	products: [],
	lastPage: 1,
	categories: [],
	subcategories: [],
	ripeningPeriods: [],
	growingRegions: [],
	isLoading: false,
	error: null,
};

export const pagesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOAD_PRODUCTS_START:
			return { ...state, isLoading: true, error: null };
		case ACTION_TYPE.LOAD_PRODUCTS_SUCCESS:
			return {
				...state,
				products: action.payload.products,
				lastPage: action.payload.lastPage,
				isLoading: false,
			};
		case ACTION_TYPE.LOAD_PRODUCTS_FAILURE:
			return { ...state, isLoading: false, error: action.payload };
		case ACTION_TYPE.LOAD_CATEGORIES_SUCCESS:
			return { ...state, categories: action.payload };
		case ACTION_TYPE.LOAD_SUBCATEGORIES_SUCCESS:
			return { ...state, subcategories: action.payload };
		case ACTION_TYPE.LOAD_RIPENING_PERIODS_SUCCESS:
			return { ...state, ripeningPeriods: action.payload };
		case ACTION_TYPE.LOAD_GROWING_REGIONS_SUCCESS:
			return { ...state, growingRegions: action.payload };
		default:
			return state;
	}
};
