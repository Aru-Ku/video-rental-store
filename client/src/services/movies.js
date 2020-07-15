import axios from "axios";
import user from "./user";

const getMovieIds = () => {
	return axios.get("/api/movies/available");
};

const getMoviesForCart = (ids) => {
	return axios.post(
		"/api/movies/tocart",
		{ data: ids },
		{
			headers: { token: user.userToken() },
		}
	);
};

export default {
	getMovieIds,
	getMoviesForCart,
};
