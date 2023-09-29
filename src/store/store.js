import { configureStore } from "@reduxjs/toolkit"
import serviceSlice from "./slices/serviceSlice"
import professionalSlice from "./slices/professionalSlice"
import availableHoursSlice from "./slices/availableHoursSlice"

export const setupStore = () => {
	return configureStore({
		reducer: {
			services: serviceSlice,
			professionals: professionalSlice,
			'available-hours': availableHoursSlice
		}
	})
}