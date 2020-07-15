import React, { useState, useEffect } from "react";
import styles from "../Styles/Dashboard.module.css";
import { Input } from "../UI/Input";
import { MovieService, UserService } from "../services";
import { PremiumIcon, RegularIcon, OldIcon } from '../Assets'
import { useToasts } from 'react-toast-notifications'

const Dashboard = () => {
	const [searchText, setSearchText] = useState("");
	const [movieData, setMovieData] = useState({});
	const [cart, setCart] = useState([]);
	const { addToast } = useToasts();
	const suffleMovieDetails = (arrayData) => {
		let i = arrayData.length - 1;
		for (; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[arrayData[i], arrayData[j]] = [arrayData[j], arrayData[i]];
		}
		return arrayData;
	};

	useEffect(() => {
		MovieService.getMovieIds().then((res) => {
			const movies = suffleMovieDetails(res.data);
			setMovieData(movies);
		}).catch((e) => addToast("Error Fetching Movies", { appearance: 'error' }));
		UserService.fetchCart().then(cartItems => {
			if (!cartItems.error) setCart(cartItems.data || []);
		}).catch((e) => addToast("Error Fetching Cart Items", { appearance: 'error' }));
	}, [addToast]);

	const handlers = {
		add: (id) => {
			var cartData = cart;
			cartData.push(id);
			handlers.sendToCart(cartData);
			setCart(cartData);
		},
		remove: (id) => {
			let cartData = cart.filter((ids) => ids !== id);
			handlers.sendToCart(cartData);
			setCart(cartData);
		},
		sendToCart: (data) => {
			UserService.updateCart(data).then((data) => data).catch((e) => e);
		},
	};

	const renderData = Object.keys(movieData).map((index) => {
		return (
			<MovieTile
				movieDetails={movieData[index]}
				key={index}
				updateCart={handlers.sendToCart}
				userCart={cart}
				add={handlers.add}
				remove={handlers.remove}
			/>
		);
	});
	return (
		<div className={styles.container}>
			<div className={styles.dashboard}>
				<div className={styles.searchBox}>
					<Input
						placeholder='Search movies'
						value={searchText}
						onchange={(e) => setSearchText(e.target.value)}
						inputClass={styles.searchBoxInput}
						spanClass={styles.searchBoxSpan}
					/>
				</div>
				<div className={styles.moviesWrapper}>
					<div className={styles.movieFlex}>
						{renderData}
						<div />
						<div />
						<div />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

const MovieTile = ({ movieDetails, add, remove, userCart }) => {
	const { id, title, year, type, imdb, tmdb, image } = movieDetails;
	const [isInCart, setInCart] = useState(false);
	const cart = document.getElementsByClassName("cart-icon")[0];
	const removeBtnStyle = { color: "white", background: "red" };

	useEffect(() => {
		if (userCart.includes(id)) setInCart(true);
		cart.attributes["data-cartcount"].value = userCart.length;
	}, [userCart, id, cart]);

	let [icon, alt] = ["", ""];
	switch (type) {
		case "new": icon = PremiumIcon; alt = "New Movie"; break;
		case "old": icon = OldIcon; alt = "Old Movie"; break;
		default: icon = RegularIcon; alt = "Regular Movie"; break;
	}

	const handler = {
		addItem() {
			add(id);
			cart.classList.add("addItem");
			var count = cart.attributes["data-cartcount"].value;
			cart.attributes["data-cartcount"].value = +count + 1;
			setTimeout(() => cart.classList.remove("addItem"), 500);
			setInCart(true);
		},
		removeItem() {
			remove(id);
			cart.classList.add("removeItem");
			var count = cart.attributes["data-cartcount"].value;
			cart.attributes["data-cartcount"].value = +count - 1;
			setTimeout(() => cart.classList.remove("removeItem"), 500);
			setInCart(false);
		},
	};
	return (
		<div className={styles.movieData}>
			<img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${image}.jpg`} alt={title} className={styles.thumbnail} />
			<div className={styles.movieContent}>
				<div>{title}</div>
				<div>{year}</div>
				<a href={`https://www.imdb.com/title/tt${imdb}`} rel='noopener noreferrer' target='_blank'>
					IMDB
				</a>
				<a href={`https://www.themoviedb.org/movie/${tmdb}`} rel='noopener noreferrer' target='_blank'>
					TMDB
				</a>
				<button
					style={!isInCart ? null : { ...removeBtnStyle }}
					className={styles.addToCart}
					onClick={!isInCart ? handler.addItem : handler.removeItem}>
					{!isInCart ? "Add to cart" : "Remove"}
				</button>
				<img onClick={handler.removeItem} src={icon} title={alt} alt={alt} />
			</div>
		</div>
	);
};
