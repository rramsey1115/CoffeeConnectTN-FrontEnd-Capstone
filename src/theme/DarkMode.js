import React from "react";
import { MdModeNight, MdLightMode } from "react-icons/md";
import "./DarkMode.css";

export const DarkMode = () => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  const selectedTheme = localStorage.getItem("selectedTheme");

  if (selectedTheme === "light") {
    setLightMode();
  };

  const toggleTheme = (e) => {
    e.target.checked ? setDarkMode() : setLightMode();
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        defaultChecked={selectedTheme === 'dark'}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <MdModeNight className="mode-icon" id="moon" />
        <MdLightMode className="mode-icon" id="sun" />
      </label>
    </div>
  );
};
