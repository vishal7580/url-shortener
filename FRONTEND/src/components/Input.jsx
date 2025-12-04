import React from 'react'

const Input = ({
    type = 'text',
    label,
    placeholder,
    value,setValue

}) => {
  return (
    <div className='flex flex-col mb-4'>
        {
            label && <label className='block text-sm font-medium text-gray-500 mb-1' htmlFor={label}>{label}</label>
        }
        <input className='w-full px-2.5 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' type={type} id={label} placeholder={placeholder}
            value={value} onChange={(e)=> setValue(e.target.value)}
        />
    </div>
  )
}

export default Input