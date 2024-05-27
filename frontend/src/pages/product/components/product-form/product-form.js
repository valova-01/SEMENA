import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { saveProductAsync } from '../../../../redux/actions';
import { sanizeContent } from './utils';
import styles from './product-form.module.css';
import { PROP_TYPE } from '../../../../constants';
import * as yup from 'yup';

const productSchema = yup.object().shape({
	imageUrl: yup.string().required('Поле обязательно'),
	name: yup.string().required('Поле обязательно'),
	category: yup.string().required('Поле  обязательно'),
	price: yup.number().required('Поле обязательно').typeError('Поле должно быть числом'),
	subcategory: yup.string().required('Поле обязательно'),
	ripeningPeriod: yup.string().required('Поле обязательно'),
	growingRegion: yup.string().required('Поле обязательно'),
	expirationDate: yup
		.date()
		.required('Поле обязательно')
		.typeError('Поле должно быть датой'),
});

export const ProductForm = ({
	className,
	product: {
		id,
		name,
		imageUrl,
		subcategory,
		category,
		price,
		description,
		publishedAt,
		ripeningPeriod,
		growingRegion,
		expirationDate,
	},
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [nameValue, setNameValue] = useState(name);
	const descriptionRef = useRef(null);
	const [categoryValue, setCategoryValue] = useState(category);
	const [priceValue, setPriceValue] = useState(price);
	const [subcategoryValue, setSubcategoryValue] = useState(subcategory);
	const [ripeningPeriodValue, setRipeningPeriodValue] = useState(ripeningPeriod);
	const [growingRegionValue, setGrowingRegionValue] = useState(growingRegion);
	const [expirationDateValue, setExpirationDateValue] = useState(expirationDate);
	const [errors, setErrors] = useState({});

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setNameValue(name);
		setSubcategoryValue(subcategory);
		setCategoryValue(category);
		setPriceValue(price);
		setRipeningPeriodValue(ripeningPeriod);
		setGrowingRegionValue(growingRegion);
		setExpirationDateValue(expirationDate);
	}, [
		imageUrl,
		name,
		subcategory,
		category,
		price,
		ripeningPeriod,
		growingRegion,
		expirationDate,
	]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const onSave = () => {
	// 	const newDescription = sanizeContent(descriptionRef.current.innerHTML);

	// 	dispatch(
	// 		saveProductAsync(id, {
	// 			imageUrl: imageUrlValue,
	// 			name: nameValue,
	// 			category: categoryValue,
	// 			price: priceValue,
	// 			subcategory: subcategoryValue,
	// 			description: newDescription,
	// 			ripeningPeriod: ripeningPeriodValue,
	// 			growingRegion: growingRegionValue,
	// 			expirationDate: expirationDateValue,
	// 		}),
	// 	).then(({ id }) => navigate(`/product/${id}`));
	// };

	const onSave = async () => {
		const newDescription = sanizeContent(descriptionRef.current.innerHTML);

		const productData = {
			imageUrl: imageUrlValue,
			name: nameValue,
			category: categoryValue,
			price: priceValue,
			subcategory: subcategoryValue,
			description: newDescription,
			ripeningPeriod: ripeningPeriodValue,
			growingRegion: growingRegionValue,
			expirationDate: expirationDateValue,
		};

		try {
			await productSchema.validate(productData, { abortEarly: false });
			setErrors({});
			dispatch(saveProductAsync(id, productData)).then(({ id }) =>
				navigate(`/product/${id}`),
			);
		} catch (validationErrors) {
			const formattedErrors = validationErrors.inner.reduce((acc, error) => {
				acc[error.path] = error.message;
				return acc;
			}, {});
			setErrors(formattedErrors);
		}
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onNameChange = ({ target }) => setNameValue(target.value);
	const onSubcategoryChange = ({ target }) => setSubcategoryValue(target.value);
	const onCategoryChange = ({ target }) => setCategoryValue(target.value);
	const onPriceChange = ({ target }) => setPriceValue(target.value);
	const onRipeningPeriodChange = ({ target }) => setRipeningPeriodValue(target.value);
	const onGrowingRegionChange = ({ target }) => setGrowingRegionValue(target.value);
	const onExpirationDateChange = ({ target }) => setExpirationDateValue(target.value);

	return (
		<div className={`${className} ${styles.productFormContainer}`}>
			<h1>Создание нового продукта</h1>
			<div>
				<label className={styles.formGroup}>Картинка:</label>
				<Input value={imageUrlValue} onChange={onImageChange} />
				{errors.imageUrl && <div className={styles.error}>{errors.imageUrl}</div>}
			</div>
			<div>
				<label className={styles.formGroup}>Название:</label>
				<Input value={nameValue} onChange={onNameChange} />
				{errors.name && <div className={styles.error}>{errors.name}</div>}
			</div>
			<div className={styles.categoryDiv}>
				<label className={styles.formGroup1}>Категория:</label>
				<Input value={categoryValue} onChange={onCategoryChange} />
				{errors.category && <div className={styles.error}>{errors.category}</div>}
				<label className={styles.formGroup1}>Подкатегория:</label>
				<Input value={subcategoryValue} onChange={onSubcategoryChange} />
				{errors.subcategory && (
					<div className={styles.error}>{errors.subcategory}</div>
				)}
			</div>
			<div>
				<label className={styles.formGroup}>Регион выращивания:</label>
				<Input value={growingRegionValue} onChange={onGrowingRegionChange} />
				{errors.growingRegion && (
					<div className={styles.error}>{errors.growingRegion}</div>
				)}
			</div>
			<div className={styles.categoryDiv}>
				<label className={styles.formGroup2}>Время созревания:</label>
				<Input value={ripeningPeriodValue} onChange={onRipeningPeriodChange} />
				{errors.ripeningPeriod && (
					<div className={styles.error}>{errors.ripeningPeriod}</div>
				)}
				<label className={styles.formGroup2}>Срок годности:</label>
				<Input
					type="date"
					value={expirationDateValue}
					onChange={onExpirationDateChange}
				/>
				{errors.expirationDate && (
					<div className={styles.error}>{errors.expirationDate}</div>
				)}
			</div>
			<div>
				<label className={styles.formGroup}>Цена</label>
				<Input value={priceValue} onChange={onPriceChange} />
				{errors.price && <div className={styles.error}>{errors.price}</div>}
			</div>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={
					<Icon
						className={styles.iconForm}
						id="fa-floppy-o"
						size="21px"
						margin="0 10px 0 0"
						onClick={onSave}
					/>
				}
			/>
			<h2>Описание:</h2>
			<div
				ref={descriptionRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className={styles.productText}
			>
				{description}
			</div>
		</div>
	);
};

ProductForm.propTypes = {
	product: PROP_TYPE.PRODUCT.isRequired,
};
