import React from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { fieldTypes } from "../utils/fields"
import { Input } from "../ui/Input"
import Button from "../ui/Button"
import { useDispatch } from "react-redux"
// import { createItem, getItem } from "../actions/actions"
import Select from "../ui/Select"
import { getItem } from "../utils/getItem"
import { createService } from "../store/slices/serviceSlice"
import { createProfessional } from "../store/slices/professionalSlice"
import { createAvailableHour } from "../store/slices/availableHoursSlice"

export default function Create() {
  const { category } = useParams()

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  })

  const fields = Object.entries(fieldTypes[category])

  const onSubmit = data => {
    if (category === "services") {
      dispatch(createService(data))
    }

    if (category === "professionals") {
      dispatch(createProfessional(data))
    }

    if (category === "available-hours") {
      dispatch(createAvailableHour({ id: new Date().toISOString(), ...data }))
    }

    reset()
  }

  const services = getItem("services")
  const professionals = getItem("professionals")
  return (
    <div className="py-20">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {fields.map(([key, value]) => {
          if (value === "select") {
            return (
              <Select
                label={key[0].toUpperCase() + key.slice(1)}
                id={key}
                register={register}
                errors={errors}
                data={key === "service" ? services : professionals}
                validationSchema={{
                  required: true
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
