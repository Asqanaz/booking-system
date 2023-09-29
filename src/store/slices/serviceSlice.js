import { createSlice } from "@reduxjs/toolkit"
import { AVAILABLE_HOURS, PROFESSIONALS, SERVICES } from "../../utils/constants"
import { getItem } from "../../utils/getItem"

const initialState = JSON.parse(localStorage.getItem(SERVICES)) || []

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    createService(state, action) {
      const { payload } = action

      const body = {
        id: new Date().toISOString(),
        ...payload,
        professionalsIds: []
      }

      if(!state.find(s => s.name === payload.name)) {
        state.push(body)
        localStorage.setItem(SERVICES, JSON.stringify(state))

      }


      return state
    },
    editService(state, action) {
      const { payload } = action

      const newState = state.map(s =>
        s.id === payload.id ? { ...s, ...payload } : { ...s }
      )
      localStorage.setItem(SERVICES, JSON.stringify(newState))

      return state
    },
    deleteService(state, action) {
      const { payload } = action

      const filteredState = state.filter(service => service.id !== payload)
      localStorage.setItem(SERVICES, JSON.stringify(filteredState))

      const availableHours = getItem(AVAILABLE_HOURS)
      const filteredAvailableHour = availableHours.filter(
        av => av.service !== payload
      )
      localStorage.setItem(
        AVAILABLE_HOURS,
        JSON.stringify(filteredAvailableHour)
      )

      const professionals = getItem(PROFESSIONALS)
      const deletedAvailableHours = availableHours.find(
        av => av.service === payload
      )
      const filteredAvailableHoursIds = professionals?.map(prof =>
        prof.id === deletedAvailableHours?.professional
          ? {
              ...prof,
              availableHoursIds: prof.availableHoursIds.filter(
                avIds => deletedAvailableHours.id !== avIds
              )
            }
          : { ...prof }
      )

      localStorage.setItem(PROFESSIONALS, JSON.stringify(filteredAvailableHoursIds))

      console.log(filteredAvailableHour)

      return filteredState
    }
  },
  extraReducers: {}
})

export const { editService, createService, deleteService } =
  serviceSlice.actions

export default serviceSlice.reducer
