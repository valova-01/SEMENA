import PropTypes from 'prop-types';
import { Button } from '../../../../components';
import styles from './pagination.module.css';

export const Pagination = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={`${styles.pagination} ${className}`}>
			<Button
				className={styles.buttonPagination}
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
			>
				В начало
			</Button>
			<Button
				className={styles.buttonPagination}
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
			>
				Предыдущая
			</Button>
			<div className={styles.currentPage}>Страница: {page}</div>
			<Button
				className={styles.buttonPagination}
				disabled={page === lastPage}
				onClick={() => setPage(page + 1)}
			>
				Следующая
			</Button>
			<Button
				className={styles.buttonPagination}
				disabled={page === lastPage}
				onClick={() => setPage(lastPage)}
			>
				В конец
			</Button>
		</div>
	);
};

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
};
