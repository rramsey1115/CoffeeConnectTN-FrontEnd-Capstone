import { useEffect, useState } from "react";
import { getShopById } from "../services/shopServices";

export const EventCard = ({ eventObj }) => {
  const [eventBusiness, setEventBusiness] = useState({});

  useEffect(() => {
    getShopById(eventObj.businessId).then((data) => setEventBusiness(data[0]));
  }, [eventObj]);

//   console.log("eventBusiness", eventBusiness);

  return (
    <div className="event-card">
      <div className="event-card-left">
        <img
          className="event-card-img"
          src={eventBusiness.image_url}
          alt="event business"
        />
      </div>
      <div className="event-card-right">
        <h2 className="event-card-title">{eventObj.name}</h2>
        <p className="event-card-date">
          {eventObj.date} - {eventObj.time}
        </p>
        <p className="event-card-location">
          {eventBusiness?.name} - {eventBusiness.location?.city}
        </p>
      </div>
    </div>
  );
};
