import clsx from "clsx"
import React from "react"

export const Input = ({
  label,
  id,
  type,
  validationSchema,
  register,
  errors,
  disabled,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, validationSchema)}
          className={clsx(
            `block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 px-2 outline-none`,
            errors[id] ? "focus:ring-rose-600" : "focus:ring-sky-600",
            disabled && "opacity-50 cursor-default"
          )}
          
        />

        <p className="text-sm text-rose-600">{errors[id]?.message}</p>
        
      </div>
    </div>
  )
}
