import React, { useState } from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import Headers from "./components/Headers/headers";
import AddTask from "./pages/AddTask";
import AssignedTask from "./pages/AssignedTask";
import AssignTask from "./pages/AssignTask";
import PersonalTask from "./pages/PersonalTask";
import { Error } from "./components/Error/Error";

import Home from "./components/Home/Home";
import SignIn from "./components/Auth/Signin/Signin";
import SignUp from "./components/Auth/Signup/signup";
import { useSelector } from "react-redux";
import ForgetPassword from "./components/Change Password/ForgetPassword";
import NewPassword from "./components/Change Password/NewPassword";
import Notification from "./components/Notification/Notification";

const App = () => {

  // const [showBox,setShowBox] = useState(false)
  var showNotification = useSelector(state=>state.showNotification)
  var user = useSelector((state) => state.auth.authData);
  var email = useSelector((state) => state.auth.email);

  return (
    <BrowserRouter>
      { showNotification && <Notification/>}
      <Headers />
      <Switch>
        <Route
          path="/"
          exact
          component={() =>
            user && email === "" ? <Redirect to="/tasks" /> : <Home />
          }
        />

        <Route
          path="/auth"
          exact
          component={() =>
            user && email === "" ? <Redirect to="/tasks" /> : <SignIn />
          }
        />
        <Route
          path="/signup"
          exact
          component={() =>
            user && email === "" ? <Redirect to="/tasks" /> : <SignUp />
          }
        />
        <Route
          path="/forgetpassword"
          exact
          component={() =>
            user && email === "" ? <Redirect to="/tasks" /> : <ForgetPassword />
          }
        />
        <Route
          path="/newpassword"
          exact
          component={() =>
            user && email === "" ? (
              <Redirect to="/tasks" />
            ) : user ? (
              <NewPassword />
            ) : (
              <Redirect to="/auth" />
            )
          }
        />

        <Route
          path="/tasks"
          exact
          component={() =>
            !(user && email === "") ? <Redirect to="/auth" /> : <AddTask />
          }
        />
        <Route
          path="/personaltask"
          exact
          component={() =>
            !(user && email === "") ? <Redirect to="/auth" /> : <PersonalTask />
          }
        />
        <Route
          path="/assigntask"
          exact
          component={() =>
            !(user && email === "") ? <Redirect to="/auth" /> : <AssignTask />
          }
        />
        <Route
          path="/assignedtask"
          exact
          component={() =>
            !(user && email === "") ? <Redirect to="/auth" /> : <AssignedTask />
          }
        />
        <Route path="*" exact component={Error} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
