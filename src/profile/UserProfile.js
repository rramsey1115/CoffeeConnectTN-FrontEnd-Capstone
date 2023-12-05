import { useEffect, useState } from "react";
import {
  deleteUserByUserId,
  getUserWithPostsById,
} from "../services/userServices";
import "./UserProfile.css";
import { useNavigate, useParams } from "react-router-dom";
import { FavoritesList } from "../favorites/FavoritesList";
import { Recommendations } from "./Recommendations";

export const UserProfile = ({ currentUser }) => {
  const userId = useParams().userId;
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getUserWithPostsById(userId * 1).then((data) => setUser(data[0]));
  }, [userId, currentUser]);

  const handleDelete = (userId) => {
    deleteUserByUserId(userId).then(navigate("/discover"));
  };

  return (
    <div className="profile-container">
      <section className="profile-about">
        <div className="profile-left">
          <h1 id="profile-title">{user?.name}</h1>
          <img src={user?.picture} alt="user" id="profile-picture" />
        </div>
        <div className="profile-right">
          <h2>About</h2>
          <p id="about-paragraph">{user?.about}</p>
          <div className="preferences">
            <br />
            <h2 id="preferences-title">Preferences</h2>
            <p>{user.coffeePreference?.name} Coffees</p>
            <p>{user.atmospherePreference?.name} Atmospheres</p>
          </div>
          {currentUser.admin && userId > 1 ? (
            <>
              <button
                className="button"
                id="delete-profile-button"
                onClick={(e) => {
                  handleDelete(user.id);
                }}
              >
                Delete Profile
              </button>
              <br />
              <button
                className="button"
                id="edit-profile-button"
                onClick={(e) => navigate("/editProfile")}
              >
                Edit Profile
              </button>
            </>
          ) : user.id === currentUser.id ? (
            <button
              className="button"
              id="edit-profile-button"
              onClick={(e) => navigate("/editProfile")}
            >
              Edit Profile
            </button>
          ) : (
            ""
          )}
        </div>
      </section>
      <section className="profile-favorites">
        <div className="profile-favorites-list">
          <FavoritesList currentUser={currentUser} />
        </div>
      </section>
      <section className="profile-recs">
        <div className="profile-recs-list">
          {currentUser.id == userId ? <Recommendations user={user} /> : ""}
        </div>
      </section>
    </div>
  );
};
