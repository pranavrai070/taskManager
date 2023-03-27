import React from "react";
import NotificationItem from "./NotificationItem";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import "./Notification.css"

const Notification = ({ data }) => {
  return (
    // <div className="Notif_container">
    <div id='box'>
      <h1 className="nf_heading">Notification</h1>
      <hr></hr>
      <div>
        <ul className="abc">
          {/* {data.map((item) => {
            <NotificationItem item={item} />;
          })} */}
          <li><p id="nfMessages"> Go to hell Go to hell Go to hell Go to hell Go to hell 
          Go to hell Go to hellGo to hell Go to hell Go to hell Go to hell 
          Go to hell Go to hell Go to hell Go to hellGo to hell Go to hell Go to hell Go to hell Go to hell Go to hell 
           Go to hell Go to hell Go to hell Go to hell 
          Go to hell Go to hellGo to hell Go to hell Go to hell Go to hell 
          Go to hell G</p></li>
          <li>Gssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss </li>
          <li>Go to hell</li>
          <li>Go to hell</li>
          <li><p id="nfMessages"> Go to hell Go to hell Go to hell Go to hell Go to hell 
          Go to hell Go to hellGo to hell Go to hell Go to hell Go to hell 
          Go to hell Go to hell Go to hell Go to hellGo to hell Go to hell Go to hell Go to hell Go to hell Go to hell 
           Go to hell Go to hell Go to hell Go to hell 
          Go to hell Go to hellGo to hell Go to hell Go to hell Go to hell 
          Go to hell G</p></li>
          <li>Gssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss </li>
          <li>Go to hell</li>
          <li>Go to hell</li>

        </ul>
      </div>
    </div>
    //  </div>
  );
};

export default Notification;
