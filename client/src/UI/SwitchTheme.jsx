import React from "react";
import styles from "../Styles/UiStyles.module.css";

export const SwitchTheme = ({ boxStyles }) => {
	const [currtheme, setTheme] = React.useState(localStorage.getItem("theme"));
	const [icon, setIcon] = React.useState("");

	React.useEffect(() => {
		if (currtheme === "light") {
			setIcon(styles.StCircle + " " + styles.StCircleSun);
		} else {
			setIcon(styles.StCircle + " " + styles.StCircleMoon);
		}
	}, [currtheme]);

	return (
		<div className={styles.StBox} style={boxStyles}>
			<div
				className={icon}
				onClick={() => {
					document.body.classList.toggle("dark-theme");
					if (currtheme === "light") {
						localStorage.setItem("theme", "dark");
						setTheme("dark");
					} else {
						localStorage.setItem("theme", "light");
						setTheme("light");
					}
				}}></div>
		</div>
	);
};
