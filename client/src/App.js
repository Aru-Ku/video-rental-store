import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Navbar, Dashboard, Cart, Login, Signup, MyRentals, Hero } from "./Components";
import AuthService from './services/auth'

const App = () => {
	const [user, setUser] = React.useState();

	React.useEffect(() => {
		const token = AuthService.getCurrentUser();
		token && !user && setUser(token);
	}, [user]);

	return (
		<div style={{ background: "var(--main-bg)" }}>
			{user ? <UserRoutes /> : <PublicRoutes />}
		</div>
	);
};

const UserRoutes = () => (
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
const PublicRoutes = () => (
	<Switch>
		<Route exact path='/signup' component={Signup} />
		<Route exact path='/login' component={Login} />
		<Route exact path='/' component={Hero} />
		<Redirect to='/' />
	</Switch>
);

export default App;
