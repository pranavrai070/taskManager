import * as api from "../api/index.js";

//NEW TASK ADDED
export const addTask = (post) => async (dispatch) => {
  try {
    //api call to put in DB
    await api.addTask(post);
  } catch (error) {
    console.log(error);
  }
};

//GET PERSONAL TASK
export const personalTask = (router, userDetail) => async (dispatch) => {
  try {
    router.push("/personaltask");
    dispatch({ type: "TOGGLE_TO_TRUE" });

    //api call
    const task = await api.personalTask(userDetail);

    //save to redux
    dispatch({ type: "PERSONAL_TASK", payLoad: task.data });
    dispatch({ type: "TOGGLE_TO_FALSE" });
  } catch (error) {
    console.log(error);
  }
};

//GET ASSIGNED TASK
export const assignedTask = (router, email) => async (dispatch) => {
  try {
    //api call
    const task = await api.assignedTask(email);

    //save to redux
    dispatch({ type: "ASSIGNED_TASK", payLoad: task.data });
    router.push("/assignedtask");
  } catch (error) {
    console.log(error);
  }
};

//GET ASSIGN TASK
export const assignTask = (router, email) => async (dispatch) => {
  try {
    //api call
    const task = await api.assignTask(email);

    //save to redux
    dispatch({ type: "ASSIGN_TASK", payLoad: task.data });
    router.push("/assigntask");
  } catch (error) {
    console.log(error);
  }
};

//TOGGLE TASK BETWEEN:ACTIVE,PENDING,DONE & DELETE
export const toggleTasks = (id, status) => async (dispatch) => {
  try {
    await api.toggleTask({ id: id, status: status });
    dispatch({ type: "TOGGLE", payLoad: { id: id, status: status } });
  } catch (error) {
    console.log(error);
  }
};

//TOGGLE TASK BETWEEN:ACTIVE,PENDING,DONE & DELETE
export const changeTask = (id, text) => async (dispatch) => {
  try {
    dispatch({ type: "EDIT_TASK", payLoad: { id: id, text: text } });
    await api.changeTask({ id: id, text: text });
  } catch (error) {
    console.log(error);
  }
};



 