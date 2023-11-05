import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../services/eventServices";
import { getUserById } from "../services/userServices";
import "./Events.css";

export const EventDetails = ({ currentUser }) => {
  const eventId = useParams().eventId;
  const [currentEventObj, setCurrentEvent] = useState({});
  const [eventAttendees, setEventAttendees] = useState([]);

  useEffect(() => {
    getEventById(eventId).then((data) => setCurrentEvent(data));
  }, [eventId, currentUser]);

  useEffect(() => {
    const usersArray = [];
    currentEventObj.attendeesId?.map((id) =>
      getUserById(id).then((res) => usersArray.push(res[0]))
    );
    setEventAttendees(usersArray);
  }, [currentEventObj]);

  console.log("event", currentEventObj);
  console.log("eventAttendees", eventAttendees);

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
          <h4>{currentEventObj.date}</h4>
          <h4>{currentEventObj.time}</h4>
        </div>
      </div>
    </section>
  );
};
