import { useEffect, useMemo, useState } from 'react';
import { Pagination, ProductCard, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce } from './utils';
import { Loader } from '../../components/loader/loader';
import styles from './main.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../redux/selectors';
import {
	loadBasketAsync,
	loadProducts,
	loadCategories,
	loadSubcategories,
	loadRipeningPeriods,
	loadGrowingRegions,
} from '../../redux/actions';
import { Select } from '../../components/select/Select';

export const Main = ({ className }) => {
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const {
		products,
		lastPage,
		categories,
		subcategories,
		ripeningPeriods,
		growingRegions,
		isLoading,
	} = useSelector((state) => state.pages);

	const [page, setPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [sortDirection, setSortDirection] = useState('asc');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedSubcategory, setSelectedSubcategory] = useState('');
	const [selectedRipeningPeriod, setSelectedRipeningPeriod] = useState('');
	const [selectedGrowingRegion, setSelectedGrowingRegion] = useState('');

	useEffect(() => {
		dispatch(loadCategories());
		dispatch(loadSubcategories());
		dispatch(loadRipeningPeriods());
		dispatch(loadGrowingRegions());
		if (userId) {
			dispatch(loadBasketAsync(userId));
		}
	}, [dispatch, userId]);

	useEffect(() => {
		const params = {
			search: searchPhrase,
			page,
			limit: PAGINATION_LIMIT,
			sortDirection,
			category: selectedCategory,
			subcategory: selectedSubcategory,
			ripeningPeriod: selectedRipeningPeriod,
			growingRegion: selectedGrowingRegion,
		};
		dispatch(loadProducts(params));
	}, [
		dispatch,
		page,
		shouldSearch,
		searchPhrase,
		sortDirection,
		selectedCategory,
		selectedSubcategory,
		selectedRipeningPeriod,
		selectedGrowingRegion,
	]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	const toggleSortDirection = () => {
		const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		setSortDirection(newSortDirection);
	};

	return (
		<div className={`${className} ${styles.main}`}>
			<div className={styles.sidebar}>
				<div className={styles.selectContainer}>
					<Select
						value={selectedCategory}
						onChange={setSelectedCategory}
						options={categories}
						defaultOption="Все категории"
					/>
					<Select
						value={selectedSubcategory}
						onChange={setSelectedSubcategory}
						options={subcategories}
						defaultOption="Все подкатегории"
					/>
					<Select
						value={selectedRipeningPeriod}
						onChange={setSelectedRipeningPeriod}
						options={ripeningPeriods}
						defaultOption="Срок созревания"
					/>
					<Select
						value={selectedGrowingRegion}
						onChange={setSelectedGrowingRegion}
						options={growingRegions}
						defaultOption="Регион выращивания"
					/>
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.searchContainer}>
					<Search searchPhrase={searchPhrase} onChange={onSearch} />
				</div>
				<button onClick={toggleSortDirection} className={styles.sortButton}>
					Сортировать по цене (
					{sortDirection === 'asc' ? 'возрастанию' : 'убыванию'})
				</button>
				{isLoading ? (
					<Loader />
				) : (
					<>
						{products.length > 0 ? (
							<div className={styles.productList}>
								{products.map(
									({
										id,
										name,
										imageUrl,
										price,
										category,
										subcategory,
									}) => (
										<ProductCard
											key={id}
											id={id}
											name={name}
											imageUrl={imageUrl}
											price={price}
											category={category}
											subcategory={subcategory}
										/>
									),
								)}
							</div>
						) : (
							<div className={styles.noProductsFound}>Семян не найдены</div>
						)}
					</>
				)}
				{lastPage > 1 && products.length > 0 && (
					<Pagination page={page} lastPage={lastPage} setPage={setPage} />
				)}
			</div>
		</div>
	);
};
