import { useState } from "react";
import "./CreteEvent.css";

export const CreateEvent = ({ currentUser, userLocation }) => {
  const [business, setBusiness] = useState({});
  const [event, setEvent] = useState({
    name: "",
    date: "",
    time: "",
    details: "",
    businessId: "",
    attendeesId: [],
  });

  const updateEvent = (evt) => {
    const copy = { ...event };
    copy[evt.target.id] = evt.target.value;
    setEvent(copy);
  };

  const handleEventCreate = (e) => {
    e.preventDefault();
    console.log("event created", event);
  };

  return (
    <form className="create-event-form" onSubmit={handleEventCreate}>
      <h1 className="create-event-title">Create Event</h1>
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
          <input
            onChange={updateEvent}
            type="text"
            id="date"
            className="form-control"
            placeholder="Event Date"
            required
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <input
            onChange={updateEvent}
            type="text"
            id="time"
            className="form-control"
            placeholder="Event Time"
            required
          />
        </div>
      </fieldset>
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
