import { api } from "./axiosInstance"


export const createShortUrl = async (url,userId)=> {
   const response = await api.post('/api/v1/create',{url,userId})
   return response.data
}

//creating this requires =>  userId
export const createCustomShortUrl = async(url,userId,slug)=> {
   const response = await api.post('/api/v1/create',{url,userId,slug})
   return response.data
}

export const getCurrentUserUrls = async(userId)=> {
   const response = await api.get(`/api/v1/urls/${userId}`)
   return response.data
}

export const deleteUserUrl = async (shortId) => {
   const response = await api.delete(`/api/v1/url/${shortId}`)
   return response.data
}
export const saveUserUrl = async (shortId) => {
   const response = await api.patch(`/api/v1/url/${shortId}`)
   return response.data
}


