import styles from './modal-order.module.css';

export const ModalOrder = ({ show, onClose, children }) => {
	if (!show) return null;

	return (
		<div className={styles.modalBackdrop} onClick={onClose}>
			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				<button className={styles.closeButton} onClick={onClose}>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};
