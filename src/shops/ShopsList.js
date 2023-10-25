import { useEffect, useState } from "react";
import { getCoffeeShops } from "../services/yelpServices";
import { ShopCard } from "./ShopCard";

export const ShopsList = ({ currentUser }) => {
  const [allShops, setAllShops] = useState([]);

  const getAndSetCoffeeShops = () => {
    getCoffeeShops().then((coffeeArr) => {
      setAllShops(coffeeArr);
    });
  };

  useEffect(() => {
    getAndSetCoffeeShops();
  }, []);

  return (
    <section className="shop-list">
      {allShops.map((shop) => {
        return (
          <div key={shop?.id} className="shop-item">
            <ShopCard shop={shop} currentUser={currentUser} />
          </div>
        );
      })}
    </section>
  );
};
