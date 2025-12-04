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
    <div className="w-full flex items-center justify-between border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all p-4 mb-3 bg-white">
      
      {/* Left section - Short URL */}
      {/* kdlfj */}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`${import.meta.env.VITE_REDIRECT_URL}${url.short_url}`}
        className="font-semibold ml-3 text-left w-1/5 text-blue-600 hover:text-blue-800 truncate hover:underline transition-colors"
        title={url.short_url} // shows full URL on hover
        onClick={()=> updateClick(url._id)}
      >
        {url.short_url}
      </a>

      {/* Middle section - Clicks */}
      <div className="text-gray-500 text-sm w-1/6 font-semibold text-center">{url.clicks} clicks</div>

      {/* Right section - Buttons */}
      <div className="flex gap-2 justify-end">
        <button className="px-4 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-sm font-medium transition-shadow shadow-sm hover:shadow-md"
        onClick={handleCopy}
        >
          Copy
        </button>
        <button className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-all cursor-pointer"
        onClick={handleDelete}
        >
          Delete
        </button>
      </div>

    </div>
  )
}

export default SingleUrl
