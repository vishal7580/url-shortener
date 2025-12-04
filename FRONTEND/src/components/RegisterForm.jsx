import React, { useState } from "react";
import Input from "./Input";
import { registerUser } from "../api/auth.api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/slices/authSlice";
import Loader from "./Loader";
import { isValidEmail } from "../utils/helper";

export const RegisterForm = ({ showLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!name.trim() || !email.trim() || !password.trim()) {
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
      const user = await registerUser(name, email, password);
      console.log("user: ", user);
      dispatch(login(user.user));
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    setLoading(false);
  }
  return (
    <div className="max-w-md w-10/12 ">
      <div className=" p-8 pb-6 rounded-2xl shadow-lg bg-white border border-gray-200">
        <h2 className="text-2xl  font-bold  text-center">
          Create Your Account & <br /> Make Links Simple{" "}
        </h2>
        <p className="text-sm text-gray-500 text-center my-2">
          Sign up to shorten, manage, and track your URLs
        </p>
        {/* Error Message */}
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        {/* Name Input */}
        <Input
          type="text"
          label="Name"
          placeholder="Enter Your Name"
          value={name}
          setValue={setName}
        />

        {/* Email Input */}
        <Input
          type="text"
          label="Email"
          placeholder="Enter Your Email"
          value={email}
          setValue={setEmail}
        />

        {/* Password Input */}
        <Input
          type="text"
          label="Password"
          placeholder="Enter Your Password"
          value={password}
          setValue={setPassword}
        />
        <div className="flex items-center text-sm mb-4 ">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-blue-600" />
            <span className="text-gray-500">I have read and agree to the</span>
            <p className="text-blue-600 hover:underline">Terms & Condtions</p>
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="hover:from-blue-600 hover:to-purple-700 bg-gradient-to-r from-blue-500 to-purple-600 w-full  h-10 mb-4
            text-white rounded-md transition duration-200 text-center font-semibold
            "
        >
          {!loading ? "Create Your Account" : <Loader />}
        </button>

        <p className="text-sm text-gray-500 text-center">
          Already have an account?
          <span
            onClick={() => showLogin(true)}
            className="text-blue-600 cursor-pointer font-medium hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};
