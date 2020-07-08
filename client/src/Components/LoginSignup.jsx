import React from "react";
import styles from "../Styles/LoginSignup.module.css";
import { Input } from "../UI/Input";
import { Spinner } from "../UI/Elements";
import { useHistory } from "react-router-dom";

export const Login = () => {
	const history = useHistory();
	const [email, setemail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [btnClick, setBtnClick] = React.useState(false);
	const [boxCls, setBoxCls] = React.useState("");

	React.useEffect(() => {
		setBoxCls(styles.boxOpen);
	}, []);

	const handlers = {
		goToSignup: () => {
			setBoxCls(styles.boxClose);
			setTimeout(() => history.push("/signup"), 900);
		},
	};

	return (
		<div className={styles.conatiner}>
			<div className={styles.box + " " + boxCls}>
				<div className={styles.head}>Login to your account</div>
				<div className={styles.link}>
					New User ? <span onClick={handlers.goToSignup}>Create new account</span>
				</div>
				<Input type='email' value={email} onchange={(e) => setemail(e.target.value)} label='Email Address' />
				<Input type='password' value={password} onchange={(e) => setPassword(e.target.value)} label='Password' />
				<button className={styles.button} onClick={() => setBtnClick(!btnClick)}>
					Login
					<div>{btnClick && <Spinner />}</div>
				</button>
			</div>
		</div>
	);
};

export const Signup = ({ change }) => {
	const history = useHistory();
	const [email, setEmail] = React.useState("");
	const [name, setName] = React.useState("");
	const [pwd, setPwd] = React.useState("");
	const [confirmPwd, setConfirmPwd] = React.useState("");
	const [btnClick, setBtnClick] = React.useState(false);
	const [boxCls, setBoxCls] = React.useState("");

	React.useEffect(() => {
		setBoxCls(styles.box + " " + styles.boxOpen);
	}, []);

	const handlers = {
		goTologin: () => {
			setBoxCls(styles.box + " " + styles.boxClose);
			setTimeout(() => history.push("/login"), 900);
		},
	};

	return (
		<div className={styles.conatiner}>
			<div className={boxCls}>
				<div className={styles.head}>Create account</div>
				<div className={styles.link}>
					Already have an account ? <span onClick={handlers.goTologin}>Login</span>
				</div>
				<Input type='text' value={name} onchange={(e) => setName(e.target.value)} label='Your Name' />
				<Input type='email' value={email} onchange={(e) => setEmail(e.target.value)} label='Email Address' />
				<Input type='password' value={pwd} onchange={(e) => setPwd(e.target.value)} label='Password' />
				<Input type='password' value={confirmPwd} onchange={(e) => setConfirmPwd(e.target.value)} label='Confirm Password' />
				<button className={styles.button} onClick={() => setBtnClick(!btnClick)}>
					Create Account
					<div>{btnClick && <Spinner />}</div>
				</button>
			</div>
		</div>
	);
};
