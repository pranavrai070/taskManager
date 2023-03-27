import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import menu from "../../assets/icons/menu.svg";
import cross from "../../assets/icons/cross.svg";
import bell from "../../assets/icons/bell.svg";

import decode from "jwt-decode";
import "./headers.css";
import { assignedTask, assignTask, personalTask } from "../../actions/tasks";
import { logOut } from "../../actions/auth";
import mmLogo from "../../images/logoMM.png";
import { userList } from "../../actions/userList";
import Notification from "../Notification/Notification";

import { io } from "socket.io-client";

const Headers = ({setShowBox}) => {
  // const [notification, setNotification] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const username = useSelector((state) => state.user.name);
  const data = {
    email: useSelector((state) => state.user.email),
    date: useSelector((state) => state.date),
    status:'pending',
    page: 1,
  };
  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [socket, setSocket] = useState();
  const msg= useSelector(state=>state.notification)

  

  // // // Making Socket Connection And Closing
  // useEffect(() => {
    
  //   //Open Connection
  //   const socketServer = io("http://192.168.0.34:5000");
  //   console.log("socketserver pbj :", socketServer);

  //   setSocket(socketServer);
  //   // socketServer && socketServer.emit("a",{a:"hello"})

  //   //data sent

  //   //close connection on unmount of component
  //   return () => {
  //     socketServer.disconnect();
  //   };
  // }, []);

  //load notification on login
  // useEffect(() => {
  //   if (socket === null) return;

  //   socket &&
  //     socket.once("load-notification", (list) => {
  //       dispatch({ type: "GET_ONCE", payload: list });
  //     });
  // }, []);

  // // GET NEW NOTIFICATION DURING SESSION
  // useEffect(() => {
  //   if (socket === null) return;
  //   socket &&
  //     socket.on("notification", (list) => {
  //       console.log("getnotify");
  //       dispatch({ type: "GET_NEW", payload: list });
  //     });

  //   return () => {
  //     socket && socket.off("getNotification");
  //   };
  // }, [socket]);

  //ON TASK FORM CLICK
  const taskFormHandler = () => {
    dispatch(userList(history));
  };

  //ON PERSONAL TASK CLICK
  const personalTaskHandler = () => {
    dispatch(personalTask(history, data));
    dispatch({type:"PENDING"})
  };

  //ON ASSIGN TASK CLICK
  const assignTaskHandler = () => {
    dispatch(assignTask(history, data));
    dispatch({type:"PENDING"})

  };

  //ON ASSIGNED TASK CLICK
  const assignedTaskHandler = () => {
    dispatch(assignedTask(history, data));
    dispatch({type:"PENDING"})

  };

  //LOGOUT
  const logout = () => {
    dispatch(logOut());
    history.push("/auth");
    setUser(null);
  };

  //SIGN IN BUTTON
  const signInHandler = () => {
    history.push("/auth");
  };

  useEffect(() => {
    const token = user;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  function showMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.style.right = "0";
    setTimeout(() => (navLinks.style.right = "-200px"), 4000);
  }

  function hideMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.style.right = "-200px";
  }

  const show = ()=>{
    dispatch({type:"CHANGE"})
  }

//   var box  = document.getElementById('box');
// var down = false;


// function toggleNotifi(){
// 	if (down) {
// 		box.style.height  = '0px';
// 		box.style.opacity = 0;
// 		down = false;
// 	}else {
// 		box.style.height  = '510px';
//     box.style.width = '400px'
// 		box.style.opacity = 1;
//     box.style.zIndex=2;
//     down = true;
// 	}
// }

 

 


  return (
    <section className="sub-header">
      <nav style={{ position: "relative" }}>
        <img className="logo" src={mmLogo} alt="MetaMix" />
        <p className="title">To Do</p>


       


        <div className="nav-links" id="navLinks">
          <button className="hideBtn" onClick={hideMenu}>
            <img className="crossicon" src={cross} alt="cross"></img>
          </button>
          <ul>
            {user && loading ? (
              <>
                <li>
                  <button
                    className="headerBtn A"
                    href="/taskform"
                    style={{
                      fontWeight:
                        location.pathname === "/taskform" ? "bold" : "",
                    }}
                    onClick={taskFormHandler}
                  >
                    Task Form
                  </button>
                </li>
                <li>
                  <button
                    className="headerBtn A"
                    href="/personaltask"
                    style={{
                      fontWeight:
                        location.pathname === "/personaltask" ? "bold" : "",
                    }}
                    onClick={personalTaskHandler}
                  >
                    Personal Task
                  </button>
                </li>
                <li>
                  <button
                    className="headerBtn A"
                    href="/assignedtask"
                    style={{
                      fontWeight:
                        location.pathname === "/assignedtask" ? "bold" : "",
                    }}
                    onClick={assignedTaskHandler}
                  >
                    Task for Me
                  </button>
                </li>
                <li>
                  <button
                    className="headerBtn A"
                    href="/assigntask"
                    style={{
                      fontWeight:
                        location.pathname === "/assigntask" ? "bold" : "",
                    }}
                    onClick={assignTaskHandler}
                  >
                    Task for Other
                  </button>
                </li>
                <li>
                  {/* <button
                    className="headerBtn A"
                    onClick={show}
                    // onClick={toggleNotifi}
                    // onClose={() => setNotification(false)}
                  > */}
                    {/* Notification */}
                    <img className="bellicon" src={bell} alt="bell" onClick={show}></img>
                    <div class="icon" onClick={show}/>
                  {/* </button> */}
                </li>
                <li className="username">
                  <p>{username}</p>
                </li>
              </>
            ) : null}
            {user && loading ? (
              <>
                {" "}
                <button className="OutBtn" onClick={logout}>
                  Log Out
                </button>

                {/* <button onClick={darkFunction}>Switch mode</button> */}
              </>
            ) : (
              <>
                {" "}
                <button onClick={signInHandler} className="InBtn">
                  Sign In
                </button>
              </>
            )}
          </ul>
        </div>

        {/* {notification && <Notification  data={msg} style={{ position: "absolute" }} />} */}

        <button className="showBtn" onClick={showMenu}>
          <img className="menuicon" src={menu} alt="menu"></img>
        </button>
      </nav>
    </section>
  );
};

export default Headers;
