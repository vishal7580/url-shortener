import { nanoid } from "nanoid";
import jsonwebtoken from "jsonwebtoken";

const generateNanoId = (length)=> {
    return nanoid(length)
}
const signToken = (payload) => {
    const token = jsonwebtoken.sign(payload,process.env.JWT_SECRET,{expiresIn: '1h'})
    return token;
}
const vefifyToken = (token)=> {
    const decode = jsonwebtoken.verify(token,process.env.JWT_SECRET)
    return decode.id
}
export {generateNanoId,signToken,vefifyToken}