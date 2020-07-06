import React from "react";
import Hero from "./Components/Hero";

const App = () => {
	React.useEffect(() => {
		const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: light)");
		if (prefersDarkScheme.matches) {
			document.body.classList.add("light-theme");
			localStorage.setItem("theme", "light");
		} else {
			document.body.classList.remove("light-theme");
			localStorage.setItem("theme", "dark");
		}
	});
	return (
		<div className='App'>
			{/* <Navbar /> */}
			<Hero />
		</div>
	);
};

export default App;
