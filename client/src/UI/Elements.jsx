import React from "react";
import styles from "../Styles/UiStyles.module.css";

export const Emoji = ({ label, emoji }) => {
	return (
		<span role='img' aria-label={label}>
			{emoji}
		</span>
	);
};

export const Spinner = () => {
	return (
		<div>
			<div className={styles.circle1}></div>
			<div className={styles.circle2}></div>
		</div>
	);
};

export const BackDrop = ({ close }) => {
	return <div onClick={close} className={styles.backdrop}></div>;
};
