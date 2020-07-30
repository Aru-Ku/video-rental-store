import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import MyRentals, { EachPurchasedItem } from "../MyRentals";
import { ToastProvider } from "react-toast-notifications";

jest.useFakeTimers();
afterEach(cleanup);

let purchasedMovies = [
	{
		id: 27,
		title: "Movie Tilte",
		year: 2019,
		type: "new",
		image: "ji34eBUb3T7n3TamNrEZa0vVH1z",
		purchasedtill: "2020-08-03T04:41:03.831Z",
	},
];
describe("Checking My Rentals Page", () => {
	it("fetch purchased movie data", async () => {
		jest.spyOn(global, "fetch").mockImplementation(() =>
			Promise.resolve({
				json: () => Promise.resolve(purchasedMovies),
			})
		);
		await act(async () => {
			const { getByText } = render(
				<ToastProvider>
					<MyRentals />
				</ToastProvider>
			);
			getByText("You haven't purchased any movies");
		});
		await waitFor(() => {
			expect(setTimeout).toHaveBeenCalledTimes(1);
		});
	});
});

describe("Checking Each Purchased Item", () => {
	it("", () => {
		render(<EachPurchasedItem movieDetails={purchasedMovies[0]} />);
		const contents = document.getElementsByClassName("content")[0].getElementsByTagName("div");
		expect(contents[0].innerHTML).toBe(`${purchasedMovies[0].title}`);
		expect(contents[1].innerHTML).toBe(`${purchasedMovies[0].year}`);
		let validity = new Date(purchasedMovies[0].purchasedtill);
		let validTill =
			`${validity.getDate()}/${validity.getMonth()}/${validity.getFullYear()}` +
			" " +
			`${validity.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}`;
		expect(contents[2].innerHTML).toBe(`${validTill}`);
		const images = document.getElementsByTagName("img");
		expect(images[0].src).toBe(`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${purchasedMovies[0].image}.jpg`);
		expect(images[1].alt).toBe("New Movie");
	});
});
