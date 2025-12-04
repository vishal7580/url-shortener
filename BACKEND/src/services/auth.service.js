import bcrypt from "bcryptjs";
import userDao from "../dao/userDao.js";
import {
  AuthenticationError,
  ConflictError,
  NotFoundError,
} from "../utils/appError.js";
import { signToken } from "../utils/helper.js";

const auth = {
  register: async (name, email, password) => {
    if (await userDao.findByEmail(email))
    throw new ConflictError("User Already Exists");
    const user = await userDao.createUser(name, email, password);

    const token = signToken({ user });
    if (!token) throw new AuthenticationError("Token creation failed");
    
    return { user, token };
  },
  login: async (email, password) => {
    const user = await userDao.findByEmail(email);
    if (!user) throw new NotFoundError();

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new AuthenticationError("Invalid Credentials");

    delete user.password;

    const token = signToken({ id: user._id });
    if (!token) throw new AuthenticationError();
    return { user, token };
  },
};
export default auth;
