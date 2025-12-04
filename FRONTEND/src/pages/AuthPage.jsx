import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import { RegisterForm } from '../components/RegisterForm'
import Navbar from '../components/Navbar'

const AuthPage = () => {
    const [showLogin,setShowLogin] = useState(true)
  return (
    <>
    {
        showLogin ? 
        <LoginForm showLogin={setShowLogin}/>
        : <RegisterForm showLogin = {setShowLogin}/>
    }
    </>
  )
}

export default AuthPage