import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styles from './logo.module.css';

export const Logo = ({ className }) => (
	<Link className={`${className} ${styles.container}`} to="/">
		<Icon id="fa fa-leaf" size="70px" margin="0 10px 0 0" />
		<div>
			<div className={styles.largeText}>Компас</div>
			<div className={styles.smallText}>Семян</div>
			<div className={styles.small2Text}>Найдите путь к зелёным приключениям!</div>
		</div>
	</Link>
);
