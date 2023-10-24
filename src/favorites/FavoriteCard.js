import { Link } from "react-router-dom";
import { StarRating } from "../shops/StarRating";
import "./FavoritesList.css";

export const FavoriteCard = ({ favObj }) => {
  return (
    <section className="favorite-card">
      <div className="fav-card-banner">
        <Link to={`/discover/${favObj.business?.id}`}>
          <h2 id="fav-name">{favObj.business?.name}</h2>
        </Link>
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