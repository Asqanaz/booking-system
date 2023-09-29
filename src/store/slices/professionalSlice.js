import { createSlice } from "@reduxjs/toolkit"
import { AVAILABLE_HOURS, PROFESSIONALS, SERVICES } from "../../utils/constants"
import { getItem } from "../../utils/getItem"

const initialState = getItem(PROFESSIONALS)

const professionalSlice = createSlice({
  name: "professional",
  initialState,
  reducers: {
    createProfessional(state, action) {
      const { payload } = action
      console.log("payload", payload)

      const body = {
        id: new Date().toISOString(),
        ...payload,
        availableHoursIds: []
      }
      state.push(body)
      localStorage.setItem(PROFESSIONALS, JSON.stringify(state))

      return state
    },
    editProfessional(state, action) {
      const { payload } = action
      const newState = state.map(professional =>
        professional.id === payload.id
          ? { ...professional, ...payload }
          : { ...professional }
      )
      localStorage.setItem(PROFESSIONALS, JSON.stringify(state))

      return newState
    },
    deleteProfessional(state, action) {
      const { payload } = action

      const filteredState = state.filter(
        professional => professional.id !== payload
      )
      localStorage.setItem(PROFESSIONALS, JSON.stringify(filteredState))

      const availableHours = getItem(AVAILABLE_HOURS)
      const filteredAvailableHour = availableHours.filter(
        av => av.professional !== payload
      )
      localStorage.setItem(
        AVAILABLE_HOURS,
        JSON.stringify(filteredAvailableHour)
      )

      const services = getItem(SERVICES)
      const filteredProfessionalsIds = services?.map(service => ({...service, professionalsIds: service.professionalsIds.filter(prof => prof.id === payload)}))

      localStorage.setItem(SERVICES, JSON.stringify(filteredProfessionalsIds))

      return filteredState
    }
  },

  extraReducers: {}
})

export const { editProfessional, createProfessional, deleteProfessional } =
  professionalSlice.actions

export default professionalSlice.reducer
