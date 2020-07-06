import React from "react";
import styles from "../Styles/Hero.module.css";
import hoem1 from "../Assets/hoem-1.webp";
import hoem2 from "../Assets/hoem-2.webp";
import hoem3 from "../Assets/hoem-3.webp";
import hoem4 from "../Assets/hoem-4.webp";
import Emoji from "../UI/Emoji";
import { LoginWindow } from "./LoginWindow";
import BackDrop from "../UI/BackDrop";
import { SwitchTheme } from "../UI/SwitchTheme";

const Hero = (props) => {
	const [loginWindow, showLoginWindow] = React.useState("");

	const handlers = {
		login: () => {
			showLoginWindow("login");
		},
		signup: () => {
			showLoginWindow("signup");
		},
	};

	return (
		<>
			<section className={styles.container}>
				<div className={styles.wrapper}>
					<div className={styles.content}>
						<div className={styles.head}>Video Rental Store</div>
						<div className={styles.points}>
							<p>
								Search for your favorite <Emoji label='Favorite' emoji='💕' />
								movies.
							</p>
							<p>
								Add them to your cart. <Emoji label='Cart' emoji='🛒' />
							</p>
							<p>
								Checkout & Make payment. <Emoji label='Payment' emoji='💳' />
							</p>
							<p>It's that simple.</p>
						</div>
						<div className={styles.loginConatiner}>
							<button onClick={handlers.login}></button>
							<div>
								New user ? <span onClick={handlers.signup}>SignUp</span>
							</div>
						</div>
					</div>
					<div style={{ position: "absolute", top: 0, right: 0, display: "inline" }}>
						<img className={styles.hoem1} src={hoem1} alt='VRS' />
						<img className={styles.hoem2} src={hoem2} alt='VRS' />
						<img className={styles.hoem3} src={hoem3} alt='VRS' />
						<img className={styles.hoem4} src={hoem4} alt='VRS' />
					</div>
				</div>
			</section>
			<LoginWindow show={loginWindow} />
			{loginWindow && <BackDrop close={() => showLoginWindow("")} />}
			<div className={styles.switchThemeWrapper}>
				<SwitchTheme
					boxStyles={{
						borderColor: "var(--font)",
						borderWidth: "1px 1px 0 0",
						borderStyle: "solid",
						borderRadius: "0 20px 0 0",
					}}
				/>
			</div>
		</>
	);
};

export default Hero;
