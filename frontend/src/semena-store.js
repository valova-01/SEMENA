import { useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Header, Footer, Modal } from './components';
import {
	Authorization,
	Main,
	Product,
	Registration,
	Users,
	Basket,
	OrderProcessed,
	User,
} from './pages';
import { setUser } from './redux/actions';
import { ERROR } from './constants';
import { selectUserId } from './redux/selectors';
import styles from './semena-store.module.css';

export const SemenaStore = () => {
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<div className={styles.appColumn}>
			<Header userId={String(userId)} />
			<div className={styles.page}>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/product" element={<Product />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/product/:id/edit" element={<Product />} />
					<Route path="/basket" element={<Basket />} />
					<Route path="/basket/:userId" element={<Basket />} />
					<Route path="/order-confirmation" element={<OrderProcessed />} />
					<Route path="/user" element={<User />} />
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			</div>
			<Footer />
			<Modal />
		</div>
	);
};
