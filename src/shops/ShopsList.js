import { useEffect, useState } from "react";
import { ShopCard } from "./ShopCard";
import { VscFilter, VscStarFull } from "react-icons/vsc";
import "./ShopFilter.css";
import { getAllCoffeeShops } from "../services/shopServices";

export const ShopsList = ({ currentUser }) => {
  const [allShops, setAllShops] = useState([]);
  const [filterCondition, setFilterCondition] = useState(false);
  const [filteredShops, setFilteredShops] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const [cityShops, setCityShops] = useState([]);

  const getAndSetSearchCity = () => {
    const localCityObj = localStorage.getItem("coffee_searchCity");
    const cityString = JSON.parse(localCityObj);
    setSearchCity(cityString.cityName);
  };

  const resetCityShops = () => {
    setCityShops(allShops.filter((shop) => shop.location?.city === searchCity));
  };

  const getAndSetAllCoffeeShops = () => {
    getAllCoffeeShops().then((coffeeArr) => {
      setAllShops(coffeeArr);
    });
  };

  const handleFilterClick = () => {
    setFilterCondition(!filterCondition);
  };

  const filterShops = (num) => {
    const newArray = cityShops.filter(
      (shop) => shop.rating >= num && shop.rating < num + 1
    );
    setFilteredShops(newArray);
  };

  useEffect(() => {
    getAndSetAllCoffeeShops();
  }, [searchCity]);

  useEffect(() => {
    getAndSetSearchCity();
  }, []);

  useEffect(() => {
    setCityShops(allShops.filter((shop) => shop.location?.city === searchCity));
  }, [allShops, searchCity]);

  useEffect(() => {
    setFilteredShops(cityShops.filter((s) => s.location?.city === searchCity));
    setTimeout(() => {
      setIsLoaded(true);
    }, 200);
  }, [allShops, cityShops, searchCity]);

  return isLoaded === false ? (
    <div className="loading-container"> </div>
  ) : (
    <>
      <section className="shop-list-header">
        <div className="title">
          <h1 id="location-name">{searchCity}</h1>
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
                resetCityShops();
              }}
            >
              All
            </p>
            <p
              className="dropdown-item"
              onClick={(e) => {
                filterShops(1);
              }}
            >
              <div className="filter-num-star">1 <VscStarFull id="filter-star" /></div>
            </p>
            <p
              className="dropdown-item"
              onClick={(e) => filterShops(2)}
            >
              <div className="filter-num-star">2 <VscStarFull id="filter-star" /></div>
            </p>
            <p
              className="dropdown-item"
              onClick={(e) => filterShops(3)}
            >
              <div className="filter-num-star">3 <VscStarFull id="filter-star" /></div>
            </p>
            <p
              className="dropdown-item"
              onClick={(e) => filterShops(4)}
            >
              <div className="filter-num-star">4 <VscStarFull id="filter-star" /></div>
            </p>
            <p
              className="dropdown-item"
              onClick={(e) => filterShops(5)}
            >
              <div className="filter-num-star">5 <VscStarFull id="filter-star" /></div>
            </p>
          </div>
        </div>
      </section>

      <section className="shop-list">
        {filteredShops?.length === 0 ? (
          <h1>No Shops Meet Search Criteria</h1>
        ) : (
          filteredShops?.map((shop) => {
            return (
              <div key={shop?.id} className="shop-item">
                <ShopCard
                  shop={shop}
                  currentUser={currentUser}
                  searchCity={searchCity}
                />
              </div>
            );
          })
        )}
      </section>
    </>
  );
};
