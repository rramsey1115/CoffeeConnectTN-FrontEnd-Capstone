import { useEffect, useState } from "react";
import { UpdateProfile, getUserById } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import { getAtPrefs, getCoffeePrefs } from "../services/PrefServices";

export const EditProfileForm = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const [coffeePrefs, setCoffeePrefs] = useState([]);
  const [atPrefs, setAtPrefs] = useState([]);
  const [userChoices, updateChoices] = useState({
    email: user?.email,
    password: user?.password,
    name: user?.name,
    picture: user?.picture,
    about: user?.about,
    coffeePreferenceId: user?.coffeePreferenceId,
    atmospherePreferenceId: user?.atmospherePreferenceId,
  });

  const navigate = useNavigate();

  const handleEditProfile = async () => {
    await UpdateProfile(user.id, userChoices);
    navigate(`/profile/${currentUser.id}`);
  };

  const getAndSetCoffeePrefs = () => {
    getCoffeePrefs().then((data) => setCoffeePrefs(data));
  };

  const getAndSetAtPrefs = () => {
    getAtPrefs().then((data) => setAtPrefs(data));
  };

  useEffect(() => {
    getAndSetCoffeePrefs();
  }, []);

  useEffect(() => {
    getAndSetAtPrefs();
  }, []);

  useEffect(() => {
    getUserById(currentUser?.id).then((data) => setUser(data[0]));
  }, [currentUser]);

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
              className="edit-form-control"
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
              className="edit-form-control"
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
              className="edit-form-control"
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
              className="edit-form-control"
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
              id="edit-about"
              className="edit-about-textarea"
              value={userChoices?.about}
              required
            />
          </div>
        </fieldset>
        <div className="edit-prefs">
          <fieldset className="prefs-list">
            <h3>Coffee Order</h3>
            {coffeePrefs.map((coffeePref) => {
              return (
                <div key={coffeePref.id}>
                  <label htmlFor={coffeePref.id}>{coffeePref.name}</label>
                  <input
                    required
                    type="radio"
                    id={coffeePref.id}
                    value={coffeePref.id}
                    checked={userChoices.coffeePreferenceId === coffeePref.id}
                    onChange={(event) => {
                      const copy = { ...userChoices };
                      copy.coffeePreferenceId = event.target.value * 1;
                      updateChoices(copy);
                    }}
                  />
                </div>
              );
            })}
          </fieldset>
          <fieldset className="prefs-list">
            <h3>Cafe Atmosphere</h3>
            {atPrefs.map((atPref) => {
              return (
                <div key={atPref.id + 50}>
                  <label htmlFor={atPref.id + 100}>{atPref.name}</label>
                  <input
                    required
                    type="radio"
                    id={atPref.id + 100}
                    value={atPref.id}
                    checked={userChoices.atmospherePreferenceId === atPref.id}
                    onChange={(event) => {
                      const copy = { ...userChoices };
                      copy.atmospherePreferenceId = event.target.value * 1;
                      updateChoices(copy);
                    }}
                  />
                </div>
              );
            })}
          </fieldset>
        </div>
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
