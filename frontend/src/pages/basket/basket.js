import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectBasketProducts,
	selectUserId,
	selectBasketId,
} from '../../redux/selectors';
import {
	loadBasketAsync,
	addToBasketAsync,
	removeBasketAsync,
	clearBasketAsync,
} from '../../redux/actions';
import { Button, Icon } from '../../components';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/loader/loader';
import styles from './basket.module.css';
import { ModalOrder } from './components/modal-order';
import { Order } from '../order/order';

export const Basket = () => {
	const dispatch = useDispatch();
	const basketProduct = useSelector(selectBasketProducts);
	const userId = useSelector(selectUserId);
	const basketId = useSelector(selectBasketId);
	const [totalCost, setTotalCost] = useState(0);
	const [totalItems, setTotalItems] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		let cost = 0;
		let items = 0;
		basketProduct.forEach((item) => {
			cost += item.productPrice * item.quantity;
			items += item.quantity;
		});
		setTotalCost(cost);
		setTotalItems(items);
	}, [dispatch, basketProduct]);

	useEffect(() => {
		if (userId) {
			dispatch(loadBasketAsync(userId))
				.then(() => {
					setIsLoading(false);
				})
				.catch((error) => {
					console.error('Ошибка при загрузке корзины: ', error);
					setIsLoading(false);
				});
		}
	}, [dispatch, userId]);

	const handleRemoveProduct = (productId) => {
		dispatch(removeBasketAsync(basketId, productId));
	};

	const handleUpdateQuantity = (event, productId) => {
		const productToUpdate = basketProduct.find(
			(item) => item.productId === productId,
		);
		if (productToUpdate) {
			const newBasketData = {
				productId: productId,
				quantity: parseInt(event.target.value),
			};
			dispatch(addToBasketAsync(basketId, newBasketData));
		}
	};

	const handleClearBasket = () => {
		dispatch(clearBasketAsync(userId))
			.then(() => {
				dispatch(loadBasketAsync(userId));
			})
			.catch((error) => {
				console.error('Ошибка при очистке корзины: ', error);
			});
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={styles.basketPage}>
			<h1>Корзина</h1>
			{!userId ? (
				<p>
					Для того чтобы продолжить,{' '}
					<span>
						<Link to="/login">Авторизуйтесь</Link>
					</span>{' '}
					или{' '}
					<span>
						<Link to="/register">Зарегистрируйтесь.</Link>
					</span>
				</p>
			) : basketProduct.length === 0 ? (
				<p>Ваша корзина пуста.</p>
			) : (
				<div className={styles.basketContainer}>
					<table className={styles.basketTable}>
						<thead>
							<tr>
								<th>Название</th>
								<th>Цена</th>
								<th>Количество</th>
								{/* <th>Действия</th> */}
							</tr>
						</thead>
						<tbody>
							{basketProduct.map((item) => (
								<tr key={item.productId}>
									<td className={styles.productName}>
										{item.productName}
									</td>
									<td>{item.productPrice} ₽</td>
									<td className={styles.productQuantity}>
										<input
											type="number"
											min="1"
											value={item.quantity}
											onChange={(e) =>
												handleUpdateQuantity(e, item.productId)
											}
											className={styles.quantityInput}
										/>
										<Icon
											id="fa-trash-o"
											size="21px"
											margin="0 0 0 7px"
											onClick={() =>
												handleRemoveProduct(item.productId)
											}
											className={styles.removeIcon}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className={styles.summaryContainer}>
						<div className={styles.total}>
							<div>Количество товаров: {totalItems}</div>
							<div>Стоимость: {totalCost} ₽</div>
						</div>
						<Button
							className={styles.checkoutButton}
							onClick={() => setIsModalOpen(true)}
						>
							Перейти к оформлению заказа
						</Button>
					</div>
				</div>
			)}
			{basketProduct.length > 0 && (
				<button className={styles.clearButton} onClick={handleClearBasket}>
					Очистить корзину
				</button>
			)}
			<ModalOrder show={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<Order />
			</ModalOrder>
		</div>
	);
};
