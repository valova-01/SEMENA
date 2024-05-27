import PropTypes from 'prop-types';
import { ROLE } from './role';
import { STATUS } from './status';

const ROLE_ID = PropTypes.oneOf(Object.values(ROLE));
const STATUS_ID = PropTypes.oneOf(Object.values(STATUS));

export const PROP_TYPE = {
	ROLE_ID,
	ROLE: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
	}),
	ERROR: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
	PRODUCT: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		imageUrl: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		subcategory: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired,
		ripeningPeriod: PropTypes.string.isRequired,
		growingRegion: PropTypes.string.isRequired,
		expirationDate: PropTypes.string.isRequired,
	}),
	BASKET: PropTypes.shape({
		id: PropTypes.string.isRequired,
		userId: PropTypes.string.isRequired,
		products: PropTypes.string.isRequired,
	}),
	ORDER: PropTypes.shape({
		id: PropTypes.string.isRequired,
		userId: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		products: PropTypes.string.isRequired,
		comments: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
	}),
	STATUS_ID,
	STATUS: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
	}),
};
