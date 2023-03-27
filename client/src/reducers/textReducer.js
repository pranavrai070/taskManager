export const textReducer = (text = null, action) => {
  switch (action.type) {
    case "SIGNIN_ERROR_MESSAGE":
      return action.payLoad;
    case "SIGNUP_ERROR_MESSAGE":
      return action.payLoad;
    default:
      return null;
  }
};
