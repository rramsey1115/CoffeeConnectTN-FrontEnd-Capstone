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
  const [userLocation, setUserLocation] = useState({});

  useEffect(() => {
    const localCoffeeUser = localStorage.getItem("coffee_user");
    const coffeeUserObject = JSON.parse(localCoffeeUser);
    setCurrentUser(coffeeUserObject);
  }, []);

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation(position.coords);
    })
  }, [currentUser]);

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
        <Route index element={<Welcome currentUser={currentUser} userLocation={userLocation}/>} />
        <Route path="discover">
          <Route index element={<ShopsList currentUser={currentUser} userLocation={userLocation}/>} />
          <Route
            path=":shopId"
            element={<ShopDetails currentUser={currentUser} userLocation={userLocation}/>}
          />
        </Route>
        <Route
          path="favorites"
          element={<FavoritesList currentUser={currentUser} userLocation={userLocation}/>}
        />
        <Route path="profile">
          <Route
            path=":userId"
            element={<UserProfile currentUser={currentUser} userLocation={userLocation}/>}
          />
        </Route>
        <Route
          path="editProfile"
          element={<EditProfileForm currentUser={currentUser} userLocation={userLocation}/>}
        />
      </Route>
    </Routes>
  );
};
