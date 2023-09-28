import { getItem } from "../utils/getItem"


export const createService = (data) => {
    const existingData = getItem('services')

    const body = {
        id: new Date().toISOString(),
        ...data,
        professionalsIds: []
    }

    const newData = [...existingData, body]

    localStorage.setItem('services', JSON.stringify(newData))
}
