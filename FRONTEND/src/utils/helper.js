
export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

export const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regex.test(password);
};


export const isValidURL = (url) =>{
    try {
      new URL(url);
      return true;
    } catch  {
      return false;
    }
  }