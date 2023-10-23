import { useEffect, useState } from "react";
import { getUserById } from "../services/userServices";
import "./UserProfile.css";

export const UserProfile = ({ currentUser }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserById(currentUser?.id).then((data) => setUser(data[0]));
  }, [currentUser]);

  return (
    <section className="profile-container">
      <div className="profile-header">
        <h1>{user?.name} </h1>
        <img src={user?.picture} alt="user" id="profile-picture" />
      </div>
    </section>
  );
};
