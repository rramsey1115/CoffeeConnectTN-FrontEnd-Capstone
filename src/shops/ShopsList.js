import { useEffect, useState } from "react";
import { getCoffeeShops } from "../services/yelpServices";
import { ShopCard } from "./ShopCard";
import { TbFilterStar } from "react-icons/tb";
import "./ShopFilter.css";

export const ShopsList = ({ currentUser }) => {
  const [shops, setAllShops] = useState([])
  const [filterCondition, setFilterCondition] = useState(false);

  const getAndSetCoffeeShops = () => {
    getCoffeeShops().then((coffeeArr) => {
      setAllShops(coffeeArr);
    });
  };

  const handleFilterClick = () => {
    setFilterCondition(!filterCondition);
  };

  const filterShops = (num) => {
    const newArray = shops.filter((shop) => shop.rating >= num && shop.rating < num + 1);
    setAllShops(newArray);
  }

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
        <div className="dropdown">
          <div
            id="filter-dropdown"
            className={`dropdown-content ${
              filterCondition ? "active" : "inactive"
            }`}
          >
            <p
              className="dropdown-item show-all"
              value=""
              onClick={(e) => {
                getAndSetCoffeeShops();
              }}
            >
              All
            </p>
            <p
              className="dropdown-item"
              onClick={(e) => filterShops(e.target.innerText * 1)}
            >
              1
            </p>
            <p
              className="dropdown-item"
              onClick={(e) => filterShops(e.target.innerText*1)}
            >
              2
            </p>
            <p
              className="dropdown-item"
              onClick={(e) => filterShops(e.target.innerText*1)}
            >
              3
            </p>
            <p
              className="dropdown-item"
              onClick={(e) => filterShops(e.target.innerText*1)}
            >
              4
            </p>
            <p
              className="dropdown-item"
              onClick={(e) => filterShops(e.target.innerText*1)}
            >
              5
            </p>
          </div>
        </div>
      </section>

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
