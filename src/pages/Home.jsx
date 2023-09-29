import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Select from "../ui/Select"
import Radio from "../ui/Radio"
import Button from "../ui/Button"
import { deleteAvailableHour } from "../store/slices/availableHoursSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset
  } = useForm({})

  const dispatch = useDispatch()

  const [availableProfessionals, setAvailableProfessionals] = useState([])
  const [availableProfessionalsHours, setAvailableProfessionalsHours] =
    useState([])

  const services = useSelector(state => state.services)
  const professionals = useSelector(state => state.professionals)
  const availableHours = useSelector(state => state["available-hours"])

  const navigate = useNavigate()

  const serviceValue = watch("service")
  const professionalValue = watch("professional")

  useEffect(() => {
    setAvailableProfessionals(
      services
        .find(serv => serv.id === serviceValue)
        ?.professionalsIds?.map(id =>
          professionals?.find(prof => prof.id === id)
        )
    )

    if (serviceValue && professionalValue) {
      setAvailableProfessionalsHours(
        professionals
          .find(prof => prof.id === professionalValue)
          ?.availableHoursIds?.map(id =>
            availableHours?.find(av => av.id === id)
          )
      )
    }
  }, [serviceValue, professionalValue, availableHours, professionals, services])

  useEffect(() => {
    setValue("professional", "none")
  }, [serviceValue])

  const onSubmit = data => {
    dispatch(deleteAvailableHour(data.start))
    navigate(0)

    reset()
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl w-1/3 h-96 p-5 bg-neutral-200 border rounded-xl relative"
      >
        <h1 className="text-2xl text-center font-bold my-4">Booking System</h1>
        <div className="flex flex-col gap-y-3">
          <Select
            data={services}
            register={register}
            errors={errors}
            id={"service"}
            label={"Services"}
            placeholder={"Choose a service"}
            validationSchema={{ required: true }}
          />
          <Select
            data={availableProfessionals}
            register={register}
            errors={errors}
            placeholder={"Choose your professional"}
            id={"professional"}
            label={"Professionals"}
            validationSchema={{ required: true }}
          />
          <div className="block text-sm font-medium leading-6 text-gray-900">
            <span>Available Hours</span>
            <div className="mt-2 flex gap-3">
              {availableProfessionalsHours?.length ? (
                availableProfessionalsHours.map(hours => (
                  <Radio
                    key={hours.id}
                    label={hours.start}
                    value={hours.id}
                    register={register}
                  />
                ))
              ) : (
                <h2>No available hours</h2>
              )}
            </div>
          </div>
          <div className="flex justify-end absolute bottom-2 right-4">
            <Button
              type="submit"
              variant="primary"
            >
              Book
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
