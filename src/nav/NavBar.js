import { Link } from "react-router-dom";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

export const NavBar = ({ currentUser }) => {
  const navigate = useNavigate();
  const [menuClicked, setMenuClicked] = useState(false);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    const localCityObj = localStorage.getItem("coffee_searchCity");
    const cityString = JSON.parse(localCityObj);
    setCityName(cityString.cityName);
  }, []);

  return (
    <div id="navar" className={menuClicked ? "navbar active" : "navbar hidden"}>
      <ul>
        <li className="navbar-item" onClick={(e) => setMenuClicked(false)}>
          <Link className="navbar-link" to="/">
            Home
          </Link>
        </li>
        <li className="navbar-item" onClick={(e) => setMenuClicked(false)}>
          <Link className="navbar-link" to={`/discover/${cityName}`}>
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
        <h2 id='mobile-title'>CCTN</h2>
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
