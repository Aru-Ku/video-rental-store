import React from "react";
import styles from "../Styles/UiStyles.module.css";

export const Emoji = ({ label, emoji }) => {
	return (
		<span role='img' aria-label={label}>
			{emoji}
		</span>
	);
};

export const Spinner = ({ bgColor }) => {
	return (
		<div>
			<div className={styles.circle1} style={{ backgroundColor: bgColor }}></div>
			<div className={styles.circle2} style={{ backgroundColor: bgColor }}></div>
		</div>
	);
};