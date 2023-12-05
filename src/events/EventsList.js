import "./Events.css";
import { useNavigate } from "react-router-dom";
import { EventCard } from "./EventCard";
import { useEffect, useState } from "react";
import { getAllEvents } from "../services/eventServices";
import { BsFillCalendarPlusFill } from "react-icons/bs";

export const EventsList = ({ currentUser, userLocation }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const navigate = useNavigate();

  const getAndSetDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    const formattedToday = yyyy + "-" + mm + "-" + dd;
    setCurrentDate(formattedToday);
  };

  const getAndSetAllEvents = () => {
    getAllEvents().then((data) => {
      const sortedByDateArray = data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setAllEvents(sortedByDateArray);
    });
  };

  const filterDates = () => {
    const upcomingArray = [];
    const pastArray = [];
    allEvents?.map((ev) => {
      ev.date > currentDate ? upcomingArray.push(ev) : pastArray.push(ev);
    });
    setUpcomingEvents(upcomingArray);
    setPastEvents(pastArray);
  };

  useEffect(() => {
    getAndSetDate();
  }, []);

  useEffect(() => {
    getAndSetAllEvents();
  }, []);

  useEffect(() => {
    filterDates();
  }, [allEvents]);

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
        {upcomingEvents?.map((event) => {
          return (
            <div key={event.id}>
              <EventCard
                eventObj={event}
                getAndSetAllEvents={getAndSetAllEvents}
                currentUser={currentUser}
              />
            </div>
          );
        })}
      </div>
      <div className="events-header">
        <h1 className="events-title">Past Events</h1>
      </div>
      <div className="events-list">
        {pastEvents?.map((event) => {
          return (
            <div key={event.id}>
              <EventCard
                eventObj={event}
                getAndSetAllEvents={getAndSetAllEvents}
                currentUser={currentUser}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
