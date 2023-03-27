import * as api from "../api/index.js";

export const userList = (router) => async (dispatch) => {
  try {
    const { data } = await api.userlist();

    dispatch({ type: "USER_LIST", payLoad: data });
    router.push("/tasks");
  } catch (error) {
    console.log(error);
  }
};
