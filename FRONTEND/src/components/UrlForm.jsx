import { useState } from "react";
import { useSelector } from "react-redux";
import { createCustomShortUrl } from "../api/url.api";
import { toast } from "react-toastify";
import { isValidURL } from "../utils/helper";
import Loader from "./Loader";
const UrlForm = ({
  url,
  setResult,
  loading,
  setLoading,
  setUrl,
  getShortUrl,
  setShortUrl,
}) => {
  const [error, setError] = useState("");
  const [custom, setCustom] = useState("");

  const { isAuthenticated, user: userId } = useSelector((state) => state.auth);

  async function getCustomShortUrl() {
    try {
      setLoading(true);
      const data = await toast.promise(
        createCustomShortUrl(url, userId, custom),
        {
          success: "Short URL created!",
        }
      );
      setShortUrl(data);
      setResult(true);
    } catch {
      setError("custom name not available!");
    } finally {
      setLoading(false);
    }
  }

return (
  <div className="w-[92%] max-w-md p-6 sm:p-8 rounded-2xl border border-gray-200 bg-white shadow-md">

    {/* Title */}
    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-slate-800 tracking-wide leading-snug">
      <span className="text-blue-600">Shorten</span> Your URL
    </h1>

    {/* Long URL Input */}
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor="longurl" className="text-xs sm:text-sm font-medium text-gray-700">
        Long URL
      </label>

      <input
        id="longurl"
        type="text"
        placeholder="Enter your long URL"
        value={url}
        onChange={(e) => {
          setError("");
          setUrl(e.target.value);
        }}
        className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-100 border border-gray-300 
        text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none 
        focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>

    {/* Custom URL Input */}
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor="customurl" className="text-xs sm:text-sm font-medium text-gray-700">
        Custom URL
      </label>

      <input
        id="customurl"
        type="text"
        placeholder="Enter name for custom URL"
        value={custom}
        onChange={(e) => {
          setError("");
          setCustom(e.target.value);
        }}
        readOnly={!isAuthenticated}
        onClick={() => !isAuthenticated && setError("custom name requires Login")}
        className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-100 border border-gray-300 
        text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none 
        focus:ring-2 focus:ring-blue-500 transition
        ${!isAuthenticated ? "cursor-not-allowed opacity-70" : ""}`}
      />

      {/* Error */}
      <p
        className={`text-[10px] sm:text-xs mt-1 font-semibold transition-opacity 
        ${!error ? "opacity-0" : "opacity-100"} text-red-500`}
      >
        {error}
      </p>
    </div>

    {/* Submit Button */}
    <button
      onClick={() => {
        if (isValidURL(url)) {
          if (custom && url) getCustomShortUrl();
          else getShortUrl();
        } else {
          setError("Enter a valid url");
        }
      }}
      className="w-full h-10 sm:h-11 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 
      hover:from-blue-600 hover:to-purple-700 text-white font-semibold 
      text-sm sm:text-base transition-all shadow-md hover:shadow-lg"
    >
      {loading ? <Loader /> : "Shorten Your URL"}
    </button>

    {/* Footer */}
    <p className="text-center text-[10px] sm:text-xs text-gray-500 mt-6">
      Built with <span className="text-blue-500 font-semibold">Fun</span> 🚀
    </p>
  </div>
);

};

export default UrlForm;
