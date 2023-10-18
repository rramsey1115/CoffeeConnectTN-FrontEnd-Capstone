import { useEffect, useState } from "react";
import "./ShopCard.css";
import { StarRating } from "./StarRating";

export const ShopCard = ({ shop }) => {
  return (
    <div className="shop-card">
      <header className="shop-card-header">
        <h2>{shop.name}</h2>
      </header>
      <div className="shop-card-body">
        <StarRating shop={shop} />
        <img className="shop-card-img" src={shop.image_url} alt="coffee shop" />
        <h4>Address:</h4>
        <p>{shop.location?.display_address[0]}</p>
        <p>{shop.location?.display_address[1]}</p>
      </div>
    </div>
  );
};
