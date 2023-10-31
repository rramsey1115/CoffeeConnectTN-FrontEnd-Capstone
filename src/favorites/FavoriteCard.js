import { Link } from "react-router-dom";
import { StarRating } from "../shops/StarRating";
import { BsFillBookmarkFill } from "react-icons/bs";
import "./FavoritesList.css";
import { getFavoritesByUserId } from "../services/favServices";
import { useEffect, useState } from "react";

export const FavoriteCard = ({ favObj, currentUser }) => {
  const [currentUserFavorites, setCurrentUserFavorites] = useState([]);

  const getAndSetCurrentUserFavorites = () => {
    getFavoritesByUserId(currentUser.id).then((data) =>
      setCurrentUserFavorites(data)
    );
  };

  useEffect(() => {
    getAndSetCurrentUserFavorites();
  }, [currentUser]);

  return (
    <section className="favorite-card">
      <div className="fav-card-banner">
        <div className="name-favorite">
          <Link to={`/discover/${favObj.business?.id}`} className="name-link">
            <h2 id="fav-name">{favObj.business?.name}</h2>
          </Link>
          {currentUserFavorites.map((cuf) =>
            cuf.businessId === favObj.businessId ? (
              <BsFillBookmarkFill key={favObj.id} className="favorite-icon" />
            ) : (
             null
            )
          )}
        </div>
        <StarRating shop={favObj.business} />
      </div>
      <div className="fav-card-body">
        <Link to={`/discover/${favObj.business?.id}`} textDecoration="none">
          <img
            className="fav-card-img"
            src={favObj.business?.image_url}
            alt="coffee shop"
          />
        </Link>
      </div>
    </section>
  );
};
