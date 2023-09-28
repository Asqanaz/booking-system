import clsx from "clsx"
import React from "react"

export default function Select({
  register,
  id,
  label,
  validationSchema,
  disabled,
  errors,
  data,
  placeholder
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          id={id}
          autoComplete={id}
          {...register(id, validationSchema)}
          className={clsx(
            `block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 px-2 outline-none`,
            errors[id] ? "focus:ring-rose-600" : "focus:ring-sky-600",
            disabled && "opacity-50 cursor-default"
          )}
        >
          <option
            selected
            disabled
          >
            {placeholder}
          </option>
          {data.length ? (
            data.map(d => <option value={d.id}>{d.name}</option>)
          ) : (
            <option disabled>No available {id}</option>
          )}
        </select>

        <p className="text-sm text-rose-600">{errors[id]?.message}</p>
      </div>
    </div>
  )
}
