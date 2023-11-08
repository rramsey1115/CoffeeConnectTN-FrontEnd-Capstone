import { useEffect, useState } from "react";
import "./CreteEvent.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { getAllCoffeeShops } from "../services/shopServices";
import { createNewEvent } from "../services/eventServices";
import { useNavigate } from "react-router-dom";

export const CreateEvent = ({ currentUser, userLocation }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [allBusinesses, setAllBusiness] = useState(null);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    name: "",
    date: startDate,
    time: "",
    details: "",
    businessId: "",
    attendeesId: [],
  });

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString); // {object Date}
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    const formatted = yyyy + "-" + mm + "-" + dd;
    return formatted;
  };

  const updateEvent = (evt) => {
    const copy = { ...event };
    copy[evt.target.id] = evt.target.value;
    setEvent(copy);
  };

  const updateEventLocation = (id) => {
    const copy = { ...event };
    copy.businessId = id;
    setEvent(copy);
  };

  const handleEventCreate = (e) => {
    e.preventDefault();
    createNewEvent(event);
    setTimeout(() => navigate("/events"), 5000);
  };

  useEffect(() => {
    getAllCoffeeShops().then((data) => setAllBusiness(data));
  }, []);

  useEffect(() => {
    const found = allBusinesses?.filter((business) =>
      business.name?.toLowerCase().includes(userInput.toLowerCase())
    );
    if (userInput.length >= 1 && found.length > 0) {
      setFilteredBusinesses(found);
      setDropdown(true);
    } else if (userInput.length >= 1 && found.length < 1) {
      document.getElementById("businessId").value = "";
      window.alert("No Results Found");
      setFilteredBusinesses(allBusinesses);
      setUserInput("");
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  }, [userInput, allBusinesses]);

  useEffect(() => {
    const copy = { ...event };
    copy.date = getFormattedDate(startDate);
    setEvent(copy);
  }, [startDate]);

  document.addEventListener("click", (e) => {
    e.target.className !== "dropdown-row"
      ? setDropdown(false)
      : setDropdown(true);
  });

  return (
    <form className="create-event-form" onSubmit={handleEventCreate}>
      <h1 className="create-event-title">Create Event</h1>
      <div className="date">
        <ReactDatePicker
          showIcon
          className="datepicker"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <input
          onChange={updateEvent}
          type="text"
          id="time"
          className="form-control"
          placeholder="Event Time"
          required
        />
      </div>
      <fieldset>
        <div className="form-group">
          <input
            type="text"
            id="businessId"
            value={userInput}
            className="location-search form-control"
            placeholder="Location Search"
            onChange={(event) => {
              setUserInput(event.target.value);
            }}
          ></input>
          {filteredBusinesses.length > 0 && dropdown ? (
            <div type="dropdown" className="search-results">
              {filteredBusinesses.map((fb) => {
                return (
                  <div
                    key={fb.id}
                    id={fb.id}
                    value={fb.name}
                    onClick={(e) => {
                      setUserInput(fb.name);
                      console.log("dropdown", dropdown);
                      setDropdown(false);
                      updateEventLocation(fb.id);
                      console.log("dropdown", dropdown);
                    }}
                    className="dropdown-row"
                  >
                    {fb.name}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <input
            onChange={updateEvent}
            type="text"
            id="name"
            className="form-control"
            placeholder="Event Name"
            required
            autoFocus
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <textarea
            onChange={updateEvent}
            type="text"
            id="details"
            className="form-control"
            placeholder="Event Details"
            required
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          {event.name &&
          event.date &&
          event.time &&
          event.businessId &&
          event.details ? (
            <button
              className="button enabled-button"
              id="submit-button"
              type="submit"
            >
              Submit
            </button>
          ) : (
            <button
              className="button disabled-button"
              id="disabled-submit-button"
              type="submit"
              disabled
            >
              Submit
            </button>
          )}
        </div>
      </fieldset>
    </form>
  );
};
