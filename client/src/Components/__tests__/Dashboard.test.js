import React from "react";
import { render, cleanup, waitFor, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Dashboard, { MovieTile } from "../Dashboard";
import Navbar from "../Navbar";
import { ToastProvider } from "react-toast-notifications";

jest.useFakeTimers();
afterEach(cleanup);

const movieData = [
	{
		id: 1,
		title: "Billa",
		year: 2007,
		type: "old",
		imdb: 920457,
		tmdb: 23767,
		image: "g9skD62F7y6VJR5nPZOgpz1ckso",
	},
];

describe("Checking Dashboard", () => {
	jest.spyOn(global, "fetch").mockImplementation(() =>
		Promise.resolve({
			json: () => Promise.resolve(movieData),
		})
	);
	const componentToRender = (
		<ToastProvider>
			<Navbar />
			<Dashboard />
		</ToastProvider>
	);
	it("fetch movie data", async () => {
		await act(async () => {
			const { getByText } = render(componentToRender);
			getByText("Loading...");
		});
		await waitFor(() => {
			expect(setTimeout).toHaveBeenCalledTimes(1);
		});
	});
	it("information model", async () => {
		act(() => {
			render(componentToRender);
		});
		const infoBtn = document.getElementsByClassName("info")[0];
		fireEvent.click(infoBtn);
		const infoContainer = document.getElementsByClassName("infoContainer")[0];
		expect(infoContainer.className).toBe("infoContainer open");
	});
});

describe("Checking MovieTile", () => {
	it("movie tile and cart functionality", () => {
		act(() => {
			render(
				<>
					<Navbar />
					<MovieTile movieDetails={movieData[0]} userCart={[]} />
				</>
			);
		});
		expect(screen.getByText(`${movieData[0].title}`)).toBeInTheDocument();
		expect(screen.getByText(`${movieData[0].year}`)).toBeInTheDocument();
		expect(screen.getByText("IMDB").href).toBe(`https://www.imdb.com/title/tt${movieData[0].imdb}`);
		expect(screen.getByText("TMDB").href).toBe(`https://www.themoviedb.org/movie/${movieData[0].tmdb}`);

		const images = document.getElementsByTagName("img");
		expect(images[0].src).toBe(`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movieData[0].image}.jpg`);
		expect(images[1].src).toBe(`http://localhost/${movieData[0].type}.png`);
	});
});
