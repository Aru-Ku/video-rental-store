import React from "react";
import Hero from "./Components/Hero";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login, Signup } from "./Components/LoginSignup";
import { SwitchTheme } from "./UI/SwitchTheme";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import Cart from "./Components/Cart";
import auth from "./services/auth";

const App = () => {
	const [user, setUser] = React.useState();

	React.useEffect(() => {
		(localStorage.getItem("theme") === "dark" || !localStorage.getItem("theme")) && document.body.classList.add("dark-theme");
		localStorage.getItem("theme") === "light" && document.body.classList.remove("dark-theme");
		const token = auth.getCurrentUser();
		token && !user && setUser(token);
	}, [user]);

	return (
		<div style={{ background: "var(--main-bg)" }}>
			{user ? <UserRoutes /> : <PublicRoutes />}
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
			<Route exact path='/cart' component={Cart} />
			<Route exact path='/dash' component={Dashboard} />
			<Redirect from='/' to='/dash' />
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
