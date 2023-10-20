import { Link } from "react-router-dom";
import "./ShopCard.css";
import { StarRating } from "./StarRating";

export const ShopCard = ({ shop }) => {
  return (
    <div className="shop-card">
      <div className="shop-card-banner">
        <Link to={`/discover/${shop.id}`} ><h2 id="shop-name">{shop.name}</h2></Link>
        <StarRating shop={shop} />
      </div>
      <div className="shop-card-body">
      <Link to={`/discover/${shop.id}`} textDecoration="none"><img className="shop-card-img" src={shop.image_url} alt="coffee shop" /></Link>
        <div className="address-container">
          <h4 className="address">Address:</h4>
          <p className="address">{shop.location?.display_address[0]}</p>
          <p className="address">{shop.location?.display_address[1]}</p>
        </div>
      </div>
    </div>
  );
};
