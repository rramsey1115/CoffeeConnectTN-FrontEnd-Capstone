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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation(position.coords);
    });
  }, [currentUser]);

  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route
          index
          element={
            <Welcome currentUser={currentUser} userLocation={userLocation} />
          }
        />
        <Route path="discover">
          <Route
            path=":cityName"
            element={
              <>
                <NavBar currentUser={currentUser} />
                <ShopsList
                  currentUser={currentUser}
                  userLocation={userLocation}
                />
              </>
            }
          />
        </Route>
        <Route path="details">
          <Route
            path=":shopId"
            element={
              <>
                <NavBar currentUser={currentUser} />
                <ShopDetails
                  currentUser={currentUser}
                  userLocation={userLocation}
                />
              </>
            }
          />
        </Route>
        <Route
          path="favorites"
          element={
            <>
              <NavBar currentUser={currentUser} />
              <FavoritesList
                currentUser={currentUser}
                userLocation={userLocation}
              />
            </>
          }
        />
        <Route path="profile">
          <Route
            path=":userId"
            element={
              <>
                <NavBar currentUser={currentUser} />
                <UserProfile
                  currentUser={currentUser}
                  userLocation={userLocation}
                />
              </>
            }
          />
        </Route>
        <Route
          path="editProfile"
          element={
            <>
              <NavBar currentUser={currentUser} />
              <EditProfileForm
                currentUser={currentUser}
                userLocation={userLocation}
              />
            </>
          }
        />
      </Route>
    </Routes>
  );
};
