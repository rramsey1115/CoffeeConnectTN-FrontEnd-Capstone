export const getAllEvents = () => {
  return fetch("http://localhost:8088/events?_expand=businessId").then((res) => res.json());
};

export const getEventById = (id) => {
  return fetch(`http://localhost:8088/events/${id}?_expand=business`).then((res) => res.json());
};
