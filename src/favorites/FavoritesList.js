import { useEffect } from "react";
import { useState } from "react";
import { getFavoritesByUserId } from "../services/favServices";
import { getUserById } from "../services/userServices";
import { ShopCard } from "../shops/ShopCard";

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
    getFavoritesByUserId(currentUser.id).then((data) => console.log("favorites",data));
  }, [currentUser]);


  return (
    <section className="favorites-container">
      <div className="favorites-header">
        <h1>{user?.name}'s Favorite Coffee Shops</h1>
      </div>
      <div className="favorites-list">
        {favorites.map((shop) => { return <ShopCard key={shop.id} shop={shop}/>})}
      </div>
    </section>
  );
};
