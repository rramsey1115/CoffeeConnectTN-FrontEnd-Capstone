import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteEvent,
  getEventById,
  updateEventObject,
} from "../services/eventServices";
import { getUserById } from "../services/userServices";
import "./Events.css";

export const EventDetails = ({ currentUser }) => {
  const eventId = useParams().eventId;
  const [eventAttendees, setEventAttendees] = useState([]);
  const [currentEventObj, setCurrentEvent] = useState({});
  const [userAttending, setUserAttending] = useState(false);
  const navigate = useNavigate();

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

  const getAndSetEvent = () => {
    getEventById(eventId).then((data) => setCurrentEvent(data));
  };

  const getAndSetEventAttendees = () => {
    const usersArray = [];
    currentEventObj.attendeesId?.map((id) =>
      getUserById(id).then((res) => usersArray.push(res[0]))
    );
    setTimeout(() => setEventAttendees(usersArray), 1000);
  };

  const checkUserRSVP = () => {
    eventAttendees.map((att) =>
      currentUser.id === att.id
        ? setUserAttending(true)
        : setUserAttending(false)
    );
  };

  const handleDeleteRSVP = async (userId) => {
    const attendeeArray = [...currentEventObj.attendeesId];
    const filteredArray = attendeeArray.filter(
      (entry) => entry !== currentUser.id
    );
    setCurrentEvent((currentEventObj.attendeesId = [...filteredArray]));
    await updateEventObject(currentEventObj, eventId);
    getAndSetEvent();
    checkUserRSVP();
  };

  const createRSVP = async (userId) => {
    const copy = { ...currentEventObj };
    const attendeeArray = [...copy.attendeesId];
    attendeeArray.push(currentUser.id);
    setCurrentEvent((currentEventObj.attendeesId = [...attendeeArray]));
    await updateEventObject(currentEventObj, eventId);
    getAndSetEvent();
    checkUserRSVP();
  };

  const handleDeleteEvent = async (eventId) => {
    await deleteEvent(eventId);
    navigate("/events");
  };

  useEffect(() => {
    getAndSetEventAttendees();
  }, [currentEventObj, eventId]);

  useEffect(() => {
    getAndSetEvent();
  }, [eventId, currentUser]);

  useEffect(() => {
    checkUserRSVP();
  }, [eventAttendees, currentUser, currentEventObj]);

  return (
    <section className="event-details">
      <div className="event-details-header">
        <div className="event-header-left">
          <h1>{currentEventObj.name}</h1>
          <Link to={`/details/${currentEventObj.businessId}`}>
            <img
              id="event-details-image"
              src={currentEventObj.business?.image_url}
              alt="meeting location"
            />
          </Link>
        </div>
        <div className="event-header-right">
          <Link to={`/details/${currentEventObj.businessId}`}>
            <h2 id="shop-title">{currentEventObj.business?.name}</h2>
          </Link>
          <h4>
            {getFormattedDate(currentEventObj.date)} - {currentEventObj.time}
          </h4>
          <p>{currentEventObj.details}</p>
          {userAttending ? (
            <button
              className="button"
              id="remove-rsvp-button"
              onClick={(e) => handleDeleteRSVP(currentUser.id)}
            >
              Remove RSVP
            </button>
          ) : (
            <button
              className="button"
              id="rsvp-button"
              onClick={(e) => createRSVP(currentUser.id)}
            >
              RSVP
            </button>
          )}
          {currentUser.admin ? (
            <button
              className="button"
              id="delete-event-button"
              onClick={(e) => handleDeleteEvent(eventId)}
            >
              Delete Event
            </button>
          ) : null}
        </div>
      </div>
      <div className="attendees">
        <div className="attendees-title">
          <h2>RSVPs</h2>
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
