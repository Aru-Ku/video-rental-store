import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";

import { Login, Signup } from "../LoginSignup";

afterEach(cleanup);

describe("Checking Login Page", () => {
	const inputs = document.getElementsByTagName("input");
	const loginBtn = document.getElementsByClassName("button");

	it("invalid email", () => {
		render(<Login />);
		fireEvent.change(inputs[0], { target: { value: "test@test" } });
		expect(screen.getByText("Enter valid Email Address")).toBeInTheDocument();
	});
	it("no email", () => {
		render(<Login />);
		fireEvent.click(loginBtn[0]);
		expect(screen.getByText("Required")).toBeInTheDocument();
	});
	it("no password", () => {
		render(<Login />);
		fireEvent.change(inputs[0], { target: { value: "test@test.com" } });
		fireEvent.click(loginBtn[0]);
		expect(screen.getByText("Required")).toBeInTheDocument();
	});
});

describe("Checking Signup Page", () => {
	const inputs = document.getElementsByTagName("input");
	const loginBtn = document.getElementsByClassName("button");

	it("no name", () => {
		render(<Signup />);
		fireEvent.click(loginBtn[0]);
		expect(screen.getByText("Name cannot be empty")).toBeInTheDocument();
	});
	it("no email", () => {
		render(<Signup />);
		fireEvent.change(inputs[0], { target: { value: "Test Name" } });
		fireEvent.click(loginBtn[0]);
		expect(screen.getByText("Valid Email Required")).toBeInTheDocument();
	});
	it("no password", () => {
		render(<Signup />);
		fireEvent.change(inputs[0], { target: { value: "Test Name" } });
		fireEvent.change(inputs[1], { target: { value: "tests@test.com" } });
		fireEvent.click(loginBtn[0]);
		expect(
			screen.getByText("Must conatin atleast 1 character, 1 number, 1 special character & minimum length of 8")
		).toBeInTheDocument();
	});
	it("password mismatch", () => {
		render(<Signup />);
		fireEvent.change(inputs[0], { target: { value: "Test Name" } });
		fireEvent.change(inputs[1], { target: { value: "tests@test.com" } });
		fireEvent.change(inputs[2], { target: { value: "Password@123" } });
		fireEvent.click(loginBtn[0]);
		expect(screen.getByText("Password do not match")).toBeInTheDocument();
	});
});
