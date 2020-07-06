import React from "react";
import styles from "../Styles/LoginWindow.module.css";

export const LoginWindow = ({ show }) => {
	return (
		<div className={!show ? styles.loginWindow : styles.loginWindow + " " + styles.open}>
			{show === "login" && <Login />}
			{show === "signup" && <Signup />}
		</div>
	);
};

const Login = () => {
	const [email, setemail] = React.useState("");
	const [password, setPassword] = React.useState("");
	return (
		<div>
			<div>Login to your account</div>
			<div>New User ? Create account</div>
			<input type='email' placeholder='Email Address' value={email} onChange={(e) => setemail(e.target.value)} />
			<p>Enter valid email 'address@email.com'</p>
			<input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
		</div>
	);
};

const Signup = () => {
	return (
		<div>
			<div>Creater account</div>
			<div>Already have an account ? Login</div>
		</div>
	);
};
