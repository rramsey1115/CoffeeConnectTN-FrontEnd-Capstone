import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShopById } from "../services/shopServices";
import { PostList } from "../posts/PostList";
import { StarRating } from "./StarRating";
import "./ShopDetails.css";

export const ShopDetails = ({ currentUser }) => {
  const id = useParams().shopId;
  const [currentShop, setCurrentShop] = useState({});

  useEffect(() => {
    getShopById(id).then((response) => setCurrentShop(response[0]));
  }, [id]);

  return (
    <section className="details">
      <div className="details-about">
        <div className="details-about-left">
          <img
            src={currentShop?.image_url}
            alt="coffee shop provided by Yelp"
            id="shop-image"
          />
        </div>
        <div className="details-about-right">
          <h1 id="shop-details-name">{currentShop?.name}</h1>
          <StarRating shop={currentShop} />
          <div className="shop-address">
            <p className="address-item">
              {currentShop?.location?.display_address[0]}
            </p>
            <p className="address-item">
              {currentShop?.location?.display_address[1]}
            </p>
          </div>
          {currentShop?.categories?.map((cat) => {
            return (
              <p className="shop-categories" key={cat.alias}>
                {cat.title}
              </p>
            );
          })}
          <div className="shop-phone"></div>
          <div className="shop-transations"></div>
        </div>
      </div>
      <div className="details-posts">
        <PostList shopObj={currentShop} currentUser={currentUser} />
      </div>
    </section>
  );
};
