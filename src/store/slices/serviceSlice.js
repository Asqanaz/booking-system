import { createSlice } from "@reduxjs/toolkit"

const initialState = JSON.parse(localStorage.getItem("services")) || []

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    createService(state, action) {
      const { payload } = action

      const body = {
        id: new Date().toISOString(),
        ...payload
      }
      state.push(body)
      localStorage.setItem("services", JSON.stringify(state))

      return state
    },
    editServices(state, action) {
      const { payload } = action

      const item = state.find(service => service.id === payload.id)
      const itemId = state.indexOf(item)
      state[itemId] = payload
      localStorage.setItem("services", JSON.stringify(state))

      return state
    },
    deleteService(state, action) {
      const { payload } = action

      const filteredState = state.filter(service => service.id !== payload.id)

      localStorage.setItem("services", JSON.stringify(filteredState))

      return filteredState
    }
  },
  extraReducers: {}
})

export const { editServices, createService, deleteService } = serviceSlice.actions

export default serviceSlice.reducer
