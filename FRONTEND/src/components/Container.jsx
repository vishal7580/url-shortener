import React from 'react'

const Container = ({ children }) => {
  return (
      <div className="h-screen  bg-white rounded-xl shadow-md border border-neutral-200">
        {children}
      </div>
  )
}

export default Container


// and it's children going to be either login or signup component , now improve login and signup  accordingly