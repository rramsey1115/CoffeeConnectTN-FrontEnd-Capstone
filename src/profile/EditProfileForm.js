import { useState } from "react";

export const EditProfileForm = ({user}) => {
  const [userChoices, updateChoices] = useState({
    email: user?.email,
    password: user?.password,
    name: user?.name,
    picture: user?.picture,
    about: user?.about,
  });

  const handleEditProfile = (e) => {
    e.preventDefault().then(console.log("Save Button Clicked"))
  }
  return (
    <form className="form-login" onSubmit={handleEditProfile}>
      <fieldset>
        <div className="form-group">
          <input
            onChange={updateChoices}
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
            onChange={updateChoices}
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
            onChange={updateChoices}
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
            onChange={updateChoices}
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
            onChange={updateChoices}
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
          <button className="login-btn btn-info" type="submit">
            Register
          </button>
        </div>
      </fieldset>
    </form>
  );
};
