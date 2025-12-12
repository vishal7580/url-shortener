import React, { useEffect } from 'react'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from '../api/auth.api'
import { login, logout } from '../store/slices/authSlice'
import { ToastContainer } from 'react-toastify';


const Root = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.auth)

    async function authenticate() {
      try {
        const data = await checkAuth()
        dispatch(login(data.user))
      } catch (err) {
        dispatch(logout())
        console.log(err)
      }
    }
    useEffect(()=> {
      !user && authenticate()
    },[])
  return (
  <Container>
    <Navbar/>
    <div className={`flex justify-center items-center  h-[calc(100vh-70px)] mt-18`}>
      <Outlet />
      <ToastContainer hideProgressBar={true} closeButton={false} pauseOnHover= {false} autoClose = {2000}/>
    </div>
  </Container>
  )
}

export default Root