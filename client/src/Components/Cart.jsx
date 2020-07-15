import React, { useState, useEffect } from "react";
import styles from "../Styles/Cart.module.css";
import { PremiumIcon, RegularIcon, OldIcon } from '../Assets'
import { MovieService, UserService } from "../services";
import { DayInput } from "../UI/Input";
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom'

const Cart = () => {
	const [cart, setCart] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0)
	const { addToast } = useToasts();
	const history = useHistory();

	useEffect(() => {
		UserService.fetchCart()
			.then((cartItems) => {
				if (!cartItems.error) {
					let cartList = cartItems.data || [];
					MovieService.getMoviesForCart(cartList)
						.then((res) => {
							let moviesDataForCart = [];
							res.data.forEach(item => {
								moviesDataForCart.push({
									id: item.id, title: item.title, year: item.year,
									type: item.type, amount: 0, days: 0
								})
							})
							setCart(moviesDataForCart)
						})
						.catch(() => addToast("Error Fetching Movies", { appearance: 'error' }));
				}
			})
			.catch(() => addToast("Error Fetching Movies", { appearance: 'error' }));
	}, [addToast]);

	const handlers = {
		updateAmount: (id, d, a) => {
			let cartItemsList = cart;
			let totalAmt = 0;
			cartItemsList.forEach(item => {
				if (item.id === id) {
					item.days = +d;
					item.amount = +a;
				}
				totalAmt += item.amount;
			});
			setTotalAmount(totalAmt)
			setCart(cartItemsList);
		},
		purchase: (e) => {
			if (cart.some(item => item.amount === 0)) {
				addToast("Choose Number of days for each movie", { appearance: 'info', autoDismiss: true })
				return
			}
			e.preventDefault();
			let purchaseDetails = [];
			const currentTime = new Date();
			let bonusPoints = 0;
			cart.forEach(item => {
				item.type === "new" ? bonusPoints += 2 : bonusPoints += 1;
				purchaseDetails.push({ id: item.id, till: new Date(currentTime.getTime() + item.days * 86400000) })
			})
			console.log(purchaseDetails)
			UserService.makePurchase(purchaseDetails, bonusPoints).then((res) => {
				if (res.data.message === "success") {
					addToast("Thankyou for purchasing", { appearance: 'success', autoDismiss: true })
					history.push("/dash")
				} else throw new Error();
			}).catch(() => {
				addToast("Purchase Failed", { appearance: 'error', autoDismiss: true })
			})

		}
	}

	const cartItems = Object.keys(cart).map((id) => {
		return <CartItem key={id} movieDetails={cart[id]} updateAmount={handlers.updateAmount} />;
	});
	return (
		<div className={styles.container}>
			<div className={styles.contain}>
				<div className={styles.topBar}>
					<span>{`Total Amount: € ${totalAmount}`}</span>
					{cart.length !== 0 && <button form="CARTFORM" onClick={handlers.purchase}>Rent</button>}
				</div>
				{cart.length !== 0 ?
					<form id='CARTFORM' className={styles.cartItemsWrappper}>
						{cartItems}
					</form> : "Looks like your cart is empty.."}
			</div>
		</div>
	);
};

const CartItem = ({ movieDetails, updateAmount }) => {
	const { id, title, year, type, amount } = movieDetails;
	const [V, setV] = useState(0)

	let [icon, alt, fee, limit] = ["", "", 30, 0];
	switch (type) {
		case "new": icon = PremiumIcon; alt = "New Movie"; fee = 40; break;
		case "old": icon = OldIcon; alt = "Old Movie"; limit = 5; break;
		default: icon = RegularIcon; alt = "Regular Movie"; limit = 3; break;
	}

	const handler = {
		calAmount: (value) => {
			let amt = (limit === 0 ? fee * value : fee)
				+ ((value - limit > 0 && limit !== 0) ? value - limit : 0) * fee;
			updateAmount(id, value, amt)
			setV(value)
		}
	}

	return (
		<div className={styles.item}>
			<div>{title}</div>
			<div>{year}</div>
			<DayInput
				id={id}
				value={V}
				onchange={e => {
					handler.calAmount(e.target.value)
				}} />
			<img src={icon} title={alt} alt={alt} />
			<div className={styles.price}>
				{amount}
			</div>
		</div>
	);
};

export default Cart;
