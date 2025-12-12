import React, { useState } from "react";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import { login } from "../store/slices/authSlice";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { isValidEmail } from "../utils/helper";

const LoginForm = ({ showLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!email.trim() || !password.trim()) {
      setError("credentials required");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Enter valid email");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(email, password);
      dispatch(login(response.user._id));
      navigate("/");
      toast.success("Login successfull!", { position: "bottom-center" });
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }
return (
  <div className="max-w-md w-10/12">
    <div className="p-6 sm:p-8 pb-6 rounded-2xl shadow-lg bg-white border border-gray-200">

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 leading-snug">
         Welcome Back to <br/>
        URL Shortener
      </h2>

      <p className="text-xs sm:text-sm text-gray-500 text-center my-2">
        Sign in to shorten, manage, and track your URLs
      </p>

      {/* Error Message */}
      {error && (
        <p className="text-xs sm:text-sm text-red-500 text-center">
          {error}
        </p>
      )}

      {/* Email Input */}
      <Input
        type="text"
        label="Email"
        placeholder="Enter Your Email"
        value={email}
        setValue={setEmail}
        className="mb-4"
      />

      {/* Password Input */}
      <Input
        type="text"
        label="Password"
        placeholder="Enter Your Password"
        value={password}
        setValue={setPassword}
        className="mb-4"
      />

      {/* Remember Me + Forgot Password */}
      <div className="flex items-center justify-between text-xs sm:text-sm mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 accent-blue-600" />
          <span className="text-gray-500">Remember me</span>
        </label>

        <a href="#" className="text-blue-600 hover:underline">
          Forgot password?
        </a>
      </div>

      {/* Login Button */}
      <button
        onClick={handleSubmit}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
        w-full h-10 mb-4 text-white rounded-md transition duration-200 font-semibold
        text-sm sm:text-base"
      >
        {!loading ? "Login" : <Loader />}
      </button>

      {/* Register Link */}
      <p className="text-xs sm:text-sm text-gray-500 text-center">
        Don’t have an account?{" "}
        <span
          onClick={() => showLogin(false)}
          className="text-blue-600 cursor-pointer font-medium hover:underline"
        >
          Register
        </span>
      </p>
    </div>
  </div>
);

};

export default LoginForm;
