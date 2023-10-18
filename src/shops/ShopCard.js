import "./ShopCard.css";
import { StarRating } from "./StarRating";

export const ShopCard = ({ shop }) => {
  return (
    <div className="shop-card">
      <div className="shop-card-header">
        <h2>{shop.name}</h2>
        <StarRating shop={shop} />
      </div>
      <div className="shop-card-body">
        <img className="shop-card-img" src={shop.image_url} alt="coffee shop" />
        <h4>Address:</h4>
        <p>{shop.location?.display_address[0]}</p>
        <p>{shop.location?.display_address[1]}</p>
      </div>
    </div>
  );
};
