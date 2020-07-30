import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Hero from "../Hero";

afterEach(cleanup);

describe("Checking Hero Component Content", () => {
	it("should contain title and guidelines", () => {
		const { getByText } = render(<Hero />);
		getByText("Video Rental Store");
		getByText("Search for your favorite movies.");
		getByText("Add them to your cart.");
		getByText("Checkout & Make payment.");
		getByText("It's that simple.");
	});
	it("check login", () => {
		const { container } = render(
			<MemoryRouter>
				<Hero />
			</MemoryRouter>
		);
		const loginBtn = container.querySelector("button");
		expect(loginBtn).not.toBe(null);
		expect(screen.getByText("SignUp")).not.toBe(null);
	});
});
