import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventById } from "../services/eventServices";
import { getUserById } from "../services/userServices";
import "./Events.css";

export const EventDetails = ({ currentUser }) => {
  const eventId = useParams().eventId;
  const [eventAttendees, setEventAttendees] = useState([]);
  const [currentEventObj, setCurrentEvent] = useState({});

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString); // {object Date}
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    const formatted = mm + "/" + dd + "/" + yyyy;
    return formatted;
  };

  useEffect(() => {
    const usersArray = [];
    currentEventObj.attendeesId?.map((id) =>
      getUserById(id).then((res) => usersArray.push(res[0]))
    );
    setTimeout(() => setEventAttendees(usersArray), 1000);
  }, [currentEventObj, eventId]);

  useEffect(() => {
    getEventById(eventId).then((data) => setCurrentEvent(data));
  }, [eventId, currentUser]);

  console.log("event", currentEventObj);

  return (
    <section className="event-details">
      <div className="event-details-header">
        <div className="event-header-left">
          <h1>{currentEventObj.name}</h1>
          <img
            id="event-details-image"
            src={currentEventObj.business?.image_url}
            alt="meeting location"
          />
        </div>
        <div className="event-header-right">
          <h2>About</h2>
          <h4>
            {getFormattedDate(currentEventObj.date)} - {currentEventObj.time}
          </h4>
          <p>{currentEventObj.details}</p>
        </div>
      </div>
      <div className="attendees">
        <div className="attendees-title">
          <h2>Event Attendees</h2>
        </div>
        <div className="attendees-list">
          {eventAttendees
            ? eventAttendees.map((ea) => {
                return (
                  <Link key={ea.id} to={`/profile/${ea.id}`}>
                    <div className="attendee-icon">
                      <h3>{ea.name}</h3>
                      <img
                        className="attendee-picture"
                        src={ea.picture}
                        alt="user"
                      />
                    </div>
                  </Link>
                );
              })
            : null}
        </div>
      </div>
    </section>
  );
};
