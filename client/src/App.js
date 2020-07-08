import React from "react";
import Hero from "./Components/Hero";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login, Signup } from "./Components/LoginSignup";
import { SwitchTheme } from "./UI/SwitchTheme";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";

const App = () => {
	if (localStorage.getItem("theme") === "dark" || localStorage.getItem("theme") === "") {
		document.body.classList.toggle("dark-theme");
		localStorage.setItem("theme", "dark");
	}
	return (
		<div style={{ background: "var(--main-bg)" }}>
			<Switch>
				{!true && <PublicRoutes />}
				{true && <UserRoutes />}
			</Switch>
			<div className='switchThemeWrapper'>
				<SwitchTheme
					boxStyles={{
						borderColor: "var(--font)",
						borderWidth: "1px 1px 0 0",
						borderStyle: "solid",
						borderRadius: "0 20px 0 0",
					}}
				/>
			</div>
		</div>
	);
};

const UserRoutes = () => (
	<>
		<Navbar />
		<Switch>
			<Route exact path='/' component={Dashboard} />
			<Redirect to='/' />
		</Switch>
	</>
);
const PublicRoutes = () => (
	<Switch>
		<Route exact path='/signup' component={Signup} />
		<Route exact path='/login' component={Login} />
		<Route exact path='/' component={Hero} />
		<Redirect to='/' />
	</Switch>
);

export default App;
