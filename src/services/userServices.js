export const getNonAdminUsers = () => {
  return fetch("http://localhost:8088/users?admin=false").then((res) =>
    res.json()
  );
};

export const getAdminUsers = () => {
  return fetch("http://localhost:8088/users?admin=true").then((res) =>
    res.json()
  );
};

export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  );
};

export const createUser = (customer) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((res) => res.json());
};

export const getCurrentUserById = (id) => {
  return fetch(`http://localhost:8088/users?id=${id}`).then(res => res.json())
}