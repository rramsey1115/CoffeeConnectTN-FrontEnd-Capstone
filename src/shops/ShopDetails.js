import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShopById } from "../services/shopServices";
import { PostList } from "../posts/PostList";
import { StarRating } from "./StarRating";
import { BsFillBookmarkFill, BsBookmarkPlus } from "react-icons/bs";
import "./ShopDetails.css";
import {
  addToFavorites,
  deleteFromFavorites,
  getFavoritesByUserId,
} from "../services/favServices";

export const ShopDetails = ({ currentUser }) => {
  const id = useParams().shopId;
  const [currentShop, setCurrentShop] = useState({});
  const [favoritedShops, setFavoritedShops] = useState([]);
  const [favoriteId, setFavoriteId] = useState(null);
  const [createdFavoriteObj, setCreatedFavoriteObj] = useState({
    userId: currentUser?.id,
    businessId: id,
  });

  const getAndSetFavoritedShops = () => {
    getFavoritesByUserId(currentUser.id).then((data) =>
      setFavoritedShops(data)
    );
  };

  const getAndSetCurrentShop = () => {
    getShopById(id).then((response) => setCurrentShop(response[0]));
  };

  const removeFavorite = (favoriteId) => {
    deleteFromFavorites(favoriteId).then(setFavoriteId(null));
  };

  const addFavorite = (createdFavoriteObj) => {
    addToFavorites(createdFavoriteObj).then(getAndSetFavoritedShops);
  };

  useEffect(() => {
    setCreatedFavoriteObj({
      userId: currentUser?.id,
      businessId: id,
    });
  }, [currentUser, id]);

  useEffect(() => {
    getAndSetFavoritedShops();
  }, [currentUser]);

  useEffect(() => {
    favoritedShops.map((fav) =>
      fav.businessId === currentShop.id ? setFavoriteId(fav.id) : null
    );
  }, [favoritedShops, currentShop]);

  useEffect(() => {
    getAndSetCurrentShop();
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
          <div className="details-name-favorite">
            <h1 id="shop-details-name">{currentShop?.name}</h1>
            {favoriteId ? (
              <>
                <BsFillBookmarkFill
                  id="favorite-icon-true"
                  onClick={(e) => removeFavorite(favoriteId)}
                />
              </>
            ) : (
              <>
                <BsBookmarkPlus
                  id="favorite-icon-false"
                  onClick={(e) => addFavorite(createdFavoriteObj)}
                />
              </>
            )}
          </div>
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
          <div className="shop-transactions"></div>
        </div>
      </div>
      <div className="details-posts">
        <PostList shopObj={currentShop} currentUser={currentUser} />
      </div>
    </section>
  );
};
