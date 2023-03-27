const userReducer = (user = {}, action) => {
  switch (action.type) {
    case "SIGNIN_USER":
      return {
        name: action.payLoad.name,
        email: action.payLoad.email,
      };
    case "SIGN_UP":
      return {
        name: action.payLoad.firstName + " " + action.payLoad.lastName,
        email: action.payLoad.email,
      };

    case "LOGOUT_USER":
      return {};
    default:
      return user;
  }
};

export default userReducer;
