import { deleteUserUrl, getAllUrls, getShortUrl, saveUserUrl } from "../dao/urlDao.js"
import { createUrlWithOutUser, createUrlWithUser } from "../services/url.service.js"
import AppError, { ValidationError } from "../utils/appError.js";

const createShortUrl = async (req,res) => {
    const {url,slug,userId} = req.body
    let shortUrl;
    if(!url) throw new ValidationError()
    if(userId)
        shortUrl = await createUrlWithUser(url,userId,slug)    
    else
        shortUrl = await createUrlWithOutUser(url)
    
    res.send(process.env.APP_URL+'/api/v1/'+shortUrl)
}

//Controller ->  Dao layer directly
const persistUrl = async (req,res)=> {
    const {id} = req.params
    if(!id) throw new AppError('URL Id is required',400)
    const saved = await saveUserUrl(id)
    if(!saved) throw new AppError('Saving Url failed!',400)
    res.status(200).json({success: true,message: 'Url saved!'})

}
const getUserUrls = async (req,res) => {
    const {userId} = req.params
    if(!userId) throw new AppError('UserId is required!',400)
    const urls = await getAllUrls(userId)
    res.status(200).json({urls})
}
const redirectFromUrl = async (req,res)=> {
    const {id} = req.params
    if(!id) throw new AppError('UserId is required!',400)
    const fullUrl = await getShortUrl(id)
    res.redirect(fullUrl)
}
const deleteUrl = async(req,res) => {
    const{id} = req.params
    if(!id) throw new AppError('deletion failed!',400)
    const deleted = await deleteUserUrl(id)
    if(!deleted) throw new AppError('deletion failed!',400)
    res.status(200).json({success: true,message: 'deleted!'})
}
export {createShortUrl,redirectFromUrl,getUserUrls,deleteUrl,persistUrl}