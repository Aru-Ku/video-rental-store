import React from "react";
import { render, cleanup, waitFor, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Cart, { CartItem } from "../Cart";
import Navbar from "../Navbar";
import { ToastProvider } from "react-toast-notifications";

jest.useFakeTimers();
afterEach(cleanup);

let cartData = [
	{
		id: 27,
		title: "Movie Tilte",
		year: 2019,
		type: "new",
		amount: 0,
		days: 0,
	},
];
function updateAmount(id, days, amt) {
	cartData[0].days = days;
	cartData[0].amount = amt;
}

describe("Checking Cart", () => {
	const componentToRender = (
		<ToastProvider>
			<Navbar />
			<Cart />
		</ToastProvider>
	);
	it("fetch user cart data", async () => {
		jest.spyOn(global, "fetch").mockImplementation(() =>
			Promise.resolve({
				json: () => Promise.resolve(cartData),
			})
		);
		await act(async () => {
			const { getByText } = render(componentToRender);
			getByText("Looks like your cart is empty..");
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

describe("Checking Cart Item", () => {
	it("movie rental days and update amount", async () => {
		act(() => {
			render(<CartItem movieDetails={cartData[0]} updateAmount={updateAmount} />);
		});
		expect(screen.getByText(`${cartData[0].title}`)).toBeInTheDocument();
		expect(screen.getByText(`${cartData[0].year}`)).toBeInTheDocument();
		const inputNoOfDays = document.getElementsByClassName("dayInputBox")[0];
		fireEvent.change(inputNoOfDays, { target: { value: 3 } });
		const amount = document.getElementsByClassName("price")[0];
		expect(+amount.innerHTML).toBe(40 * cartData[0].days);
	});
});
