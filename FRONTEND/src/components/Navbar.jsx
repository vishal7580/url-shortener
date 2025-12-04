import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../api/auth.api'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/authSlice'

const Navbar = () => {
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  function handleLogout() {
    logoutUser()
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center px-6 py-3">
        
        {/* Left */}
        <Link to="/" className="text-2xl font-bold text-slate-800 hover:text-slate-900 transition">
          URL<span className="text-blue-600">Shortner</span>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-6">

          {/* Core Links */}
          <Link to="/dashboard" className="text-slate-700 font-medium hover:text-slate-900 transition">Dashboard</Link>
          <Link to="#" className="text-slate-700 font-medium hover:text-slate-900 transition">Features</Link>
          <Link to="#" className="text-slate-700 font-medium hover:text-slate-900 transition">Pricing</Link>
          <Link to="#" className="text-slate-700 font-medium hover:text-slate-900 transition">About</Link>

          {/* Auth Buttons */}
          {
            !isLoggedIn ? (
              <Link to="/auth">
                <button className="px-5 py-2 rounded-md font-semibold text-white bg-slate-800 hover:bg-slate-900 transition-all shadow-md hover:shadow-lg">
                  Login
                </button>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-slate-800 hover:bg-slate-950 text-white px-4 py-2 rounded-md font-medium transition-all"
              >
                Logout
              </button>
            )
            
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
