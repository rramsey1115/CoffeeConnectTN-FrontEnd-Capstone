import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByEmail } from "../services/userServices";

export const Register = (props) => {
  const [customer, setCustomer] = useState({
    email: "",
    password: "",
    name: "",
    picture: "",
    about: "",
    admin: false,
    coffeePreferenceId: 0,
    atmospherePreferenceId: 0,
  });

  let navigate = useNavigate();

  const registerNewUser = () => {
    createUser(customer).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "coffee_user",
          JSON.stringify({
            id: createdUser.id,
            staff: createdUser.admin,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(customer.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateCustomer = (evt) => {
    const copy = { ...customer };
    copy[evt.target.id] = evt.target.value;
    setCustomer(copy);
  };

  const updateOrderPreferences = (e) => {
    const copy = { ...customer };
    copy.coffeePreferenceId = e.target.value*1;
    setCustomer(copy);
  };

  const updateAtmospherePreference = (e) => {
    const copy = { ...customer };
    copy.atmospherePreferenceId = e.target.value*1;
    setCustomer(copy);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>Coffee Connect TN</h1>
        <h2>Please Register</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="name"
              className="form-control"
              placeholder="Full Name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="picture"
              className="form-control"
              placeholder="Link to Profile Picture"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <textarea
              onChange={updateCustomer}
              type="text"
              id="create-about"
              className="form-control"
              placeholder="Tell Us A Little About Yourself"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <h3>Coffee Order Preference</h3>
          <div className="form-group radio-group">
            <div className="radio-group-item">
              <label htmlFor="order1">
                <input
                  onChange={updateOrderPreferences}
                  type="radio"
                  id="order1"
                  value="1"
                  name="orderPreference"
                ></input>
                Traditional
              </label>
            </div>
            <div className="radio-group-item">
              <input
                onChange={updateOrderPreferences}
                type="radio"
                id="order2"
                value="2"
                name="orderPreference"
              />
              <label htmlFor="order2">Sweet</label>
            </div>
            <div className="radio-group-item">
              <input
                onChange={updateOrderPreferences}
                type="radio"
                id="order3"
                value="3"
                name="orderPreference"
              />
              <label htmlFor="order3">Exploratory</label>
            </div>
            <div className="radio-group-item">
              <input
                onChange={updateOrderPreferences}
                type="radio"
                id="order4"
                value="4"
                name="orderPreference"
              />
              <label htmlFor="order4">International</label>
            </div>
            <div className="radio-group-item">
              <input
                onChange={updateOrderPreferences}
                type="radio"
                id="order5"
                value="5"
                name="orderPreference"
              />
              <label htmlFor="order5">Cold Drinks</label>
            </div>
            <div className="radio-group-item">
              <input
                onChange={updateOrderPreferences}
                type="radio"
                id="order6"
                value="6"
                name="orderPreference"
              />
              <label htmlFor="order6">Dietary-Restrictions</label>
            </div>
            <div className="radio-group-item">
              <input
                onChange={updateOrderPreferences}
                type="radio"
                id="order7"
                value="7"
                name="orderPreference"
              />
              <label htmlFor="order7">Powerful</label>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <h3>Cafe Atmosphere Preference</h3>
          <div className="form-group radio-group">
            <div className="radio-group-item">
              <label htmlFor="at1">
                <input
                  onChange={updateAtmospherePreference}
                  type="radio"
                  id="at1"
                  value="1"
                  name="atmospherePreference"
                ></input>
                Lively
              </label>
            </div>
            <div className="radio-group-item">
              <input
                onChange={updateAtmospherePreference}
                type="radio"
                id="at2"
                value="2"
                name="atmospherePreference"
              />
              <label htmlFor="at2">Cozy</label>
            </div>
            <div className="radio-group-item">
              <input
                onChange={updateAtmospherePreference}
                type="radio"
                id="at3"
                value="3"
                name="atmospherePreference"
              />
              <label htmlFor="at3">Hipster</label>
            </div>
            <div className="radio-group-item">
              <input
                onChange={updateAtmospherePreference}
                type="radio"
                id="at4"
                value="4"
                name="atmospherePreference"
              />
              <label htmlFor="at4">Quaint</label>
            </div>
            <div className="radio-group-item">
              <input
                onChange={updateAtmospherePreference}
                type="radio"
                id="at5"
                value="5"
                name="atmospherePreference"
              />
              <label htmlFor="at5">Low-Key</label>
            </div>
            <div className="radio-group-item">
              <input
                onChange={updateAtmospherePreference}
                type="radio"
                id="at6"
                value="6"
                name="atmospherePreference"
              />
              <label htmlFor="at6">Multi-Cultural</label>
            </div>
            <div className="radio-group-item">
              <input
                onChange={updateAtmospherePreference}
                type="radio"
                id="at7"
                value="7"
                name="atmospherePreference"
              />
              <label htmlFor="at7">Corporate Chain</label>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            {customer.name &&
            customer.email &&
            customer.password &&
            customer.picture &&
            customer.about ? (
              <button
                className="button login-btn btn-info"
                id="register-button"
                type="submit"
              >
                Register
              </button>
            ) : (
              <button
                className="button login-btn btn-info"
                id="register-button"
                type="submit"
                disabled
              >
                Register
              </button>
            )}
          </div>
        </fieldset>
      </form>
    </main>
  );
};
