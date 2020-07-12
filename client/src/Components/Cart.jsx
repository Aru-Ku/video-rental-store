import React from "react";
import styles from "../Styles/Cart.module.css";
import PremiumIcon from "../Assets/premium.png";
import RegularIcon from "../Assets/regular.png";
import OldIcon from "../Assets/old.png";

const Cart = () => {
	const cartData = {
		1: {},
		2: {},
		3: {},
		4: {},
		5: {},
	};
	const cartItems = Object.keys(cartData).map((id) => {
		return <CartItem id={id} key={id} />;
	});
	return (
		<div className={styles.container}>
			<div className={styles.contain}>
				<div className={styles.cartItemsWrappper}>{cartItems}</div>
			</div>
		</div>
	);
};

const CartItem = ({ id }) => {
	const cartData = {
		1: {
			title: "Bloodshot",
			year: "2020",
		},
		2: {
			title: "BloodshotBloodshotBloodshotBloodshotBloodshotBloodshotBloodshotBloodshotBloodshotBloodshotBloodshotBloodshot",
			year: "2019",
		},
		3: {
			title: "Bloodshot",
			year: "2018",
		},
		4: {
			title: "Bloodshot",
			year: "2009",
		},
		5: {
			title: "Bloodshot",
			year: "1995",
		},
	};
	let [icon, alt] = ["", ""];
	if (+cartData[id].year >= 2019) {
		icon = PremiumIcon;
		alt = "Premium";
	} else if (+cartData[id].year <= 2010) {
		icon = OldIcon;
		alt = "Old";
	} else {
		icon = RegularIcon;
		alt = "Regular";
	}
	return (
		<section className={styles.item}>
			<div>{cartData[id].title}</div>
			<div>{cartData[id].year}</div>
			<div className={styles.itemPrice}>
				<img src={icon} title={alt} alt={alt} />X
			</div>
		</section>
	);
};

export default Cart;
