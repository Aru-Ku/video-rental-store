import React from "react";
import styles from "../Styles/Navbar.module.css";
import { useHistory } from "react-router-dom";

const Navbar = () => {
	const btnRef = React.useRef();
	const menuRef = React.useRef();
	const backdropRef = React.useRef();
	const history = useHistory();

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
						<div to='/' className={styles.link} onClick={() => history.push("/")}>
							VRS
						</div>
					</div>
					<div style={{ flexGrow: 1 }} />
					<div className={styles.cart}>
						<div to='/cart' className='cart-icon' data-cartcount='0' onClick={() => history.push("/cart")}>
							CART <span />
						</div>
					</div>
					<div ref={btnRef} className={styles.selector} onClick={handlers.toggleMenu} />
					<div ref={menuRef} className={styles.navs}>
						<div onClick={() => history.go("/rentals")}>My Rentals</div>
						<div
							onClick={() => {
								localStorage.removeItem("token");
								history.go("/");
							}}>
							Signout
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
