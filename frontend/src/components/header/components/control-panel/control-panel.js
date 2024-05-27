import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { ROLE } from '../../../../constants';
import {
	selectBasket,
	selectUserLogin,
	selectUserRole,
} from '../../../../redux/selectors';
import { logout } from '../../../../redux/actions';
import { checkAccess } from '../../../../redux/utils';
import PropTypes from 'prop-types';
import styles from './control-panel.module.css';

export const ControlPanel = ({ className, userId }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const countProduct = useSelector(selectBasket);
	const [cartItemCount, setCartItemCount] = useState(0);

	useEffect(() => {
		setCartItemCount(countProduct.products.length);
	}, [countProduct]);

	useEffect(() => {
		if (roleId === ROLE.GUEST) {
			setCartItemCount(0);
		}
	}, [roleId]);

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
		navigate('/');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<div className={styles.rightAligned}>
				{roleId === ROLE.GUEST ? (
					<Link to="/login">
						<Icon id="fa-sign-in" margin="0 5px 0 0" />
					</Link>
				) : (
					<>
						<Link to={`/user`}>
							<div className={styles.user}>{login}</div>
						</Link>
						<Icon id="fa-sign-out" margin="0 0 0 10px" onClick={onLogout} />
					</>
				)}
			</div>
			<div className={styles.rightAligned}>
				<Icon id="fa-backward" margin="10px 0 0 0" onClick={() => navigate(-1)} />
				<Link to={`/basket/${userId}`}>
					<div>
						<Icon id="fa-shopping-basket" margin="10px 0 0 10px" />
						{cartItemCount > 0 && (
							<span className={styles.cartItemCount}>{cartItemCount}</span>
						)}
					</div>
				</Link>
				{isAdmin && (
					<>
						<Link to="/product">
							<Icon id="fa-file-text-o" margin="10px 0 0 16px" />
						</Link>
						<Link to="/users">
							<Icon id="fa-users" margin="10px 0 0 16px" />
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

ControlPanel.propTypes = {
	userId: PropTypes.string.isRequired,
};
