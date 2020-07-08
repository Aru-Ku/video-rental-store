import React from "react";
import styles from "../Styles/Dashboard.module.css";
import { Input } from "../UI/Input";
import PremiumIcon from "../Assets/premium.png";
import RegularIcon from "../Assets/regular.png";
import OldIcon from "../Assets/old.png";

const Dashboard = () => {
	const [searchText, setSearchText] = React.useState("");
	const moviedata = {
		1: {
			title: "Bloodshot",
			year: "2020",
			genres: "Action|Drama|Sci-Fi",
			imdbId: "1634106",
			tmdbId: "338762",
			imageLink: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
		},
		2: {
			title: "Bloodshot Bloodshot Bloodshot Bloodshot Bloodshot Bloodshot ",
			year: "2019",
			genres: "Action|Drama|Sci-Fi",
			imdbId: "1634106",
			tmdbId: "338762",
			imageLink: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
		},
		3: {
			title: "Bloodshot",
			year: "2018",
			genres: "Action|Drama|Sci-Fi",
			imdbId: "1634106",
			tmdbId: "338762",
			imageLink: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
		},
		4: {
			title: "Bloodshot",
			year: "2009",
			genres: "Action|Drama|Sci-Fi",
			imdbId: "1634106",
			tmdbId: "338762",
			imageLink: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
		},
		5: {
			title: "Bloodshot",
			year: "1996",
			genres: "Action|Drama|Sci-Fi",
			imdbId: "1634106",
			tmdbId: "338762",
			imageLink: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
		},
	};
	const renderData = Object.keys(moviedata).map((id) => {
		let [icon, alt] = ["", ""];
		if (+moviedata[id].year >= 2019) {
			icon = PremiumIcon;
			alt = "Premium";
		} else if (+moviedata[id].year <= 2010) {
			icon = OldIcon;
			alt = "Old";
		} else {
			icon = RegularIcon;
			alt = "Regular";
		}
		return (
			<div className={styles.movieData} key={id}>
				<img src={moviedata[id].imageLink} alt={moviedata[id].title} className={styles.thumbnail} />
				<div className={styles.movieContent}>
					<div>{moviedata[id].title}</div>
					<div>{moviedata[id].year}</div>
					<div>{moviedata[id].genres.replace(/\|/g, ", ")}</div>
					<a href={`https://www.imdb.com/title/tt${moviedata[id].imdbId}`} rel='noopener noreferrer' target='_blank'>
						IMDB
					</a>
					<a href={`https://www.themoviedb.org/movie/${moviedata[id].tmdbId}`} rel='noopener noreferrer' target='_blank'>
						TMDB
					</a>
					<button>Add to cart</button>
					<img src={icon} title={alt} alt={alt} />
				</div>
			</div>
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
