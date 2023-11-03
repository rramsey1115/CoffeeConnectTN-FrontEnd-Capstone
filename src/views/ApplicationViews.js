import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../nav/NavBar";
import { Welcome } from "../welcome/Welcome";
import { ShopsList } from "../shops/ShopsList";
import { ShopDetails } from "../shops/ShopDetails";
import { FavoritesList } from "../favorites/FavoritesList";
import { UserProfile } from "../profile/UserProfile";
import { EditProfileForm } from "../profile/EditProfileForm";
import { DarkMode } from "../theme/DarkMode";
import { EventsList } from "../events/EventsList";
import { CreateEvent } from "../events/CreateEvent";

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
            <>
              <Welcome currentUser={currentUser} userLocation={userLocation} />
              <DarkMode />
            </>
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
                {ShopDetails ? <DarkMode /> : ""}
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
                {ShopDetails ? <DarkMode /> : ""}
              </>
            }
          />
        </Route>
        <Route path="events">
          <Route
            path=""
            element={
              <>
                <NavBar currentUser={currentUser} userLocation={userLocation} />
                <EventsList
                  currentUser={currentUser}
                  userLocation={userLocation}
                />
                {ShopDetails ? <DarkMode /> : ""}
              </>
            }
          />
          <Route
            path="create"
            element={
              <>
                <NavBar currentUser={currentUser} userLocation={userLocation} />
                <CreateEvent
                  currentUser={currentUser}
                  userLocation={userLocation}
                />
                {CreateEvent ? <DarkMode /> : null}
              </>
            }
          />
        </Route>
        <Route
          path="favorites"
          element={
            <>
              <NavBar currentUser={currentUser} userLocation={userLocation} />
              <FavoritesList
                currentUser={currentUser}
                userLocation={userLocation}
              />
              {FavoritesList ? <DarkMode /> : null}
            </>
          }
        />
        <Route path="profile">
          <Route
            path=":userId"
            element={
              <>
                <NavBar currentUser={currentUser} userLocation={userLocation} />
                <UserProfile
                  currentUser={currentUser}
                  userLocation={userLocation}
                />
                {UserProfile ? <DarkMode /> : null}
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
              {EditProfileForm ? <DarkMode /> : null}
            </>
          }
        />
      </Route>
    </Routes>
  );
};
