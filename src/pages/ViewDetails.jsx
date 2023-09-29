import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fieldTypes } from "../utils/fields"
import { Controller, useForm } from "react-hook-form"
import { Input } from "../ui/Input"
import Button from "../ui/Button"
import Select from "../ui/Select"
import { AVAILABLE_HOURS, PROFESSIONALS, SERVICES } from "../utils/constants"
import { editProfessional } from "../store/slices/professionalSlice"
import { useDispatch, useSelector } from "react-redux"
import { editService } from "../store/slices/serviceSlice"
import MultiSelect from "../ui/MultiSelect"

export default function ViewDetails() {
  const { category, id } = useParams()

  const navigate = useNavigate()

  const fields = Object.entries(fieldTypes[category])

  const items = useSelector(state => state[category])

  const data = items.find(d => d.id === id)

  const dispatch = useDispatch()

  const services = useSelector(state => state.services)
  const professionals = useSelector(state => state.professionals)

  const professionalsOptions = professionals.map(prof => ({
    value: prof.id,
    label: prof.name
  }))

  const defaultProfessionalsValues = data.professionalsIds
    ?.map(id => professionals.find(prof => prof.id === id))
    ?.map(prof => ({
      value: prof.id,
      label: prof.name
    }))

  const {
    formState: { errors },
    handleSubmit,
    register,
    control
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues:
      category === "available-hours"
        ? {
            service: data.service,
            professional: data.professional,
            start: data.start
          }
        : { ...data, professionalsIds: defaultProfessionalsValues }
  })

  const onSubmit = body => {
    if (category === SERVICES) {
      dispatch(editService({ id, ...body }))
    }

    if (category === PROFESSIONALS) {
      dispatch(editProfessional({ id, ...body }))
    }
  }

  return (
    <div className="py-20 max-w-xl">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {fields.map(([key, value]) => {
          if (value === "select") {
            return (
              <Select
                key={key}
                label={key[0].toUpperCase() + key.slice(1)}
                id={key}
                register={register}
                defaultValue={data[key]}
                errors={errors}
                data={key === "service" ? services : professionals}
                validationSchema={{
                  required: true
                }}
                disabled={category === AVAILABLE_HOURS}
              />
            )
          }

          if (value === "multi-select") {
            return (
              <Controller
                name={key}
                key={key}
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
              key={key}
              id={key}
              register={register}
              label={key[0].toUpperCase() + key.slice(1)}
              type={value}
              disabled={category === AVAILABLE_HOURS}
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
              errors={errors}
            />
          )
        })}
        {category !== AVAILABLE_HOURS && (
          <Button
            type="submit"
            variant={"primary"}
          >
            Edit
          </Button>
        )}
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
