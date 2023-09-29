import React from "react"
import Button from "../ui/Button"
import { Link } from "react-router-dom"
import { AVAILABLE_HOURS, PROFESSIONALS, SERVICES } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { deleteService } from "../store/slices/serviceSlice"
import { deleteProfessional } from "../store/slices/professionalSlice"
import { deleteAvailableHour } from "../store/slices/availableHoursSlice"

export default function Card({ category, data }) {
  const services = useSelector(state => state.services)
  const professionals = useSelector(state => state.professionals)

  const professionalName = professionals?.find(
    prof => prof.id === data.professional
  )?.name
  const serviceName = services?.find(
    service => service.id === data.service
  )?.name

  const dispatch = useDispatch()

  return (
    <div className="w-full flex gap-x-3">
      <div className="w-[80%] rounded-2xl bg-neutral-200 h-[64px] py-3 flex items-center justify-center">
        <span>
          {data.name || professionalName + " " + serviceName + " " + data.start}
        </span>
      </div>
      <Link to={`/admin/view/${category}/${data.id}`} className="py-2 px-4 text-center rounded-xl bg-blue-700 text-white">View Details</Link>
      <Button
        variant={"secondary"}
        onClick={() => {
          if (category === SERVICES) {
            dispatch(deleteService(data.id))
          }

          if (category === PROFESSIONALS) {
            dispatch(deleteProfessional(data.id))
          }

          if (category === AVAILABLE_HOURS) {
            dispatch(deleteAvailableHour(data.id))
          }
        }}
      >
        Delete
      </Button>
    </div>
  )
}
