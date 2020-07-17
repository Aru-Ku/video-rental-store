import React, { useState } from "react";
import styles from "../Styles/Hero.module.css";
import { Emoji } from "../UI/Elements";
import { useHistory } from "react-router-dom";

const Hero = () => {
	const history = useHistory();
	const [hidecls, setHideCls] = useState("")
	const handlers = {
		login: () => {
			setHideCls(styles.hide);
			setTimeout(() => history.push("/login"), 1000);
		},
		signup: () => {
			setHideCls(styles.hide);
			setTimeout(() => history.push("/signup"), 1000)
		}
	};

	return (
		<section className={styles.container + " " + hidecls}>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<div className={styles.head + ' ' + hidecls}>Video Rental Store</div>
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
					<div className={styles.loginButton}>
						<button onClick={handlers.login} aria-label="Login Button" />
						<div>
							New user ? <span onClick={handlers.signup}>SignUp</span>
						</div>
					</div>
				</div>
				<div className={styles.banner} />
			</div>
		</section>
	);
};

export default Hero;
