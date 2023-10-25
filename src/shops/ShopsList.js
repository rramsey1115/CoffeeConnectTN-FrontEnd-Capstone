import { useEffect, useState } from "react";
import { getCoffeeShops } from "../services/yelpServices";
import { ShopCard } from "./ShopCard";
import { TbFilterStar } from "react-icons/tb";
import "./ShopFilter.css";

export const ShopsList = ({ currentUser }) => {
  const [shops, setAllShops] = useState([]);
  const [filterCondition, setFilterCondition] = useState(false);

  const getAndSetCoffeeShops = () => {
    getCoffeeShops().then((coffeeArr) => {
      setAllShops(coffeeArr);
    });
  };

  const handleFilterClick = () => {
    setFilterCondition(!filterCondition);
    console.log("filter idcon clicked", filterCondition);
  };

  useEffect(() => {
    getAndSetCoffeeShops();
  }, []);

  return (
    <>
      <section className="shop-list-header">
        <div className="title">
          <h1 id="location-name">Nashville</h1>
        </div>
        <div id="filter-icon-container">
          <TbFilterStar id="filter-icon" onClick={handleFilterClick} />
        </div>
      </section>
      <div className="dropdown">
        <div
          id="filter-dropdown"
          className={`dropdown-content ${
            filterCondition ? "active" : "inactive"
          }`}
        >
          <p className="dropdown-item" value="">
            Show All
          </p>
          <p className="dropdown-item" value="1">
            1
          </p>
          <p className="dropdown-item" value="2">
            2
          </p>
          <p className="dropdown-item" value="3">
            3
          </p>
          <p className="dropdown-item" value="4">
            4
          </p>
          <p className="dropdown-item" value="5">
            5
          </p>
        </div>
      </div>
      <section className="shop-list">
        {shops.map((shop) => {
          return (
            <div key={shop?.id} className="shop-item">
              <ShopCard shop={shop} currentUser={currentUser} />
            </div>
          );
        })}
      </section>
    </>
  );
};
