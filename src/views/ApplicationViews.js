import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../nav/NavBar";
import { Welcome } from "../welcome/Welcome";
import { ShopsList } from "../shops/ShopsList";
import { ShopDetails } from "../shops/ShopDetails";
import { FavoritesList } from "../favorites/FavoritesList";
import { UserProfile } from "../profile/UserProfile";
import { EditProfileForm } from "../profile/EditProfileForm";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localCoffeeUser = localStorage.getItem("coffee_user");
    const coffeeUserObject = JSON.parse(localCoffeeUser);
    setCurrentUser(coffeeUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar currentUser={currentUser} />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome currentUser={currentUser} />} />
        <Route path="discover">
          <Route index element={<ShopsList currentUser={currentUser} />} />
          <Route
            path=":shopId"
            element={<ShopDetails currentUser={currentUser} />}
          />
        </Route>
        <Route
          path="favorites"
          element={<FavoritesList currentUser={currentUser} />}
        />
        <Route path="profile">
          <Route
            path=":userId"
            element={<UserProfile currentUser={currentUser} />}
          >
            <Route
              path=":userId:editProfile"
              element={<EditProfileForm currentUser={currentUser} />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
