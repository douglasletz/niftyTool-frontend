import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import { createStore } from "redux"
import reducer from "./redux/reducer"
import { Provider } from "react-redux"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

const store = createStore(reducer)

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				<Route path={`/ethereum/:address`}>
					<App />
				</Route>
				<Route path="/">
					<h1>Please input Token Address you want to see.</h1>
				</Route>
			</Switch>
		</Router>
	</Provider>,
	document.getElementById("root")
)
