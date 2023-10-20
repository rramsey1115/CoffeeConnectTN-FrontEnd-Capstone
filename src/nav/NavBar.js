import { Link } from "react-router-dom";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="/">Home</Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/discover">Discover</Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/favorites">Favorites</Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/profile">Profile</Link>
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
  );
};
