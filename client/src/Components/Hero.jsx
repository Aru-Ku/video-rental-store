import React from "react";
import styles from "../Styles/Hero.module.css";
import hoem1 from "../Assets/hoem-1.webp";
import hoem2 from "../Assets/hoem-2.webp";
import hoem3 from "../Assets/hoem-3.webp";
import hoem4 from "../Assets/hoem-4.webp";
import { Emoji } from "../UI/Elements";
import { useHistory } from "react-router-dom";

const Hero = (props) => {
	const history = useHistory();
	const handlers = {
		login: () => history.replace("/login"),
		signup: () => history.replace("/signup"),
	};

	return (
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
					<div className={styles.loginButton}>
						<button onClick={handlers.login}></button>
						<div>
							New user ? <span onClick={handlers.signup}>SignUp</span>
						</div>
					</div>
				</div>
				<div className={styles.hoem}>
					<img className={styles.hoem1} src={hoem1} alt='VRS' />
					<img className={styles.hoem2} src={hoem2} alt='VRS' />
					<img className={styles.hoem3} src={hoem3} alt='VRS' />
					<img className={styles.hoem4} src={hoem4} alt='VRS' />
				</div>
			</div>
		</section>
	);
};

export default Hero;
