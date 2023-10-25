import { useEffect, useState } from "react";
import { UpdateProfile, getUserById } from "../services/userServices";
import { useNavigate } from "react-router-dom";

export const EditProfileForm = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const [userChoices, updateChoices] = useState({
    email: user?.email,
    password: user?.password,
    name: user?.name,
    picture: user?.picture,
    about: user?.about,
  });

  const navigate = useNavigate();
  
  useEffect(() => {
    getUserById(currentUser?.id).then((data) => setUser(data[0]));
  }, [currentUser]);

  const handleEditProfile = async () => {
    await UpdateProfile(user.id, userChoices);
      navigate(`/profile/${currentUser.id}`);
  };

  useEffect(() => {
    updateChoices(user);
  }, [user]);

  return (
    <section className="edit-profile-form-container">
      <form className="edit-profile-form">
        <h1 id="edit-profile-title">Edit Profile</h1>
        <fieldset>
          <label>Name</label>
          <div className="form-group">
            <input
              onChange={(event) => {
                const copy = { ...userChoices };
                copy.name = event.target.value;
                updateChoices(copy);
              }}
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
          <label>Email</label>
          <div className="form-group">
            <input
              onChange={(event) => {
                const copy = { ...userChoices };
                copy.email = event.target.value;
                updateChoices(copy);
              }}
              type="email"
              id="email"
              className="form-control"
              value={userChoices?.email}
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <label>Password</label>
          <div className="form-group">
            <input
              onChange={(event) => {
                const copy = { ...userChoices };
                copy.password = event.target.value;
                updateChoices(copy);
              }}
              type="text"
              id="password"
              className="form-control"
              value={userChoices?.password}
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <label>Link to Profile Picture</label>
          <div className="form-group">
            <input
              onChange={(event) => {
                const copy = { ...userChoices };
                copy.picture = event.target.value;
                updateChoices(copy);
              }}
              type="text"
              id="picture"
              className="form-control"
              value={userChoices?.picture}
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <label>About</label>
          <div className="form-group">
            <textarea
              onChange={(event) => {
                const copy = { ...userChoices };
                copy.about = event.target.value;
                updateChoices(copy);
              }}
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
            userChoices.about ? (
              <button
                className="button"
                id="save-edit-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleEditProfile();
                }}
              >
                Save
              </button>
            ) : (
              <button
                className="button"
                id="save-edit-button"
                type="submit"
                disabled
              >
                Save
              </button>
            )}
          </div>
        </fieldset>
      </form>
    </section>
  );
};
