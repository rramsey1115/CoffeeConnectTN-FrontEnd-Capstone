import { Route, Routes } from "react-router-dom";
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


const googleKey = "AIzaSyBAZYUQCy2QTGBr10KsuiGd1AqOgmFicqc";