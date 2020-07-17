import axios from "axios";
import user from "./user";

const getMovieIds = () => {
	return axios.get("/api/movies/available");
};

const getMoviesForCart = (ids) => {
	return axios.post("/api/movies/tocart", { data: ids }, {
		headers: { token: user.userToken() },
	});
};

const getUserPurchasedMovies = () => {
	return axios.get("/api/movies/userpurchased", {
		headers: { token: user.userToken() },
	})
}
const checkExpirationTime = () => {
	return axios.get("/api/movies/checkexpiration")
}

export default {
	getMovieIds,
	getMoviesForCart,
	getUserPurchasedMovies,
	checkExpirationTime
};
