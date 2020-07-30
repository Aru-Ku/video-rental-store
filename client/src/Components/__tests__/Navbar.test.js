import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import Navbar from "../Navbar";

afterEach(cleanup);

describe("Checking Navbar", () => {
	it("home route", () => {
		render(<Navbar />);
		expect(screen.getByText("VRS")).toBeInTheDocument();
		expect(screen.getByText("CART")).toBeInTheDocument();
		expect(screen.getByText("My Rentals")).toBeInTheDocument();
		expect(screen.getByText("Signout")).toBeInTheDocument();
	});
});
