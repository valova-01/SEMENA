import styles from './select.module.css';

export const Select = ({ value, onChange, options, defaultOption }) => (
	<select
		className={styles.selectContainer}
		value={value}
		onChange={(e) => onChange(e.target.value)}
	>
		<option value="">{defaultOption}</option>
		{options.map((option, index) => (
			<option key={index} value={option}>
				{option}
			</option>
		))}
	</select>
);
