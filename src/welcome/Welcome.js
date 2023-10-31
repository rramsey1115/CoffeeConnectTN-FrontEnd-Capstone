import { useEffect, useState } from "react";
import { getUserById } from "../services/userServices";
import "./Welcome.css";
import welcomeVideo from "./welcomeVideo.mp4";
import { useNavigate } from "react-router-dom";

export const Welcome = ({ currentUser }) => {
  const [searchCity, setSearchCity] = useState("Nashville");
  // const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleCitySelect = (cityName) => {
    setSearchCity(cityName).then(console.log("searchCity", searchCity));
  }

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
          onClick={(e) => handleCitySelect(e.target.value*1)}
          value="1"
          id="discover-button"
          className="button"
        >
          Nashville
        </button>
        <button
          onClick={(e) => navigate("/discover")}
          id="discover-button"
          className="button"
        >
          Knoxville
        </button>
        <button
          onClick={(e) => navigate("/discover")}
          id="discover-button"
          className="button"
        >
          Chattanooga
        </button>
        <button
          onClick={(e) => navigate("/discover")}
          id="discover-button"
          className="button"
        >
          Memphis
        </button>
      </div>
    </div>
  );
};
