import { getItem } from "../utils/getItem"

export const createProfessional = (data) => {

    const existingData = getItem('professionals')

    const body = {
        id: new Date().toISOString(),
        ...data,
        availableHoursIds: []
    }

    const newData = [...existingData, body]

    localStorage.setItem('professionals', JSON.stringify(newData))
}