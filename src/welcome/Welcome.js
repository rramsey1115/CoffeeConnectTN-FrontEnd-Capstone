import { useEffect, useState } from "react";
import { getUserById } from "../services/userServices";
import "./Welcome.css";
import welcomeVideo from "./welcomeVideo.mp4";
import { useNavigate } from "react-router-dom";

export const Welcome = ({ currentUser }) => {
  // const [user, setUser] = useState({});

  const navigate = useNavigate();

  // useEffect(() => {
  //   getUserById(currentUser.id).then((res) => setUser(res[0]));
  // }, [currentUser]);

  return (
    <div className="welcome">
      <div className="welcome-header">
        {currentUser.admin ? (
          <h1 className="welcome-title">
            Coffee Connect
            <br />
            Administrator Mode
          </h1>
        ) : (
          <h1 className="welcome-title">Welcome to Coffee Connect</h1>
        )}
      </div>
      <div className="welcome-body">
        <video autoPlay loop muted className="welcome-video">
          <source src={welcomeVideo} type="video/mp4" />
        </video>
      </div>
      <div className="welcome-footer">
        <button
          onClick={(e) => navigate("/discover")}
          id="discover-button"
          className="button"
        >
          Discover Nashville
        </button>
        <button
          onClick={(e) => navigate("/discover")}
          id="discover-button"
          className="button"
        >
          Discover Knoxville
        </button>
        <button
          onClick={(e) => navigate("/discover")}
          id="discover-button"
          className="button"
        >
          Discover Chattanooga
        </button>
        <button
          onClick={(e) => navigate("/discover")}
          id="discover-button"
          className="button"
        >
          Discover Memphis
        </button>
      </div>
    </div>
  );
};
