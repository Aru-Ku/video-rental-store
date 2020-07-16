import React from "react";
import Hero from "./Components/Hero";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login, Signup } from "./Components/LoginSignup";
import { Navbar, Dashboard, Cart } from "./Components";
import { AuthService } from './services'

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
			{/* <Redirect from='/' to='/dash' /> */}
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
