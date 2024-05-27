import { ControlPanel, Logo } from './components';
import styles from './header.module.css';

export const Header = ({ className, userId }) => (
	<header className={`${className} ${styles.container}`}>
		<Logo />
		<div>
			<div>
				<h3 className={styles.h3color}>Главный офис:</h3> ул. Зелёная, 1, г.
				Семеново
			</div>
		</div>
		<div>
			<h3 className={styles.h3color}>Служба поддержки:</h3> 8 (999) 789-564-23
		</div>
		<ControlPanel userId={userId} />
	</header>
);
