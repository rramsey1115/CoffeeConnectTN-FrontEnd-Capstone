import { Link } from "react-router-dom";
import { StarRating } from "../shops/StarRating";
import "./FavoritesList.css"

export const FavoriteCard = ({ favObj }) => {
  return <section className="favorite-card">
    <div className="fav-card-banner">
        <Link to={`/discover/${favObj.business?.id}`}>
            <h2 id="fav-name">{favObj.business?.name}</h2>
        </Link>
        <StarRating shop={favObj.business} />
    </div>
    <div className="fav-card-body">
    <Link to={`/discover/${favObj.business?.id}`} textDecoration="none">
    <img className="fav-card-img" src={favObj.business?.image_url} alt="coffee shop" />
    </Link>
    </div>
  </section>;
};

{/* <div className="shop-card">
  <div className="shop-card-banner">
    <Link to={`/discover/${shop.id}`}>
      <h2 id="shop-name">{shop.name}</h2>
    </Link>
    <StarRating shop={shop} />
  </div> */}
//   <div className="shop-card-body">
//     <Link to={`/discover/${shop.id}`} textDecoration="none">
//       <img className="shop-card-img" src={shop.image_url} alt="coffee shop" />
//     </Link>
//   </div>
// </div>;
