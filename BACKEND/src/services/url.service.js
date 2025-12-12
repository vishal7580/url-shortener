import { saveUrl } from "../dao/urlDao.js"
import { generateNanoId } from "../utils/helper.js"


const createUrlWithUser = async (fullUrl,userId,slug) => {
    const shortUrl = slug || generateNanoId(6)
    const url = await saveUrl(shortUrl,fullUrl,userId)
    return url.short_url
    
}
const createUrlWithOutUser = async (fullUrl) => {
    const shortUrl = generateNanoId(6)
    const url = await saveUrl(shortUrl,fullUrl)
    return url.short_url
}


export {createUrlWithUser,createUrlWithOutUser}