import React from 'react';
import styles from '../Styles/Navbar.module.css'
const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    {/* LOGO */}VRS
                </div>
                <div className={styles.cart}>
                    {/* CART */}CART
                </div>
            </div>
        </div>
    )
}

export default Navbar;