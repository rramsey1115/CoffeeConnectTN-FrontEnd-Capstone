import { useEffect, useState } from "react";
import { getCoffeeShops } from "../services/yelpServices";
import { ShopCard } from "./ShopCard";
// import { TbFilterStar } from "react-icons/tb";
// import { TfiStar } from "react-icons/tfi";
import { VscFilter } from "react-icons/vsc";
import "./ShopFilter.css";

export const ShopsList = ({ currentUser }) => {
  const [shops, setAllShops] = useState([]);
  const [filterCondition, setFilterCondition] = useState(false);
  const [filteredShops, setFilteredShops] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getAndSetCoffeeShops = () => {
    getCoffeeShops().then((coffeeArr) => {
      setAllShops(coffeeArr);
    });
  };

  const handleFilterClick = () => {
    setFilterCondition(!filterCondition);
  };

  const filterShops = (num) => {
    const newArray = shops.filter(
      (shop) => shop.rating >= num && shop.rating < num + 1
    );
    setFilteredShops(newArray);
  };

  useEffect(() => {
    getAndSetCoffeeShops();
  }, []);

  useEffect(() => {
    setFilteredShops(shops);
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, [shops]);

  return isLoaded === false ? (
    <div className="loading-container">  </div>
  ) : (
    <>
      <section className="shop-list-header">
        <div className="title">
          <h1 id="location-name">Nashville</h1>
          <div id="filter-icon-container" onClick={handleFilterClick}>
            <VscFilter id="filter-icon" />
          </div>
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
              onClick={(e) => {
                getAndSetCoffeeShops();
              }}
            >
              All
            </p>
            <p
              className="dropdown-item"
              onClick={(e) => {
                filterShops(e.target.innerText * 1);
              }}
            >
              1
            </p>
            <p
              className="dropdown-item"
              onClick={(e) => filterShops(e.target.innerText * 1)}
            >
              2
            </p>
            <p
              className="dropdown-item"
              onClick={(e) => filterShops(e.target.innerText * 1)}
            >
              3
            </p>
            <p
              className="dropdown-item"
              onClick={(e) => filterShops(e.target.innerText * 1)}
            >
              4
            </p>
            <p
              className="dropdown-item"
              onClick={(e) => filterShops(e.target.innerText * 1)}
            >
              5
            </p>
          </div>
        </div>
      </section>

      <section className="shop-list">
        {filteredShops.length === 0 ? (
          <h1>No Shops Meet Search Criteria</h1>
        ) : (
          filteredShops.map((shop) => {
            return (
              <div key={shop?.id} className="shop-item">
                <ShopCard shop={shop} currentUser={currentUser} />
              </div>
            );
          })
        )}
      </section>
    </>
  );
};
