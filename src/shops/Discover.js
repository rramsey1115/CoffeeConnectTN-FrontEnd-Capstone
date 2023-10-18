import { useEffect, useState } from "react";
import { getCoffeeShops } from "../services/yelpServices";
import { ShopCard } from "./ShopCard";

export const ShopsList = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    getCoffeeShops().then(coffeeArr => {
      setShops(coffeeArr);
    });
  }, []);

  return (
    <section className="shop-list">
      {shops.map((shop) => {
        return (
        <div key={shop.id} className="shop-item">
            <ShopCard shop={shop} />
        </div>
        );
         })}
    </section>
  );
};
