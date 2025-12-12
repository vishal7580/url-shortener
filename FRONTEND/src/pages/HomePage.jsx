
import { useState } from 'react'
import UrlForm from '../components/UrlForm'
import ShortUrl from '../components/ShortUrl'
import { createShortUrl } from '../api/url.api'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';

const HomePage = () => {
  const [url,setUrl] = useState('')
  const [shortUrl,setShortUrl] = useState('')
  const [result, setResult] = useState(false)
  const [loading,setLoading] = useState(false)

  const userId = useSelector((state)=> state.auth.user)

  async function getShortUrl() {
    try {
      setLoading(true)
      const data = await createShortUrl(url,userId)
      data && toast.success('Short URl created!',{position: 'top-center'})
      setShortUrl(data)
      setResult(true)
    } catch {
      toast.error(`something went wrong!`,{position: 'top-center'})
    } finally{
      setLoading(false)
    }
  }
  if(!result)
   return <UrlForm setResult={setResult} loading={loading} setLoading={setLoading} url={url} setUrl={setUrl} getShortUrl={getShortUrl} setShortUrl={setShortUrl}/>
  else
   return <ShortUrl setResult={setResult} longUrl={url} setLongUrl={setUrl} shortUrl={shortUrl}/>
}

export default HomePage