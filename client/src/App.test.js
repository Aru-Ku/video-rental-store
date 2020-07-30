import React from "react";
import { mount, configure } from "enzyme";
import { MemoryRouter } from "react-router";
import Adapter from "enzyme-adapter-react-16";
import { ToastProvider } from "react-toast-notifications";

configure({ adapter: new Adapter() });

import Dashboard from "./Components/Dashboard";
import Cart from "./Components/Cart";
import Hero from "./Components/Hero.jsx";
import MyRentals from "./Components/MyRentals.jsx";
import { Login, Signup } from "./Components/LoginSignup";
import { PublicRoutes, UserRoutes } from "./App";

describe("Checking Pubic Routes", () => {
	it("Signup route", () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={["/signup"]}>
				<PublicRoutes />
			</MemoryRouter>
		);
		expect(wrapper.find(Signup)).toHaveLength(1);
	});
	it("Login route", () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={["/login"]}>
				<PublicRoutes />
			</MemoryRouter>
		);
		expect(wrapper.find(Login)).toHaveLength(1);
	});
	it("Redirect route", () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={["/rEdireCT"]}>
				<PublicRoutes />
			</MemoryRouter>
		);
		expect(wrapper.find(Hero)).toHaveLength(1);
	});
});

describe("Checking User Routes", () => {
	const UserRoute = (
		<ToastProvider>
			<UserRoutes />
		</ToastProvider>
	);
	it("Dashboard route", () => {
		const wrapper = mount(<MemoryRouter initialEntries={["/dash"]}>{UserRoute}</MemoryRouter>);
		expect(wrapper.find(Dashboard)).toHaveLength(1);
	});
	it("Cart route", () => {
		const wrapper = mount(<MemoryRouter initialEntries={["/cart"]}>{UserRoute}</MemoryRouter>);
		expect(wrapper.find(Cart)).toHaveLength(1);
	});
	it("Rentals route", () => {
		const wrapper = mount(<MemoryRouter initialEntries={["/my-rental"]}>{UserRoute}</MemoryRouter>);
		expect(wrapper.find(MyRentals)).toHaveLength(1);
	});
});
