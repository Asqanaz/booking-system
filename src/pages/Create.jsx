import React from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { fieldTypes } from "../utils/fields"
import { Input } from "../ui/Input"
import Button from "../ui/Button"
import { useDispatch, useSelector } from "react-redux"
import Select from "../ui/Select"
import { createService } from "../store/slices/serviceSlice"
import { createProfessional } from "../store/slices/professionalSlice"
import { createAvailableHour } from "../store/slices/availableHoursSlice"
import MultiSelect from "../ui/MultiSelect"
import { AVAILABLE_HOURS, PROFESSIONALS, SERVICES } from "../utils/constants"

export default function Create() {
  const { category } = useParams()

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
    control
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  })

  const fields = Object.entries(fieldTypes[category])

  const onSubmit = data => {
    if (category === SERVICES) {
      dispatch(createService(data))
    }

    if (category === PROFESSIONALS) {
      dispatch(createProfessional(data))
    }

    if (category === AVAILABLE_HOURS) {
      dispatch(createAvailableHour({ id: new Date().toISOString(), ...data }))
    }

    reset()
  }

  const serviceValue = watch('service')
  const services = useSelector(state => state.services)
  const professionals = useSelector(state => state.professionals)

  const professionalsOptions = professionals.map(prof => ({
    value: prof.id,
    label: prof.name
  }))

  const professionalsAvailableHoursOptions = services.find(service => service.id === serviceValue)?.professionalsIds?.map(id => professionals.find(prof => prof.id === id))


  return (
    <div className="py-20 max-w-xl">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {fields.map(([key, value]) => {
          if (value === "select") {
            console.log(key)
            return (
              <Select
                label={key[0].toUpperCase() + key.slice(1)}
                id={key}
                register={register}
                errors={errors}
                data={key === 'service' ? services : professionalsAvailableHoursOptions}
                validationSchema={{
                  required: true
                }}
              />
            )
          }

          if (value === "multi-select") {
            return (
              <Controller
                name={key}
                control={control}
                render={({ field: { onChange, value, ref } }) => {
                  return (
                    <MultiSelect
                      label={"Professionals"}
                      options={professionalsOptions}
                      value={value}
                      onChange={onChange}
                    />
                  )
                }}
              />
            )
          }

          return (
            <Input
              id={key}
              register={register}
              label={key[0].toUpperCase() + key.slice(1)}
              type={value}
              validationSchema={{
                required: true,
                min: {
                  value: key === "duration" ? 30 : undefined,
                  message: "Min duration is 30 minutes"
                },
                max: {
                  value: key === "duration" ? 90 : undefined,
                  message: "Max duration is 90 minutes"
                }
              }}
              key={key}
              errors={errors}
            />
          )
        })}
        <Button
          type="submit"
          variant={"primary"}
        >
          Create
        </Button>
        <Button
          type="button"
          variant={"primary"}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </form>
    </div>
  )
}
