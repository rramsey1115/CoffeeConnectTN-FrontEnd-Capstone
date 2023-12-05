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
  const [isLoaded, setIsLoaded] = useState(false);

  const getAndSetUser = () => {
    userId
      ? getUserById(userId).then((data) => setUser(data[0]))
      : getUserById(currentUser.id).then((data1) => setUser(data1[0]));
  };

  const getAndSetFavorites = () => {
    getFavoritesByUserId(user?.id).then((data) => setFavorites(data));
  };
  
  useEffect(() => {
    getAndSetUser();
  }, [userId]);

  useEffect(() => {
    getAndSetFavorites();
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, [user]);

  return (isLoaded ? (favorites.length > 0 ? (
    <section className="favorites-container">
      <div className="favorites-header profile-details-header">
        <h1 id="your-favorites-title" className="profile-details-title">Favorites</h1>
      </div>
      <div className="favorites-list">
        {favorites.map((favObj) => {
          return <FavoriteCard key={favObj.id} favObj={favObj} currentUser={currentUser} getAndSetFavorites={getAndSetFavorites}/>;
        })}
      </div>
    </section>
  ) : (
    <section className="favorites-container">
      <div className="favorites-header">
        <h1>{user?.name} has not favorited any shops yet</h1>
      </div>
    </section>
  )) : (<div> </div>))
};