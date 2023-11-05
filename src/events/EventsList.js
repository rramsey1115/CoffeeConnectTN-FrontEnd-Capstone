import "./Events.css";
import { useNavigate } from "react-router-dom";
import { EventCard } from "./EventCard";
import { useEffect, useState } from "react";
import { getAllEvents } from "../services/eventServices";
import { BsFillCalendarPlusFill } from "react-icons/bs";

export const EventsList = ({ currentUser, userLocation }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  const navigate = useNavigate();
  const getAndSetDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    const formattedToday = mm + "/" + dd + "/" + yyyy;
    setCurrentDate(formattedToday);
  };

  const getAndSetAllEvents = () => {
    getAllEvents().then((data) => setAllEvents(data));
  };

  useEffect(() => {
    getAndSetAllEvents();
  }, []);

  useEffect(() => {
    getAndSetDate();
  }, []);

    const compareDates = (d1, d2) => {
      let date1 = new Date(d1.date);
      let date2 = new Date(d2);
      if (date1 > date2) {
        upcomingEvents.push(d1);
      } else {
        pastEvents.push(d1);
      }
    };

    useEffect(() => {
      allEvents?.map((event) => compareDates(event, currentDate));
    }, [currentDate]);

  return (
    <section className="events">
      <div className="events-header">
        <h1 className="events-title">Upcoming Events</h1>
        <BsFillCalendarPlusFill
          className="create-event"
          onClick={(e) => {
            navigate("create");
          }}
        />
      </div>
      <div className="events-list">
        {allEvents?.map((event) => {
          return (
            <div key={event.id}>
              <EventCard eventObj={event} />
            </div>
          );
        })}
      </div>
    </section>
  );
};
