import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

//Request Intercept
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("profile")
    )}`;
  }

  return req;
});

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error.response);
// });

//LOGIN & SIGNIN
export const signIn = (formData) => API.post("/user/login", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

//NEW TASK ADDDED
export const addTask = (newPost) => API.post("/tasks/addtask", newPost);

//USER LIST
export const userlist = () => API.get("/tasks/taskform");

//GET TASKS LIST
export const personalTask = (userDetail) =>
  API.post(`/tasks/personaltask/?page=${userDetail.page}`, userDetail);
export const assignedTask = (userDetail) =>
  API.post(`/tasks/assignedtask`, userDetail);
  // API.post(`/tasks/assignedtask`, userDetail);

export const assignTask = (userDetail) =>
  API.post(`/tasks/assigntask`, userDetail);

//TOGGLE TASK
export const toggleTask = (data) =>
  API.put(`/tasks/toggletask/${data.id}`, data);

//CHANGE TASK
export const changeTask = (data) =>
  API.put(`/tasks/todos/${data.id}`, { data: data.text });

//FORGET PASSWORD
export const forgetPassword = (data) => API.post(`/user/recover`, data);
export const changePassword = (data) => API.put(`/user/change`, data);

//COMMENTS
export const getComment = (id) => API.get(`/tasks/comments/${id}`)
export const addComment =(data) => API.post(`/tasks/${data.id}/comments`,data)
export const deleteComment =(data) => API.delete(`/tasks/${data.task_id}/comments/${data.comment_id}`,data)
export const editComment =(data)=> API.patch(`/tasks/${data.task_id}/comments/${data.comment_id}`,data)
