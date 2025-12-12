import { toast } from "react-toastify"
import { deleteUserUrl } from "../api/url.api"

const SingleUrl = ({ url,updateClick,getUrls}) => {

  async function handleDelete() {
    try {
      await deleteUserUrl(url.short_url)
      toast.success('URL Deleted!',{position: "bottom-right"});
      await getUrls()
    } catch (error) {
      toast.error(error,{position: 'bottom-right'})
    }
  }
  function handleCopy(){
    navigator.clipboard.writeText(`${import.meta.env.VITE_REDIRECT_URL}${url.short_url}`)
    toast.success('Copied!',{position: "bottom-right"});
  }
return (
  <div className="w-full flex sm:flex-row sm:items-center sm:justify-between 
                  border border-gray-200 rounded-xl shadow-md hover:shadow-lg 
                  transition-all p-4 mb-3 bg-white gap-3 sm:gap-0">

    {/* Short URL */}
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`${import.meta.env.VITE_REDIRECT_URL}${url.short_url}`}
      className="font-semibold text-blue-600 hover:text-blue-800 truncate hover:underline
                 text-sm sm:text-base w-full sm:w-1/5"
      title={url.short_url}
      onClick={() => updateClick(url._id)}
    >
      {url.short_url}
    </a>

    {/* Click count */}
    <p className="text-gray-500 font-semibold text-xs sm:text-sm 
                    text-center w-full sm:w-1/6">
      {url.clicks} clicks
    </p>

    {/* Buttons */}
    <div className="flex gap-2 justify-start sm:justify-end w-full sm:w-auto">
      <button
        className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 
                   rounded-md text-xs sm:text-sm font-medium transition-shadow 
                   shadow-sm hover:shadow-md"
        onClick={handleCopy}
      >
        Copy
      </button>

      <button
        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white 
                   rounded-md text-xs sm:text-sm font-medium shadow-sm 
                   hover:shadow-md transition-all"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  </div>
);

}

export default SingleUrl
