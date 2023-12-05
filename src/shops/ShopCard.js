import { Link } from "react-router-dom";
import "./ShopCard.css";
import { StarRating } from "./StarRating";
import { useEffect, useState } from "react";
import { getFavoritesByUserId } from "../services/favServices";
import { BsFillBookmarkFill } from "react-icons/bs";

export const ShopCard = ({ shop, currentUser, searchCity }) => {
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getFavoritesByUserId(currentUser?.id).then((data) => setFavorites(data));
  }, [currentUser]);

  useEffect(() => {
    favorites.map((fav) =>
      shop.id === fav.businessId ? setIsFavorite(true) : null
    );
  }, [favorites, shop]);

  return  (
    <div className="shop-card">
      <div className="shop-card-banner">
        {isFavorite ? (
          <div className="name-favorite">
            <Link to={`/details/${shop?.businessId}`} className="name-link">
              <h2 id="fav-name">{shop?.name}</h2>
            </Link>
            <BsFillBookmarkFill id="icon" />
          </div>
        ) : (
          <Link to={`/details/${shop.id}`}>
            <h2 id="shop-name">{shop.name}</h2>
          </Link>
        )}

        <StarRating shop={shop}/>
      </div>
      <div className="shop-card-body">
        <Link to={`/details/${shop.id}`} textDecoration="none">
          <img
            className="shop-card-img"
            src={shop.image_url}
            alt="coffee shop"
          />
        </Link>
      </div>
    </div>
  );
};
