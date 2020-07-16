import jwtDecode from "jwt-decode";
import auth from "./auth";
import axios from "axios";

const userToken = () => auth.getCurrentUser();
const getUserDetails = () => jwtDecode(userToken());
const getUserEmail = () => getUserDetails().email;
const getUserId = () => getUserDetails().id;
const getUserName = () => getUserDetails().name;
const expTime = () => getUserDetails().exp;

const updateCart = (data) => {
	return axios.post(
		"/api/user/updatecart", { data: data }, {
		headers: { token: userToken() },
	}
	);
};

const fetchCart = () => {
	return axios.get("/api/user/fetchcart", {
		headers: { token: userToken() },
	});
};

const makePurchase = (purchaseDetails, bonusPoints) => {
	return axios.post("/api/user/makepurchase", { purchaseDetails, bonusPoints }, {
		headers: { token: userToken() },
	});
}
const getBonusPoints = () => {
	return axios.get("/api/user/getbonuspoints", {
		headers: { token: userToken() },
	});
}

export default {
	userToken,
	getUserDetails,
	getUserEmail,
	getUserId,
	getUserName,
	expTime,
	updateCart,
	fetchCart,
	makePurchase,
	getBonusPoints
};
