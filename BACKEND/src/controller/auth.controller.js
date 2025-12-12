import { cookieOptions } from "../config/config.js";
import auth from "../services/auth.service.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { user, token } = await auth.register(name, email, password);
  res.cookie('accessToken',token,cookieOptions)
  res.status(201).json({ user, message: 'registered successfully' });
};

const loginUser = async (req,res)=> {
    const {email,password} = req.body
    const {user,token} = await auth.login(email,password)
    res.cookie('accessToken',token,cookieOptions)
    res.status(200).json({ user, message: 'login successfully' });
}

const logoutUser =  (req,res) => {
    res.clearCookie('accessToken')
    res.status(200).json({message: 'logout successfully'})
}
const getUser = (req,res)=> {
    const userId = req.user
    res.status(200).json({user: userId})
}
export { registerUser,loginUser ,logoutUser,getUser};
