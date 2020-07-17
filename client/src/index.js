import React from "react";
import loadable from '@loadable/component'
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';
const App = loadable(() => import('./App'))


ReactDOM.render(
	<ToastProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ToastProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
