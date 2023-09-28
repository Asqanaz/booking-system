import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fieldTypes } from "../../utils/fields"
import { useForm } from "react-hook-form"
import { Input } from "../../ui/Input"
import Button from "../../ui/Button"
import Select from "../../ui/Select"
import { getItem } from "../../utils/getItem"

export default function ViewDetails() {
  const { category, id } = useParams()

  const navigate = useNavigate()

  const fields = Object.entries(fieldTypes[category])

  const data = getItem(category)?.find(d => d.id === id)

  const services = getItem("services")
  const professionals = getItem("professionals")

  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues:
      category === "available-hours"
        ? {
            service: data.service.id,
            professional: data.professional.id,
            start: data.start
          }
        : data
  })

  console.log(data)

  // console.log({
  //   service: data.service.id,
  //   professional: data.professional.id,
  //   start: data.start
  // })

  console.log(id)
  const onSubmit = body => {
    // updateItem(category, { id, ...body })
    
  }

  console.log('alo'.slice(0, -1))

  console.log("errors", errors)
  return (
    <div className="py-20">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {fields.map(([key, value]) => {
          if (value === "select") {
            // return <select {...register(key)} >
            //     {console.log(key)}
            //   {key === "service"
            //     ? (services.map(service => <option>{service.name}</option>) || <option disabled>No available Service</option>)
            //     : (professionals.map(prof => <option>{prof.name}</option>) || <option selected disabled>No available professionals</option>)}
            // </select>
            // {console.log(data[key].name)}
            return (
              <Select
                label={key[0].toUpperCase() + key.slice(1)}
                id={key}
                register={register}
                defaultValue={
                  key === "service" ? data.service.id : data.professional.id
                }
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
          Edit
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
