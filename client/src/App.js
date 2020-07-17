import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login, Signup } from "./Components";
import AuthService from './services/auth';
import loadable from '@loadable/component'

const AsyncDashboard = loadable(() => import('./Components/Dashboard'));
const AsyncCart = loadable(() => import('./Components/Cart'));
const AsyncNavbar = loadable(() => import('./Components/Navbar'));
const AsyncMyRentals = loadable(() => import('./Components/MyRentals'));
const AsyncHero = loadable(() => import('./Components/Hero'));

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
		<AsyncNavbar />
		<Switch>
			<Route exact path='/dash' component={AsyncDashboard} />
			<Route exact path='/cart' component={AsyncCart} />
			<Route exact path='/my-rental' component={AsyncMyRentals} />
			<Redirect to='/dash' />
		</Switch>
	</>
);
const PublicRoutes = () => (
	<Switch>
		<Route exact path='/signup' component={Signup} />
		<Route exact path='/login' component={Login} />
		<Route exact path='/' component={AsyncHero} />
		<Redirect to='/' />
	</Switch>
);

export default App;
