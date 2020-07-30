import React, { useState, useEffect } from "react";
import styles from "../Styles/MyRentals.module.css";
import MovieService from "../services/movies";
import { PremiumIcon, RegularIcon, OldIcon } from "../Assets";
import { useToasts } from "react-toast-notifications";

const MyRentals = () => {
	const [purchasedItems, setPurchasedItems] = useState([]);
	const [isDataLoaded, setDataLoaded] = useState(false);
	const { addToast } = useToasts();

	useEffect(() => {
		MovieService.getUserPurchasedMovies()
			.then((res) => {
				if (!res.data.error) setPurchasedItems(res.data);
				setTimeout(() => setDataLoaded(true), 500);
			})
			.catch(() => addToast("Error Fetching Movies", { appearance: "error" }));
	}, [addToast]);

	const eachPurchasedItem = Object.keys(purchasedItems).map((id) => {
		return <EachPurchasedItem key={id} movieDetails={purchasedItems[id]} />;
	});

	return (
		<div className={styles.container}>
			<div className={styles.contain}>
				{isDataLoaded ? (
					purchasedItems.length !== 0 ? (
						<div className={styles.purchasedItemsWrapper}>{eachPurchasedItem}</div>
					) : (
						<div style={{ textAlign: "center" }}>You haven't purchased any movies</div>
					)
				) : (
					<div style={{ width: "100%", textAlign: "center" }}>Loading...</div>
				)}
			</div>
		</div>
	);
};
export const EachPurchasedItem = ({ movieDetails }) => {
	const { title, year, type, image, purchasedtill } = movieDetails;
	let validity = new Date(purchasedtill);
	let validTill =
		`${validity.getDate()}/${validity.getMonth()}/${validity.getFullYear()}` +
		" " +
		`${validity.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}`;

	let [icon, alt] = ["", ""];
	switch (type) {
		case "new":
			icon = PremiumIcon;
			alt = "New Movie";
			break;
		case "old":
			icon = OldIcon;
			alt = "Old Movie";
			break;
		default:
			icon = RegularIcon;
			alt = "Regular Movie";
			break;
	}

	return (
		<div className={styles.item}>
			<img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${image}.jpg`} alt={title} style={{ width: 90 }} />
			<div className={styles.content}>
				<div>{title}</div>
				<div>{year}</div>
				<div>{validTill}</div>
				<img src={icon} title={alt} alt={alt} />
			</div>
		</div>
	);
};
export default MyRentals;
