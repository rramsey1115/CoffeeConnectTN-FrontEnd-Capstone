import { useEffect, useState } from "react";
import { getShopById } from "../services/shopServices";
import { Link } from "react-router-dom";
import "./Events.css";
import { FaRegWindowClose } from "react-icons/fa";
import { deleteEvent } from "../services/eventServices";

export const EventCard = ({ currentUser, eventObj, getAndSetAllEvents }) => {
  const [eventBusiness, setEventBusiness] = useState({});

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

  const handleDeleteEvent = async (eventId) => {
    console.log("deteled event with eventId " + eventId);
    await deleteEvent(eventId);
    getAndSetAllEvents();
  };

  useEffect(() => {
    getShopById(eventObj.businessId).then((data) => setEventBusiness(data[0]));
  }, [eventObj]);

  return (
    <div className="event-card">
      <div className="event-card-left">
        <Link to={`${eventObj.id}`}>
          <img
            className="event-card-img"
            src={eventBusiness.image_url}
            alt="event business"
          />
        </Link>
      </div>
      <div className="event-card-center">
        <div>
          <Link to={`${eventObj.id}`}>
            <h2 className="event-card-title">{eventObj.name}</h2>
          </Link>
          <p className="event-card-date">
            {getFormattedDate(eventObj.date)} - {eventObj.time}
          </p>
          <p className="event-card-location">
            {eventBusiness?.name} - {eventBusiness.location?.city}
          </p>
          <p className="event-attendees">
            RSVP Count: {eventObj.attendeesId?.length}
          </p>
        </div>
        <div>
          {currentUser?.admin ? (
            <div className="delete-icon">
              <FaRegWindowClose
                id="delete-icon"
                onClick={(e) => {
                  handleDeleteEvent(eventObj.id);
                }}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
