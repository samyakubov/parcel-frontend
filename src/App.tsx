import React from "react"
import AppRoutes from "./AppRoutes"
import {BrowserRouter} from "react-router"
import ApiClientProvider from "./Contexts/ApiClientContext"
import SearchContextProvider from "./Contexts/SearchContext"
import MapContextProvider from "./Contexts/MapContext"
import { HelmetProvider } from "react-helmet-async"
import {ModalManagerContextProvider} from "./Contexts/ModalManagerContext"
import AnalyticsContextProvider from "./Contexts/AnalyticsContext"


export default function App() {
	return (
		<HelmetProvider>
			<ApiClientProvider>
				<SearchContextProvider>
					<AnalyticsContextProvider>
						<ModalManagerContextProvider>
							<MapContextProvider>
								<BrowserRouter>
									<AppRoutes/>
								</BrowserRouter>
							</MapContextProvider>
						</ModalManagerContextProvider>
					</AnalyticsContextProvider>
				</SearchContextProvider>
			</ApiClientProvider>
		</HelmetProvider>
	)
}

