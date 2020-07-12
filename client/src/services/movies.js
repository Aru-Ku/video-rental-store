import axios from "axios";

const getMovieIds = () => {
	return axios.get("/api/movies/available");
};
const gtetMovieDetails = (id) => {
	return axios.get(`/api/movies/getdetails/${id}`);
};

export default {
	getMovieIds,
	gtetMovieDetails,
};
