import React from "react";
import { useHistory } from "react-router-dom";
import "./home.css";
import homeimg from "../../images/To-do.jpg";
import apple from "../../assets/icons/apple.svg";
import play from "../../assets/icons/play.svg";

const Home = () => {
  const history = useHistory();

  const discoverHandler = () => {
    history.push("/auth");
  };

  return (
    <div className="homehead">
      <img className="homeIMG" src={homeimg} alt="img" />

      <div className="aboutUs">
        <h1> What we Provide</h1>
        <p>
          We offer a way to increase productivity, stopping you from forgetting
          things, helps prioritise tasks, manage tasks effectively, use time
          wisely and improve time management as well as workflow. One of the
          most important reasons you should use this app is that, it will help
          you stay organised. When you write all your tasks in a list, they seem
          more manageable. When you've got a clear outline of the tasks you've
          got to do and those you've completed, it helps you stay focused. While
          freeing up space in your mind for other more creative tasks.
        </p>
        <div className="discoverbtn">
          <buttton onClick={discoverHandler} className="homediscoverbtn">
            Discover More
          </buttton>
        </div>
        <div className="downloadbtn">
          <button className="playstore">
            <img className="brandicon" src={play} alt="PLAY" width={5}></img>
            <span className="brandtext">Download</span>
          </button>
          <button className="apple">
            <img className="brandicon" src={apple} alt="SVG" width={5}></img>
            <span className="brandtext">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
