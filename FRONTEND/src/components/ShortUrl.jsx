import React, { useState } from "react";
import { saveUserUrl } from "../api/url.api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ShortUrl = ({ longUrl, setLongUrl, shortUrl, setResult }) => {
  const [saved, setSaved] = useState(false);
  const authenticated = useSelector((state) => state.auth.isAuthenticated);

  async function handleSave() {
    if(saved) return
    try {
       await saveUserUrl(shortUrl.split("/").at(-1))
         toast.success('URL saved successfully!',
            {
              position: "bottom-center",
            }
        );
      setSaved(true);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!',
        {
          position: "bottom-center",
        })
      setSaved(false);
    }
  }

  function handleCopy(){
    navigator.clipboard.writeText(shortUrl)
    toast.success('Copied!',{position: "bottom-right"});
  }
return (
  <div className="w-[90%] max-w-md p-6 sm:p-8 rounded-2xl border border-gray-200 bg-white shadow-lg mx-auto">
    
    {/* Title */}
    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800 tracking-wide">
      Your <span className="text-blue-600">Shortened</span> URL
    </h1>

    {/* Long URL */}
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor="longurl" className="text-xs sm:text-sm font-medium text-gray-700">
        Long URL
      </label>
      <input
        id="longurl"
        type="text"
        placeholder="Original URL"
        value={longUrl}
        readOnly
        className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 text-xs sm:text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>

    {/* Short URL */}
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor="shorturl" className="text-xs sm:text-sm font-medium text-gray-700">
        Short URL
      </label>
      <input
        id="shorturl"
        type="text"
        placeholder="Your short URL"
        value={shortUrl}
        readOnly
        className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 text-xs sm:text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>

    {/* Share & Copy Buttons */}
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <a
        href={`https://api.whatsapp.com/send?text=Here is your shortened URL! %0A ${shortUrl}`}
        target="_blank"
      >
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm px-4 py-3 rounded-md font-medium transition-shadow shadow-md hover:shadow-lg"
        >
          Share
        </button>
      </a>

      <button
        className=" bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm px-4 py-3 rounded-md font-medium transition-shadow shadow-md hover:shadow-lg"
        onClick={handleCopy}
      >
        Copy
      </button>
    </div>

    {/* Save & Shorten Another */}
    <div className="flex flex-col sm:flex-row gap-3">
      {authenticated && (
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xs sm:text-sm px-4 py-3 rounded-md font-medium transition-shadow shadow-md hover:shadow-lg"
        >
          {saved ? "Saved" : "Save URL"}
        </button>
      )}

      <button
        onClick={() => {
          setResult(false);
          setLongUrl("");
        }}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xs sm:text-sm px-4 py-3 rounded-md font-medium transition-shadow shadow-md hover:shadow-lg"
      >
        Shorten Another
      </button>
    </div>

    {/* Footer */}
    <p className="text-center text-[10px] sm:text-xs text-gray-500 mt-6">
      Built with <span className="text-blue-500 font-semibold">Fun</span> 🚀
    </p>

  </div>
);

};

export default ShortUrl;
