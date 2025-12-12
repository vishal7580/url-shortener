import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  function handleLogout() {
    logoutUser();
    dispatch(logout());
    navigate("/");
    setOpen(false);
  }

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-200 fixed top-0 left-0 z-50">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center px-6 py-3">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-slate-800 hover:text-slate-900 transition"
        >
          URL<span className="text-blue-600">Shortner</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link className="navlink" to="/dashboard">Dashboard</Link>
          <Link className="navlink" to="#">Features</Link>
          <Link className="navlink" to="#">Pricing</Link>
          <Link className="navlink" to="#">About</Link>

          {!isLoggedIn ? (
            <Link to="/auth">
              <button className="btn-primary">Login</button>
            </Link>
          ) : (
            <button onClick={handleLogout} className="btn-primary">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-3xl text-slate-800"
        >
          ☰
        </button>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          ref={menuRef}
          className={`fixed top-0 left-0 h-full w-[80%] max-w-[300px] bg-white shadow-xl p-6 transform transition-transform duration-300 
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="text-3xl font-bold text-slate-700 mb-6"
          >
            ✕
          </button>

          <div className="flex flex-col gap-5 text-lg">
            <Link className="mobile-link" to="/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
            <Link className="mobile-link" to="#" onClick={() => setOpen(false)}>
              Features
            </Link>
            <Link className="mobile-link" to="#" onClick={() => setOpen(false)}>
              Pricing
            </Link>
            <Link className="mobile-link" to="#" onClick={() => setOpen(false)}>
              About
            </Link>

            {!isLoggedIn ? (
              <Link to="/auth" onClick={() => setOpen(false)}>
                <button className="btn-primary w-full mt-4">Login</button>
              </Link>
            ) : (
              <button onClick={handleLogout} className="btn-primary mt-4 w-full ">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
