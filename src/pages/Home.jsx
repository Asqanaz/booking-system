import React from "react"
import { useForm } from "react-hook-form"
import { useMultistepForm } from "../hooks/useMultiStepForm"
import Select from "../ui/Select"
import { getItem } from "../utils/getItem"

export default function Home() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm({})

  const { step } = useMultistepForm([])

  const services = getItem("services")
  const professionals = getItem("professionals")
  const availableHours = getItem("available-hours")

  const service = watch("service")
  const professional = watch("professional")

//   const availableProfessionals = Array.from(new Set(availableHours
//     .filter(av => av.service.id === service)
//     .map(av => av.professional.id)))

const filteredByService = availableHours.filter(av => av.service.id === service)
const availableProfessionals = Array.from(new Set(filteredByService.map(av => av.professional.id))).map(id => {
    return filteredByService.find(s => s.id === id)
})
    console.log(availableProfessionals)

//   const 

  console.log(filteredByService)

  //   console.log(availableHours.filter(av => av.service.id === service))

  const onSubmit = data => {

  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl w-1/3 h-96 p-5 bg-neutral-200 border rounded-xl"
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
            data={availableHours
              .filter(av => av.service.id === service)
              .map(av => av.professional)}
            register={register}
            errors={errors}
            placeholder={"Choose your professional"}
            id={"professional"}
            label={"Professionals"}
            validationSchema={{ required: true }}
          />
          <div className="block text-sm font-medium leading-6 text-gray-900">
            <span>Available Hours</span>
            <div className="mt-2">
              {availableHours
                .filter(
                  av =>
                    av.service.id === service &&
                    av.professional.id === professional
                )
                .map(hours => (
                  <div className="py-2 px-2 w-fit bg-neutral-100">
                    {hours.start}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
