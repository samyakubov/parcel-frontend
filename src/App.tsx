import React from "react"
import AppRoutes from "./AppRoutes"
import {BrowserRouter} from "react-router"
import { HelmetProvider } from "react-helmet-async"


export default function App() {
	return (
		<HelmetProvider>
			<BrowserRouter>
				<AppRoutes/>
			</BrowserRouter>
		</HelmetProvider>
	)
}

