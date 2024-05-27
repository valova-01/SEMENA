import { request } from '../utils/request';
import {
	loadProductsStart,
	loadProductsSuccess,
	loadProductsFailure,
	loadCategoriesSuccess,
	loadSubcategoriesSuccess,
	loadRipeningPeriodsSuccess,
	loadGrowingRegionsSuccess,
} from '../actions';

export const loadProducts = (params) => async (dispatch) => {
	dispatch(loadProductsStart());
	try {
		const response = await request(
			`/products?${new URLSearchParams(params).toString()}`,
		);
		dispatch(loadProductsSuccess(response.data));
	} catch (error) {
		dispatch(loadProductsFailure(error.toString()));
	}
};

export const loadCategories = () => async (dispatch) => {
	try {
		const response = await request('/categores');
		dispatch(loadCategoriesSuccess(response.categores));
	} catch (error) {
		console.error(error);
	}
};

export const loadSubcategories = () => async (dispatch) => {
	try {
		const response = await request('/subcategores');
		dispatch(loadSubcategoriesSuccess(response.subcategores));
	} catch (error) {
		console.error(error);
	}
};

export const loadRipeningPeriods = () => async (dispatch) => {
	try {
		const response = await request('/ripeningPeriods');
		dispatch(loadRipeningPeriodsSuccess(response.ripeningPeriods));
	} catch (error) {
		console.error(error);
	}
};

export const loadGrowingRegions = () => async (dispatch) => {
	try {
		const response = await request('/growingRegions');
		dispatch(loadGrowingRegionsSuccess(response.growingRegions));
	} catch (error) {
		console.error(error);
	}
};
