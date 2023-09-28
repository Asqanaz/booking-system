import { createSlice } from "@reduxjs/toolkit"

const initialState = JSON.parse(localStorage.getItem("professionals")) || []

const professionalSlice = createSlice({
  name: "professional",
  initialState,
  reducers: {
    createProfessional(state, action) {
      const { payload } = action
      console.log('payload', payload)

      const body = {
        id: new Date().toISOString(),
        ...payload
      }
      state.push(body)
      localStorage.setItem("professionals", JSON.stringify(state))

      return state
    },
    editProfessionals(state, action) {
      const { payload } = action
      const item = state.find(professional => professional.id === payload.id)
      const itemId = state.indexOf(item)
      state[itemId] = payload
      localStorage.setItem("professionals", JSON.stringify(state))

      return state
    },
    deleteProfessional(state, action) {
      const { payload } = action

      const filteredState = state.filter(professional => professional.id !== payload.id)

      localStorage.setItem("professionals", JSON.stringify(filteredState))

      return filteredState
    }
  },

  extraReducers: {}
})

export const { editProfessionals, createProfessional, deleteProfessional } = professionalSlice.actions

export default professionalSlice.reducer
