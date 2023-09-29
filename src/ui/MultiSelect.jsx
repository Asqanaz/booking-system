'use client'
import ReactSelect from 'react-select'

export default function MultiSelect({ 
    disabled,
    label,
    options,
    onChange,
    value,
    defaultValue
}) {

  return (
    <div
        className="z-[100]"
    >
        <label htmlFor="" 
            className="block text-sm font-medium leading-6 text-gray-900"
        >
            {label}
        </label>
        <div className="mt-2">
            <ReactSelect 
                isDisabled = {disabled}
                value = {value}
                onChange = {onChange}
                isMulti
                options = {options}
                menuPortalTarget={document.body}
                styles = {{
                    menuPortal: (base) => ({
                        ...base,
                        zIndex: 9999,
                    })
                }}
                defaultValue={defaultValue}
                classNames = {{
                    control: () => 'text-sm'
                }}
            />
        </div>
    </div>
  )
}