import * as api from "../api/index.js";
import { userList } from "./userList.js";

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    //store token in redux and localstorage
    dispatch({ type: "AUTH", payLoad: data?.token });

    //store user detail in userReducer
    dispatch({ type: "SIGNIN_USER", payLoad: data?.result });

    //Dispatch for userlist
    dispatch(userList(router));
  } catch (error) {
    dispatch({
      type: "SIGNIN_ERROR_MESSAGE",
      payLoad: error.response.data.message,
    });
  }
};

export const signup = (formData) => async (dispatch) => {
  try {
    //api call
    await api.signUp(formData);
  } catch (error) {
    dispatch({
      type: "SIGNUP_ERROR_MESSAGE",
      payLoad: error.response.data.message,
    });
  }
};

export const logOut = () => async (dispatch) => {
  //Local Storage Clear and redux auth
  dispatch({ type: "LOGOUT" });

  //clear userList
  dispatch({ type: "CLEAR_USERLIST" });

  //clear user detail
  dispatch({ type: "LOGOUT_USER" });

  //clear tasklist
  dispatch({ type: "LOGOUT_TASK" });

  //Reset Date
  dispatch({ type: "LOGOUT_DATE" });
};
