import React from "react";
import sun from "../Assets/sun.png";
import moon from "../Assets/moon.png";

export const SwitchTheme = ({ boxStyles }) => {
	const [currtheme, setTheme] = React.useState(localStorage.getItem("theme"));
	const box = {
		width: "60px",
		height: "30px",
		background: "var(--main-bg)",
		border: "1px solid var(--font)",
		borderRadius: "20px",
	};
	const circle = {
		marginTop: "5%",
		marginLeft: "5%",
		width: "40%",
		height: "80%",
		borderRadius: "50%",
		boxShadow: "0 4px 4px rgba(26,53,71,0.25), 0 0 0 1px rgba(26,53,71,0.07)",
		backgroundImage: `url(${currtheme === "light" ? sun : moon})`,
		backgroundPosition: "center",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		WebkitTransition: "all 0.4s cubic-bezier(0.54, 1.6, 0.5, 1)",
		transition: "all 0.4s cubic-bezier(0.54, 1.6, 0.5, 1)",
		cursor: "pointer",
	};
	const dark = {
		marginLeft: "55%",
	};
	return (
		<div style={{ ...box, ...boxStyles }}>
			<div
				style={currtheme === "light" ? circle : { ...circle, ...dark }}
				onClick={() => {
					document.body.classList.toggle("light-theme");
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
