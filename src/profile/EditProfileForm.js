import { useEffect, useState } from "react";
import { getUserById } from "../services/userServices";

export const EditProfileForm = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const [userChoices, updateChoices] = useState({
    email: user?.email,
    password: user?.password,
    name: user?.name,
    picture: user?.picture,
    about: user?.about,
  });

  useEffect(() => {
    getUserById(currentUser?.id).then((data) => setUser(data[0]));
  }, [currentUser]);

  const handleEditProfile = (e) => {
    e.preventDefault().then(
      console.log("Save Button Clicked. userChoices =", userChoices)
    );
  };

  useEffect(() => {
    updateChoices(user);
  }, [user]);

  console.log("user =", user);
  console.log("userChoices =", userChoices);

  return (
    <section className="edit-profile-form-container">
      <form className="edit-profile-form" onSubmit={handleEditProfile}>
        <h1 id="edit-profile-title">Edit Profile</h1>
        <fieldset>
          <label for="name">Name</label>
          <div className="form-group">
            <input
              onChange={updateChoices}
              type="text"
              id="name"
              className="form-control"
              value={userChoices?.name}
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <label for="email">Email</label>
          <div className="form-group">
            <input
              onChange={updateChoices}
              type="email"
              id="email"
              className="form-control"
              value={userChoices?.email}
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <label for="password">Password</label>
          <div className="form-group">
            <input
              onChange={updateChoices}
              type="text"
              id="password"
              className="form-control"
              value={userChoices?.password}
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <label for="picture">Link to Profile Picture</label>
          <div className="form-group">
            <input
              onChange={updateChoices}
              type="text"
              id="picture"
              className="form-control"
              value={userChoices?.picture}
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <label for="about">About</label>
          <div className="form-group">
            <textarea
              onChange={updateChoices}
              rows={6}
              type="text"
              id="about"
              className="about-textarea"
              value={userChoices?.about}
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
            {userChoices.name &&
              userChoices.email &&
              userChoices.password &&
              userChoices.picture &&
              userChoices.about ? <button className="button" id="save-edit-button" type="submit">
              Register
            </button> : <button className="button" id="save-edit-button" type="submit" disabled>
              Register
            </button>}
            
          </div>
        </fieldset>
      </form>
    </section>
  );
};
