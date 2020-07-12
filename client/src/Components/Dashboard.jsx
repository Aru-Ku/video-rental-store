import React, { useState, useEffect } from "react";
import styles from "../Styles/Dashboard.module.css";
import { Input } from "../UI/Input";
import PremiumIcon from "../Assets/premium.png";
import RegularIcon from "../Assets/regular.png";
import OldIcon from "../Assets/old.png";
import MoviesService from "../services/movies";

const Dashboard = () => {
	const [searchText, setSearchText] = useState("");
	const [movieData, setMovieData] = useState({});
	useEffect(() => {
		MoviesService.getMovieIds().then((res) => {
			const movies = suffleMovieDetails(res.data);
			const dt = movies.reduce((r, it, i) => {
				r[i] = it;
				return r;
			}, {});
			setMovieData(dt);
		});
	}, []);
	const suffleMovieDetails = (arrayData) => {
		let i = arrayData.length - 1;
		for (; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[arrayData[i], arrayData[j]] = [arrayData[j], arrayData[i]];
		}
		return arrayData;
	};

	const renderData = Object.keys(movieData).map((index) => {
		return <MovileTile movieDetails={movieData[index]} key={index} />;
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

const MovileTile = ({ movieDetails }) => {
	const { id, title, year, genres, imdb, tmdb, imageLink } = movieDetails;
	const [hideCls, setHideCls] = useState("");
	const [noofDays, setNoOfDays] = useState(1);
	let [icon, alt] = ["", ""];
	if (+year >= 2019) {
		icon = PremiumIcon;
		alt = "Premium Movie";
	} else if (+year <= 2010) {
		icon = OldIcon;
		alt = "Old Movie";
	} else {
		icon = RegularIcon;
		alt = "Regular Movie";
	}

	const handler = {
		addItem() {
			const cart = document.getElementsByClassName("cart-icon")[0];
			setHideCls(styles.hide);
			cart.classList.add("addItem");
			var count = cart.attributes["data-cartcount"].value;
			cart.attributes["data-cartcount"].value = +count + 1;
			setTimeout(() => cart.classList.remove("addItem"), 500);
		},
		removeItem() {
			const cart = document.getElementsByClassName("cart-icon")[0];
			cart.classList.add("removeItem");
			var count = cart.attributes["data-cartcount"].value;
			cart.attributes["data-cartcount"].value = +count - 1;
			setTimeout(() => cart.classList.remove("removeItem"), 500);
		},
		increaseValue() {
			setNoOfDays(noofDays + 1);
		},
		decreaseValue() {
			if (noofDays >= 2) {
				setNoOfDays(noofDays - 1);
			} else {
				setHideCls("");
				handler.removeItem();
			}
		},
	};
	return (
		<div className={styles.movieData}>
			<img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${imageLink}.jpg`} alt={title} className={styles.thumbnail} />
			<div className={styles.movieContent + " " + hideCls}>
				<div>{title}</div>
				<div>{year}</div>
				<div>{genres.replace(/\|/g, ", ")}</div>
				<a href={`https://www.imdb.com/title/tt${imdb}`} rel='noopener noreferrer' target='_blank'>
					IMDB
				</a>
				<a href={`https://www.themoviedb.org/movie/${tmdb}`} rel='noopener noreferrer' target='_blank'>
					TMDB
				</a>
				<button className={styles.addToCart} onClick={handler.addItem}>
					Add to cart
				</button>
				<div className={styles.rentDays}>
					Rent for
					<div className={styles.itemcount}>
						<button onClick={handler.decreaseValue}>-</button>
						<button>{noofDays}</button>
						<button onClick={handler.increaseValue}>+</button>
					</div>{" "}
					Days
				</div>
				<img src={icon} title={alt} alt={alt} />
			</div>
		</div>
	);
};
