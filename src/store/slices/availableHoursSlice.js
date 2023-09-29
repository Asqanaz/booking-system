import { createSlice } from "@reduxjs/toolkit"
import { AVAILABLE_HOURS, PROFESSIONALS, SERVICES } from "../../utils/constants"
import { getItem } from "../../utils/getItem"

const initialState = getItem(AVAILABLE_HOURS)

const availableHoursSlice = createSlice({
  name: "available-hours",
  initialState,
  reducers: {
    createAvailableHour(state, action) {
      const { payload } = action

      const services = getItem(SERVICES)
      const professionals = getItem(PROFESSIONALS)

      const currentService = services.find(
        service => service.id === payload.service
      ).id
      const currentProfessional = professionals.find(
        prof => prof.id === payload.professional
      ).id

      const body = {
        ...payload,
        service: currentService,
        professional: currentProfessional,
        start: payload.start
      }

      if (
        !state.find(
          d =>
            d.professional === currentProfessional &&
            d.service === currentService &&
            d.start === payload.start
        )
      ) {
        state.push(body)
        localStorage.setItem(AVAILABLE_HOURS, JSON.stringify(state))

        const updateProfessionalsIds = services.map(service =>
          service.id === currentService
            ? {
                ...service,
                professionalsIds: [
                  ...new Set([...service.professionalsIds, currentProfessional])
                ]
              }
            : { ...service }
        )

        localStorage.setItem(SERVICES, JSON.stringify(updateProfessionalsIds))

        const updateAvailableHoursIds = professionals.map(prof =>
          prof.id === currentProfessional
            ? {
                ...prof,
                availableHoursIds: [...prof.availableHoursIds, payload.id]
              }
            : { ...prof }
        )

        localStorage.setItem(
          PROFESSIONALS,
          JSON.stringify(updateAvailableHoursIds)
        )
      }

      return state
    },
    deleteAvailableHour(state, action) {
      const { payload } = action

      const filteredState = state.filter(av => av.id !== payload)
      localStorage.setItem(AVAILABLE_HOURS, JSON.stringify(filteredState))

      const professionals = getItem(PROFESSIONALS)
      const updatedAvailableHoursIds = professionals.map(prof => ({
        ...prof,
        availableHoursIds: prof.availableHoursIds.filter(av => av !== payload)
      }))
      localStorage.setItem(
        PROFESSIONALS,
        JSON.stringify(updatedAvailableHoursIds)
      )

      return filteredState
    }
  }
})

export const { createAvailableHour, deleteAvailableHour } =
  availableHoursSlice.actions

export default availableHoursSlice.reducer
