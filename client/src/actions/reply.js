import * as api from "../api/index.js";

export const getComment = (id) => async (dispatch) => {
  try {
    const res = await api.getComment(id);
    console.log(res);
    dispatch({ type: "GET_COMMENT", payLoad: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = (data) => async (dispatch) => {
  try {
    const res = await api.addComment(data);
    const res2 = await api.getComment(data.id);
    dispatch({ type: "GET_COMMENT", payLoad: res2.data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (data) => async (dispatch) => {
  try {
    const res = await api.deleteComment(data);
    const res2 = await api.getComment(data.task_id);
    dispatch({ type: "GET_COMMENT", payLoad: res2.data });
  } catch (error) {
    console.log(error);
  }
};

export const editComment = (data) => async (dispatch) => {
  try {
    const res = await api.editComment(data);
    const res2 = await api.getComment(data.task_id);
    dispatch({ type: "GET_COMMENT", payLoad: res2.data });
  } catch (error) {
    console.log(error);
  }
};
