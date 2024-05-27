import { ACTION_TYPE } from '../actions';

export const loadProductsStart = () => ({ type: ACTION_TYPE.LOAD_PRODUCTS_START });
export const loadProductsSuccess = (data) => ({
	type: ACTION_TYPE.LOAD_PRODUCTS_SUCCESS,
	payload: data,
});
export const loadProductsFailure = (error) => ({
	type: ACTION_TYPE.LOAD_PRODUCTS_FAILURE,
	payload: error,
});
export const loadCategoriesSuccess = (data) => ({
	type: ACTION_TYPE.LOAD_CATEGORIES_SUCCESS,
	payload: data,
});
export const loadSubcategoriesSuccess = (data) => ({
	type: ACTION_TYPE.LOAD_SUBCATEGORIES_SUCCESS,
	payload: data,
});
export const loadRipeningPeriodsSuccess = (data) => ({
	type: ACTION_TYPE.LOAD_RIPENING_PERIODS_SUCCESS,
	payload: data,
});
export const loadGrowingRegionsSuccess = (data) => ({
	type: ACTION_TYPE.LOAD_GROWING_REGIONS_SUCCESS,
	payload: data,
});
