import { AVAILABLE_HOURS, PROFESSIONALS, SERVICES } from "../utils/constants"
import { getItem } from "../utils/getItem"

const services = getItem(SERVICES)
const professionals = getItem(PROFESSIONALS)

export const createAvailableHours = data => {
  const existingData = getItem(AVAILABLE_HOURS)

  const currentService = services.find(service => service.id === data.service)
  const currentProfessional = professionals.find(
    prof => prof.id === data.professional
  )

  console.log(currentService)
  console.log(currentProfessional)

  const body = {
    ...data,
    service: currentService,
    professional: currentProfessional,
    start: data.start
  }


  const updateProfessionalsIds = services.map(service =>
    service.id === currentService.id
      ? {
          ...service,
          professionalsIds: [
            ...new Set([...service.professionalsIds, currentProfessional.id])
          ]
        }
      : { ...service }
  )

  localStorage.setItem(SERVICES, JSON.stringify(updateProfessionalsIds))

  const updateAvailableHoursIds = professionals.map(prof =>
    prof.id === currentProfessional.id
      ? {
          ...prof,
          availableHoursIds: [...prof.availableHoursIds, data.id]
        }
      : { ...prof }
  )

  localStorage.setItem(PROFESSIONALS, JSON.stringify(updateAvailableHoursIds))

  const newData = [...existingData, body]

  if (
    !existingData.find(
      d =>
        d.professional.id === currentProfessional.id &&
        d.service.id === currentService.id &&
        d.start === data.start
    )
  ) {
    localStorage.setItem(AVAILABLE_HOURS, JSON.stringify(newData))
  }
}
