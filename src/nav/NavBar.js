import { Link } from "react-router-dom";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
// import BlackTanLogo from "../graphics/BlackTan_Logo.png"
import BlackWhiteLogo from "../graphics/BlackWhite_Logo.png"

export const NavBar = ({ currentUser }) => {
  const navigate = useNavigate();
  const [menuClicked, setMenuClicked] = useState(false);

  return (
    <div id="navar" className={menuClicked ? "navbar active" : "navbar hidden"}>
      <ul>
        <li className="navbar-item" onClick={(e) => setMenuClicked(false)}>
          <Link className="navbar-link" to="/">
            Home
          </Link>
        </li>
        <li className="navbar-item" onClick={(e) => setMenuClicked(false)}>
          <Link className="navbar-link" to="/discover">
            Discover
          </Link>
        </li>
        <li className="navbar-item" onClick={(e) => setMenuClicked(false)}>
          <Link className="navbar-link" to="/favorites">
            Favorites
          </Link>
        </li>
        <li className="navbar-item" onClick={(e) => setMenuClicked(false)}>
          <Link className="navbar-link" to={`/profile/${currentUser.id}`}>
            Profile
          </Link>
        </li>
        {localStorage.getItem("coffee_user") ? (
          <li className="navbar-item">
            <Link
              className="navbar-link"
              to=""
              onClick={() => {
                localStorage.removeItem("coffee_user");
                navigate("/", { replace: true });
              }}
            >
              Logout
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
      <div id="mobile">
        <img id="navbar-logo" className="navbar-logo" src={BlackWhiteLogo} alt="coffee connect text logo"/>
        {menuClicked ? (
          <FaTimes
            className="fa fa-bars"
            onClick={(e) => setMenuClicked(false)}
          />
        ) : (
          <FaBars
            className="fa fa-bars"
            onClick={(e) => setMenuClicked(true)}
          />
        )}
      </div>
    </div>
  );
};
