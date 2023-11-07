import { useEffect, useState } from "react";
import "./CreteEvent.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const CreateEvent = ({ currentUser, userLocation }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [business, setBusiness] = useState(null);
  const [event, setEvent] = useState({
    name: "",
    date: startDate,
    time: "",
    details: "",
    businessId: business,
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

  const handleEventCreate = (e) => {
    e.preventDefault();
    console.log("event created", event);
  };

  useEffect(() => {
    const copy = { ...event };
    copy.date = getFormattedDate(startDate);
    setEvent(copy);
  }, [startDate]);

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
            onChange={updateEvent}
            type="text"
            id="businessId"
            className="form-control"
            placeholder="Event Location"
            required
          />
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
              id="submit-button"
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
