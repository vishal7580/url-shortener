import { api } from "./axiosInstance"

export const loginUser = async (email,password) => {
    const response = await api.post('api/v1/auth/login',{email,password})
    return response.data
}
export const registerUser = async (name,email,password) => {
    const response = await api.post('api/v1/auth/register',{name,email,password})
    return response.data
}
export const logoutUser = async () => {
    const response = await api.get('api/v1/auth/logout')
    return response.data
}
export const checkAuth = async () => {
    const response = await api.get('api/v1/auth/me')
    return response.data
}