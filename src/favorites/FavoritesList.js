import { useEffect } from "react";
import { useState } from "react";
import { getFavoritesByUserId } from "../services/favServices";
import { getUserById } from "../services/userServices";
import { FavoriteCard } from "./FavoriteCard";
import { useParams } from "react-router-dom";

export const FavoritesList = ({ currentUser }) => {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState({});
  const { userId } = useParams();

  const getAndSetUser = () => {
    userId
      ? getUserById(userId).then((data) => setUser(data[0]))
      : getUserById(currentUser?.id).then((data1) => setUser(data1[0]));
  };

  useEffect(() => {
    getAndSetUser();
  }, [currentUser]);

  const getAndSetFavorites = () => {
    getFavoritesByUserId(user?.id).then((data) => setFavorites(data));
  };

  useEffect(() => {
    getAndSetFavorites();
  }, [user]);

  return favorites.length > 0 ? (
    <section className="favorites-container">
      <div className="favorites-header">
        <h1>Your Favorites</h1>
      </div>
      <div className="favorites-list">
        {favorites.map((favObj) => {
          return <FavoriteCard key={favObj.id} favObj={favObj} />;
        })}
      </div>
    </section>
  ) : (
    <section className="favorites-container">
      <div className="favorites-header">
        <h1>{user?.name} has not favorited any shops yet</h1>
      </div>
    </section>
  );
};
