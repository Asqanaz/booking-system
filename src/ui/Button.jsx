
import clsx from 'clsx'
import React from 'react'

export default function Button({
    variant,
    fullWidth,
    onClick,
    children,
    type = 'button'
}) {
  return (
    <button
        className={clsx('px-4 py-2 text-center rounded-xl text-white duration-150 w-fit', 
            variant === 'primary' ? 'bg-blue-400 border-transparent hover:bg-blue-500' : 'bg-red-600 hover:bg-red-700 border-transparent',
            fullWidth && `w-full`
        )}
        onClick = {onClick}
        type = {type}
    >
        {children}
    </button>
  )
}
