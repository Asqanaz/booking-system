import React from "react"

export default function Radio({ value, label, register }) {
  return (
    <label
      className="py-2 px-2 w-fit bg-neutral-100 flex items-center gap-2"
      htmlFor={value}
    >
      <input
        type="radio"
        value={value}
        {...register("start", {
          required: true
        })}
      />
      {label}
    </label>
  )
}
