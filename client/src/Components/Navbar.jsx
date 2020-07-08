import React from "react";
import styles from "../Styles/Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
	const btnRef = React.useRef();
	const menuRef = React.useRef();
	const backdropRef = React.useRef();

	const handlers = {
		toggleMenu() {
			btnRef.current.classList.toggle(styles.animate);
			menuRef.current.classList.toggle(styles.show);
			backdropRef.current.classList.toggle(styles.show);
		},
	};

	return (
		<>
			<div ref={backdropRef} className={styles.backdrop} onClick={handlers.toggleMenu} />
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<div className={styles.logo}>
						<Link to='/' className={styles.link}>
							VRS
						</Link>
					</div>
					<div style={{ flexGrow: 1 }} />
					<div className={styles.cart}>CART</div>
					<div ref={btnRef} className={styles.selector} onClick={handlers.toggleMenu} />
					<div ref={menuRef} className={styles.navs}>
						<div>My Purchases</div>
						<div>Signout</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
