import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ShopsList } from "./shops/ShopsList";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews />
          </Authorized>
        }
      />
    </Routes>
  );
}

export default App;
