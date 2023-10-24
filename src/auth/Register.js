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

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>Coffee Connect</h1>
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
              id="about"
              className="form-control"
              placeholder="Tell Us A Little About Yourself"
              required
            />
          </div>
        </fieldset>
        {/* <fieldset>
          <div className="form-group">
            <label>
              <input
                onChange={(evt) => {
                  const copy = { ...customer }
                  copy.isStaff = evt.target.checked
                  setCustomer(copy)
                }}
                type="checkbox"
                id="isStaff"
              />
              I am an employee{" "}
            </label>
          </div>
        </fieldset> */}
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
