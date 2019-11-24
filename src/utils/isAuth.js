const isAuth = (permission, authName) => {
  let isPass = false;
  if (permission) {
    if (Array.isArray(authName)) {
      permission.forEach(item => {
        if (authName.join().includes(item)) {
          isPass = true;
        }
      });
    } else {
      permission.forEach(item => {
        if (authName === item) {
          isPass = true;
        }
      });
    }
  }
  return isPass;
};

export default isAuth;
