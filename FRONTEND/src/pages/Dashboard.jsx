import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUserUrls } from "../api/url.api";
import Loader from "../components/Loader";
import SingleUrl from "../components/SingleUrl";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [urls, setUrls] = useState([]);
  const { user } = useSelector((state) => state.auth);

  function updateClick(clickedUrl_id) {
    //local updation of click state
    setUrls((prev) =>
      prev.map((url) =>
        url._id == clickedUrl_id ? { ...url, clicks: url.clicks + 1 } : url
      )
    );
  }

  async function getUrls() {
    setError(false);
    setLoading(true);
    try {
      const data = await getCurrentUserUrls(user);
      setUrls(data.urls); //if you use getUrls() directly in SingleUrl ,multiple clicks trigger async operations which can take time to reflect in ui (because of DB updates), so update ui locally
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (!user) return;
    getUrls();
  }, [user]);
  return (
    <div className=" border-blue-600 h-full w-full max-w-[1200px] mx-auto  px-10 py-4">
      <h1 className="text-2xl font-bold "> Saved Urls</h1>
      <div
        className="
          overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
 font-semibold pt-5 text-lg text-center flex flex-col  h-11/12 "
      >
        {loading ? (
          <div className="h-full flex justify-center items-center">
            <Loader />
          </div>
        ) : error ? (
          <div className="h-full flex justify-center items-center">
            {" "}
            Something Went Wrong
          </div>
        ) : urls.length > 0 ? (
          urls.map((url) => (
            <SingleUrl
              getUrls={getUrls}
              updateClick={updateClick}
              key={url._id}
              url={url}
            />
          ))
        ) : (
          <p className=" h-full flex justify-center items-center">
            {" "}
            No Saved URL's
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
