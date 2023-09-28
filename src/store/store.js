import { configureStore } from "@reduxjs/toolkit"
import serviceSlice from "./slices/serviceSlice"

export const setupStore = () => {
	return configureStore({
		reducer: {
			services: serviceSlice
		}
	})
}