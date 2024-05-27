import { useSelector } from 'react-redux';
import { selectUserId, selectUserRole } from '../../redux/selectors';
import { useEffect, useState } from 'react';
import { request } from '../../redux/utils/request';
import { Orders } from './admin-orders';
import { Loader } from '../../components/loader/loader';
import styles from './user.module.css';

export const User = () => {
	const userId = useSelector(selectUserId);
	const userRole = useSelector(selectUserRole);
	const [orders, setOrders] = useState([]);
	const [status, setStatus] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [activeOrder, setActiveOrder] = useState(null);

	useEffect(() => {
		Promise.all([request(`/orders/users/${userId}`), request('/orders/status')])
			.then(([orderRes, statusRes]) => {
				setOrders(orderRes.data);
				setStatus(statusRes.data);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [userId]);

	const toggleOrderDetails = (orderId) => {
		setActiveOrder(activeOrder === orderId ? null : orderId);
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={styles.container}>
			<Orders />
			{orders.length > 0 ? (
				<div>
					<h1 className={styles.title}>Ваши заказы</h1>
					{orders.map((order) => (
						<div key={order.id} className={styles.order}>
							<div
								className={styles.orderHeader}
								onClick={() => toggleOrderDetails(order.id)}
							>
								<span className={styles.orderName}>
									Имя: {order.name}
								</span>
								<span className={styles.orderToggle}>
									{activeOrder === order.id ? '-' : '+'}
								</span>
							</div>
							{activeOrder === order.id && (
								<div className={styles.orderDetails}>
									<div className={styles.infoBlock}>
										<p>
											<span className={styles.label}>Email:</span>
											{order.email}
										</p>
									</div>
									<div className={styles.infoBlock}>
										<p>
											<span className={styles.label}>
												Продукты:
											</span>
										</p>
										<ul className={styles.productList}>
											{order.products.map((product, index) => (
												<li
													key={index}
													className={styles.product}
												>
													<span>{product.productName}</span>,
													Цена: {''}
													<span>{product.productPrice}</span>,
													Количество: {''}
													<span>{product.quantity}</span>
												</li>
											))}
										</ul>
									</div>
									<div className={styles.infoBlock}>
										<p>
											<span className={styles.label}>
												Комментарий:
											</span>
											{order.comment}
										</p>
										<div>
											<span className={styles.label}>Статус:</span>{' '}
											{
												status.find(
													(item) => item.id === order.statusId,
												)?.name
											}
										</div>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			) : (
				userRole !== 0 &&
				userRole !== 1 && <p className={styles.noOrdersText}>Нет заказов</p>
			)}
		</div>
	);
};
