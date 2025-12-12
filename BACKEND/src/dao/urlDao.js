import UrlModel from '../model/Url.model.js'

//CREATING URL
const saveUrl = async (short_url,full_url,userId) => {
    const url = new UrlModel({short_url,full_url});
    if(userId) url.user = userId
    await url.save();
    return url;
};

// PERSIST USER URL
const saveUserUrl = async (id)=> {
   const result = await UrlModel.updateOne({short_url: id},{$unset:{createdAt: 1}},{new: true})
   return result.modifiedCount
}

//GET URL
const getShortUrl = async (id)=> {
    const url = await UrlModel.findOneAndUpdate({short_url: id},{$inc: {clicks: 1}},{new: true})
    return url.full_url
}
//DELETE USER URL
const deleteUserUrl = async (id) => {
    const result = await UrlModel.deleteOne({short_url: id})
    return result.deletedCount
}

//GET ALL USER URLS
const getAllUrls = async (userId) => {
    const urls = await UrlModel.find({user: userId})
    return urls
}
export {saveUrl,getShortUrl,getAllUrls,deleteUserUrl,saveUserUrl}