import { useEffect, useState } from "react";
import { getCurrentUserById } from "../services/userServices";
import "./Welcome.css";
import welcomeVideo from "./welcomeVideo.mp4"

export const Welcome = ({ currentUser }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getCurrentUserById(currentUser.id).then((res) => setUser(res[0]));
  }, [currentUser]);

  return (
    <div className="welcome">
      <div className="welcome-header">
        <h1>Welcome to Coffee Connect {user?.name}</h1>
      </div>
      <div className="welcome-body">
        <video autoPlay muted className="welcome-video">
          <source src={welcomeVideo} type="video/mp4"/>
        </video>
      </div>
      <div className="welcome-footer">
        <h3>Button linked to discover goes here</h3>
      </div>
    </div>
  );
};
