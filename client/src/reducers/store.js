import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { tasksReducer } from "./tasksReducer";
import { authReducer } from "./authReducer";
import { tabReducer } from "./tabReducer";
import dateReducer from "./dateReducer";
import userReducer from "./userReducer";
import userListReducer from "./userListReducer";
import { textReducer } from "./textReducer";
import loaderReducer from "./loaderReducer";
import notificationReducer from "./notificationReducer";
import commentReducer from "./commentReducer";
import taskDetailReducer from "./taskDetailReducer";
import showNotification from "./showNotification";

const reducer = combineReducers({
  todos: tasksReducer,
  currentTab: tabReducer,
  user: userReducer,
  date: dateReducer,
  userList: userListReducer,
  text: textReducer,
  auth: authReducer,
  loader:loaderReducer,
  notification: notificationReducer,
  comment:commentReducer,
  taskDetail : taskDetailReducer,
  showNotification:showNotification
});

function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const middleware = [thunk];

const store = createStore(
  reducer,
  loadFromLocalStorage(),
  composeWithDevTools(applyMiddleware(...middleware))
);

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
