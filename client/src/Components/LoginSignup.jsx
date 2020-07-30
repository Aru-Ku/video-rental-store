import React from "react";
import styles from "../Styles/LoginSignup.module.css";
import { Input } from "../UI/Input";
import { Spinner } from "../UI/Elements";
import { useHistory } from "react-router-dom";
import auth from "../services/auth";

export const Login = () => {
	const history = useHistory();
	const [email, setemail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [isLoading, setLoading] = React.useState(false);
	const [boxCls, setBoxCls] = React.useState("");
	const [warnEmail, setWarnEmail] = React.useState("");
	const [warnPwd, setWarnPwd] = React.useState("");

	React.useEffect(() => {
		setBoxCls(styles.boxOpen);
		checkEmail(email) ? setWarnEmail("Enter valid Email Address") : setWarnEmail("");
	}, [email]);

	const checkEmail = (email) => email !== "" && !/[\w-]+@([\w-]+\.)+[\w-]+/.test(email);

	const handler = {
		goToSignup: () => {
			setBoxCls(styles.boxClose);
			setTimeout(() => history.replace("/signup"), 900);
		},
		login: async () => {
			setLoading(true);
			setWarnEmail("");
			setWarnPwd("");
			try {
				if (!email) throw new Error("No Email");
				if (checkEmail(email)) throw new Error("Invalid Email");
				if (!password) throw new Error("No Password");
				const res = await auth.login(email.toLowerCase(), password);
				if (res.data.error === "User not found") throw new Error("No User");
				if (res.data.error === "Wrong Password") throw new Error("Wrong Pwd");
				if (res.data.token) {
					localStorage.setItem("token", res.data.token);
					history.go("/dash");
				}
			} catch (error) {
				setLoading(false);
				switch (error.message) {
					case "No Email":
						return setWarnEmail("Required");
					case "No Password":
						return setWarnPwd("Required");
					case "Invalid Email":
						return setWarnEmail("Enter valid Email Address");
					case "No User":
						return setWarnEmail("User not found");
					case "Wrong Pwd":
						return setWarnPwd("Wrong Password");
					default:
						setWarnEmail("Something Happend");
				}
			}
		},
	};

	return (
		<div className={styles.conatiner}>
			<div className={styles.boxLogin + " " + boxCls}>
				<div className={styles.head}>Login to your account</div>
				<div className={styles.link}>
					New User ? <span onClick={handler.goToSignup}>Create new account</span>
				</div>
				<Input warnMsg={warnEmail} type='email' value={email} onchange={(e) => setemail(e.target.value)} label='Email Address' />
				<Input
					warnMsg={warnPwd}
					type='password'
					value={password}
					onchange={(e) => setPassword(e.target.value)}
					label='Password'
				/>
				<button className={styles.button} onClick={handler.login}>
					Login
					<div>{isLoading && <Spinner />}</div>
				</button>
			</div>
		</div>
	);
};

export const Signup = () => {
	const history = useHistory();
	const [email, setEmail] = React.useState("");
	const [name, setName] = React.useState("");
	const [pwd, setPwd] = React.useState("");
	const [confirmPwd, setConfirmPwd] = React.useState("");
	const [isLoading, setLoading] = React.useState(false);
	const [boxCls, setBoxCls] = React.useState("");
	const [warnName, setWarnName] = React.useState(false);
	const [warnEmail, setWarnEmail] = React.useState("");
	const [warnPwd, setWarnPwd] = React.useState("");
	const [warnConfirmPwd, setWarnConfirmpwd] = React.useState(false);

	React.useEffect(() => {
		setBoxCls(styles.boxOpen);
		email !== "" && !/[\w-]+@([\w-]+\.)+[\w-]+/.test(email) ? setWarnEmail("Enter valid Email Address") : setWarnEmail("");
		pwd !== "" && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(pwd) ? setWarnPwd(true) : setWarnPwd(false);
	}, [email, pwd]);

	const handler = {
		goTologin: () => {
			setBoxCls(styles.boxClose);
			setTimeout(() => history.replace("/login"), 900);
		},
		signUp: async () => {
			setLoading(true);
			setWarnName(false);
			try {
				if (name === "") throw new Error("Warn Name");
				if (!email) throw new Error("Valid Email Required");
				if (!pwd) throw new Error("Warn Pwd");
				if (!confirmPwd || confirmPwd !== pwd) throw new Error("Warn Confirm Pwd");
				if (!warnEmail && !warnPwd && !warnName && pwd === confirmPwd) {
					const res = await auth.signup(email.toLowerCase(), pwd, name);
					if (res.data.error === "Email already registered") {
						return setWarnEmail("Email already registered");
					} else {
						localStorage.setItem("token", res.data.token);
						history.go("/dash");
					}
				}
			} catch (error) {
				setLoading(false);
				switch (error.message) {
					case "Warn Name":
						return setWarnName(true);
					case "Valid Email Required":
						return setWarnEmail("Valid Email Required");
					case "Warn Pwd":
						return setWarnPwd(true);
					case "Warn Confirm Pwd":
						return setWarnConfirmpwd(true);
					default:
						setWarnEmail("Something Happend");
				}
			}
		},
	};

	return (
		<div className={styles.conatiner}>
			<div className={styles.boxSignup + " " + boxCls}>
				<div className={styles.head}>Create account</div>
				<div className={styles.link}>
					Already have an account ? <span onClick={handler.goTologin}>Login</span>
				</div>
				<Input
					type='text'
					value={name}
					onchange={(e) => setName(e.target.value)}
					label='Your Name'
					warnMsg={!name && warnName && "Name cannot be empty"}
				/>
				<Input type='email' value={email} onchange={(e) => setEmail(e.target.value)} label='Email Address' warnMsg={warnEmail} />
				<Input
					type='password'
					value={pwd}
					onchange={(e) => setPwd(e.target.value)}
					label='Password'
					warnMsg={warnPwd && "Must conatin atleast 1 character, 1 number, 1 special character & minimum length of 8"}
				/>
				<Input
					type='password'
					value={confirmPwd}
					onchange={(e) => setConfirmPwd(e.target.value)}
					label='Confirm Password'
					warnMsg={(pwd !== confirmPwd || warnConfirmPwd) && "Password do not match"}
				/>
				<button className={styles.button} onClick={handler.signUp}>
					Create Account
					<div>{isLoading && <Spinner />}</div>
				</button>
			</div>
		</div>
	);
};
