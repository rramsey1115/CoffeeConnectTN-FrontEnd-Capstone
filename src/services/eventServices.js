export const getAllEvents = () => {
  return fetch("http://localhost:8088/events?_expand=businessId").then((res) =>
    res.json()
  );
};

export const getEventById = (id) => {
  return fetch(`http://localhost:8088/events/${id}?_expand=business`).then(
    (res) => res.json()
  );
};

export const createNewEvent = (createdEventObj) => {
  return fetch("http://localhost:8088/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createdEventObj),
  }).then((res) => res.json());
};

export const updateEventObject = (updatedEventObj, eventId) => {
  return fetch(`http://localhost:8088/events/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEventObj),
  });
};

export const deleteEvent = (eventId) => {
  return fetch(`http://localhost:8088/events/${eventId}`, { method: "DELETE" });
};