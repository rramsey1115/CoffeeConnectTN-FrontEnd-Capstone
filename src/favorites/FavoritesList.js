import { useEffect } from "react";
import { useState } from "react";
import { getFavoritesByUserId } from "../services/favServices";
import { getUserById } from "../services/userServices";
import { FavoriteCard } from "./FavoriteCard";

export const FavoritesList = ({ currentUser }) => {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState({});

  const getAndSetUser = () => {
    getUserById(currentUser.id).then((data) => setUser(data[0]));
  };

  useEffect(() => {
    getAndSetUser();
  }, [currentUser]);

  useEffect(() => {
    getFavoritesByUserId(currentUser.id).then((data) => setFavorites(data));
  }, [currentUser]);

  return (
    <section className="favorites-container">
      <div className="favorites-header">
        <h1>{user?.name}'s Favorite Coffee Shops</h1>
      </div>
      <div className="favorites-list">
        {favorites.map((favObj) => {
          return <FavoriteCard key={favObj.id} favObj={favObj} />;
        })}
      </div>
    </section>
  );
};
