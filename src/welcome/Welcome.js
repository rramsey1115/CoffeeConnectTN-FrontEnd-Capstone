import { useEffect, useState } from "react";
// import { getUserById } from "../services/userServices";
import "./Welcome.css";
import welcomeVideo from "./welcomeVideo.mp4";
import { useNavigate } from "react-router-dom";

export const Welcome = ({ currentUser }) => {
  const navigate = useNavigate();

  const handleCitySelect = (cityName) => {
    localStorage.setItem(
      "coffee_searchCity",
      JSON.stringify({
        cityName: cityName,
      })
    );
    setTimeout(navigate(`/discover/${cityName}`), 5000);
  };

  return (
    <div className="welcome">
      <div className="welcome-header">
        {currentUser.admin ? (
          <h1 className="welcome-title">
            Coffee Connect TN
            <br />
            Administrator
          </h1>
        ) : (
          <h1 className="welcome-title">Welcome to Coffee Connect TN</h1>
        )}
      </div>
      <div className="welcome-body">
        <video autoPlay loop muted className="welcome-video">
          <source src={welcomeVideo} type="video/mp4" />
        </video>
      </div>
      <div className="welcome-footer">
        <button
          onClick={(e) => {
            handleCitySelect(e.target.value);
            
          }}
          value="Nashville"
          id="discover-button"
          className="button"
        >
          Nashville
        </button>
        <button
          onClick={(e) => {
            handleCitySelect(e.target.value);
            // navigate(`/discover/${e.target.value}`);
          }}
          value="Knoxville"
          id="discover-button"
          className="button"
        >
          Knoxville
        </button>
        <button
          onClick={(e) => {
            handleCitySelect(e.target.value);
            // navigate(`/discover/${e.target.value}`);
          }}
          value="Chattanooga"
          id="discover-button"
          className="button"
        >
          Chattanooga
        </button>
        <button
          onClick={(e) => {
            handleCitySelect(e.target.value);
            // navigate(`/discover/${e.target.value}`);
          }}
          value="Memphis"
          id="discover-button"
          className="button"
        >
          Memphis
        </button>
        <button
          onClick={(e) => {
            handleCitySelect(e.target.value);
            // navigate(`/discover/${e.target.value}`);
          }}
          value="Cookeville"
          id="discover-button"
          className="button"
        >
          Cookeville
        </button>
      </div>
    </div>
  );
};
