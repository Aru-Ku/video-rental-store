import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login, Signup } from "./Components/LoginSignup";
import AuthService from "./services/auth";

import Dashboard from "./Components/Dashboard";
import Cart from "./Components/Cart";
import Hero from "./Components/Hero.jsx";
import MyRentals from "./Components/MyRentals.jsx";
import Navbar from "./Components/Navbar.jsx";

const App = () => {
	const [user, setUser] = React.useState();

	React.useEffect(() => {
		const token = AuthService.getCurrentUser();
		token && !user && setUser(token);
	}, [user]);

	return <div style={{ background: "var(--main-bg)" }}>{user ? <UserRoutes /> : <PublicRoutes />}</div>;
};

export const UserRoutes = () => (
	<>
		<Navbar />
		<Switch>
			<Route exact path='/dash' component={Dashboard} />
			<Route exact path='/cart' component={Cart} />
			<Route exact path='/my-rental' component={MyRentals} />
			<Redirect to='/dash' />
		</Switch>
	</>
);
export const PublicRoutes = () => (
	<Switch>
		<Route exact path='/signup' component={Signup} />
		<Route exact path='/login' component={Login} />
		<Route exact path='/' component={Hero} />
		<Redirect to='/' />
	</Switch>
);

export default App;
