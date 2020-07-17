import React, { useState, useEffect } from "react";
import styles from "../Styles/Cart.module.css";
import { PremiumIcon, RegularIcon, OldIcon } from '../Assets'
import MovieService from "../services/movies";
import UserService from "../services/user";
import { DayInput } from "../UI/Input";
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom'

const Cart = () => {
	const [cart, setCart] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0)
	const [userBP, setUserBP] = useState(0)
	const [infoBox, showInfoBox] = useState("")
	const [purchaseBox, showPurchaseBox] = useState("")
	const [isDataLoaded, setDataLoaded] = useState(false)
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
									id: item.id, title: item.title, year: item.year, type: item.type, amount: 0, days: 0
								})
							})
							setCart(moviesDataForCart);
							setTimeout(() => setDataLoaded(true), 1000);
						})
						.catch(() => addToast("Error Fetching Movies", { appearance: 'error' }));
				}
			})
			.catch(() => addToast("Error Fetching Movies", { appearance: 'error' }));
		UserService.getBonusPoints()
			.then(res => {
				if (res.error) throw Error;
				setUserBP(res.data.bonuspoints)
			})
			.catch(() => addToast("Error Fetching BonusPoints", { appearance: 'error' }));
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
			let bonusPoints = userBP;
			cart.forEach(item => {
				item.type === "new" ? bonusPoints += 2 : bonusPoints += 1;
				purchaseDetails.push({ id: item.id, till: new Date(currentTime.getTime() + item.days * 86400000) })
			})
			UserService.makePurchase(purchaseDetails, bonusPoints).then((res) => {
				if (res.data.message === "success") {
					addToast("Thankyou for purchasing", { appearance: 'success', autoDismiss: true })
					history.push("/dash")
				} else throw new Error();
			}).catch(() => {
				addToast("Purchase Failed", { appearance: 'error', autoDismiss: true })
			})
		},
		displayPurchaseModel: (e) => {
			if (!cart.some(item => item.amount === 0)) {
				e.preventDefault();
				showPurchaseBox(styles.open)
				return
			}
		}
	}

	const cartItems = Object.keys(cart).map((id) => {
		return <CartItem key={id} movieDetails={cart[id]} updateAmount={handlers.updateAmount} />;
	});
	return (
		<>
			<div className={styles.container}>
				<div className={styles.contain}>
					<div className={styles.topBar}>
						<span>{`Bonus Points: ${userBP || 0}`}</span>
						{cart.length !== 0 && <div className={styles.info} onClick={() => showInfoBox(styles.open)} />}
						{cart.length !== 0 && <button form="CARTFORM" onClick={(e) => handlers.displayPurchaseModel(e)} >Rent</button>}
					</div>
					{cart.length !== 0 ?
						<form id='CARTFORM' className={styles.cartItemsWrappper}>
							{isDataLoaded ? cartItems : <div style={{ width: '100%', textAlign: 'center' }}>Loading...</div>}
						</form> : <div style={{ textAlign: 'center' }}>Looks like your cart is empty..</div>}
				</div>
			</div>
			{(infoBox || purchaseBox) && <div className={styles.backdrop} onClick={() => { showInfoBox(""); showPurchaseBox("") }} />}
			<Information info={infoBox} />
			<PurchaseModel totalAmount={totalAmount} purchase={handlers.purchase} show={purchaseBox} />
		</>
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

export const Information = ({ info }) => (
	<div className={styles.infoContainer + " " + info}>
		<div className={styles.model}>
			<div className={styles.content}>
				<div>Pricing</div>
				<div>Premium Fee: €40 | Regular Fee: €30</div>
				<ul>
					<li><img src={PremiumIcon} alt="New Movie" /><span>Premium fee times number of days rented.</span></li>
					<li><img src={RegularIcon} alt="Regular Movie" /><span>Regular fee once for the first 3 days plus Regular fee times the number of days over 3.</span></li>
					<li><img src={OldIcon} alt="Old Movie" /><span>Regular fee once for the first 5 days plus Regular fee times the number of days over5.</span></li>
				</ul>
			</div>
			<div className={styles.content}>
				<div>Bonus Points</div>
				<ul>
					<li> ➥ A new release gives 2 points and other films give 1 point per rental (regardless of the time rented).</li>
					<li> ➥ 25 points pays the rental for one day</li>
				</ul>
			</div>
		</div>
	</div>
)

const PurchaseModel = ({ totalAmount, purchase, show }) => {
	const [isChecked, setChecked] = useState(false)
	return (
		<div className={styles.purchaseContainer + " " + show}>
			<div className={styles.purchaseWrapper}>
				<div style={{ textAlign: 'center' }}>Total Amount: €{totalAmount}</div>
				<div>
					<form>
						<input type="checkbox" id="terms" value={isChecked} onClick={() => setChecked(!isChecked)} required />
						<label htmlFor="terms">Agree to rental terms</label>
						<input type="submit" onClick={(e) => {
							if (isChecked) purchase(e)
						}} value="Make Payment" />
					</form>
				</div>
			</div>
		</div>
	)
}