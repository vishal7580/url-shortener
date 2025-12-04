import { AuthenticationError } from "../utils/appError.js"
import { vefifyToken } from "../utils/helper.js"

export const authMiddleware = async (req,res,next) => {
    const token = req.cookies.accessToken
    if(!token) throw new AuthenticationError('Unauthorised ')

    //token tampered
    const id = vefifyToken(token)
    if(!id) throw new AuthenticationError('Unauthorised')

    req.user = id
    next()
}