import { useEffect, useState } from "react";
import image_0 from "../graphics/regular_0@2x.png";
import image_1 from "../graphics/regular_1@2x.png";
import image_1_half from "../graphics/regular_1_half@2x.png";
import image_2 from "../graphics/regular_2@2x.png";
import image_2_half from "../graphics/regular_2_half@2x.png";
import image_3 from "../graphics/regular_3@2x.png";
import image_3_half from "../graphics/regular_3_half@2x.png";
import image_4 from "../graphics/regular_4@2x.png";
import image_4_half from "../graphics/regular_4_half@2x.png";
import image_5 from "../graphics/regular_5@2x.png";
import yelpImg from "../graphics/yelp_burst.png";
import "./ShopCard.css";

export const StarRating = ({ shop }) => {
  const [rating, setRating] = useState(0);
  const [ratingImg, setRatingImg] = useState("");

  const getAndSetRating = (shop) => {
    setRating(shop.rating);
  };

  useEffect(() => {
    getAndSetRating(shop);
  }, [shop]);
  useEffect(() => {
    let imgUrl = "";
    rating < 1
      ? (imgUrl = image_0)
      : rating >= 1 && rating < 1.5
      ? (imgUrl = image_1)
      : rating >= 1.5 && rating < 2
      ? (imgUrl = image_1_half)
      : rating >= 2 && rating < 2.5
      ? (imgUrl = image_2)
      : rating >= 2.5 && rating < 3
      ? (imgUrl = image_2_half)
      : rating >= 3 && rating < 3.5
      ? (imgUrl = image_3)
      : rating >= 3.5 && rating < 4
      ? (imgUrl = image_3_half)
      : rating >= 4 && rating < 4.5
      ? (imgUrl = image_4)
      : rating >= 4.5 && rating < 5
      ? (imgUrl = image_4_half)
      : (imgUrl = image_5);
    setRatingImg(imgUrl);
  }, [rating]);

  return (
    <>
      <div className="yelp-rating">
        <a href={shop.url} rel="noreferrer" target="_blank">
          <div>
            <img id="yelp-logo" src={yelpImg} alt="yelp logo" />
            <img id="stars" src={ratingImg} alt="star rating" />
          </div>
        </a>
        <p id="ratings-amount">Based on {shop.review_count} ratings</p>
      </div>
    </>
  );
};
