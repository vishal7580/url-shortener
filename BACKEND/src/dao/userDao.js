import User from "../model/user.model.js";

const userDao =  {
  createUser: async (name, email, password) => {
    return User.create({ name, email, password });
  },
  findByEmail: async (email) => {
    return await User.findOne({email}).lean()
  },

};

export default userDao