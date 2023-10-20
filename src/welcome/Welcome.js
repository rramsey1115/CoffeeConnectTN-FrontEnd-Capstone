import { useEffect, useState } from "react";
import { getUserById } from "../services/userServices";
import "./Welcome.css";
import welcomeVideo from "./welcomeVideo.mp4"

export const Welcome = ({ currentUser }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserById(currentUser.id).then((res) => setUser(res[0]));
  }, [currentUser]);

  return (
    <div className="welcome">
      <div className="welcome-header">
        {currentUser.admin ? <h1>Coffee Connect<br/>Administrator Mode</h1> : <h1>Welcome to Coffee Connet</h1>}
      </div>
      <div className="welcome-body">
        <video autoPlay loop muted className="welcome-video">
          <source src={welcomeVideo} type="video/mp4"/>
        </video>
      </div>
      <div className="welcome-footer">
        <button className="discover-button">Nashville</button>
        <button className="discover-button">Chattanooga</button>
        <button className="discover-button">Knoxville</button>
        <button className="discover-button">Memphis</button>
        <button className="discover-button">Cookeville</button>
      </div>
    </div>
  );
};
