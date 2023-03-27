export const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("profile", JSON.stringify(action.payLoad));

      return {
        ...state,
        authData: action.payLoad,
        email: "",
        loading: true,
        errors: null,
      };

    case "CHANGE_PASSWORD":
      localStorage.setItem("profile", JSON.stringify(action.payLoad.token));
      return {
        ...state,
        authData: action.payLoad.token,
        email: action.payLoad.email,
        loading: false,
        errors: null,
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        authData: null,
        loading: null,
        errors: null,
        email: "",
      };

    default:
      return state;
  }
};
