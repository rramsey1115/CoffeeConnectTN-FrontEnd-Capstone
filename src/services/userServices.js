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

export const getUserById = (id) => {
  return fetch(`http://localhost:8088/users?id=${id}`).then(res => res.json())
}

export const getUserWithPostsById = (id) => {
  return fetch(`http://localhost:8088/users?id=${id}&_embed=posts`).then(res => res.json())
}

export const UpdateProfile = (userId, userChoices) => {
  // console.log(JSON.stringify(userChoices))
    return fetch(`http://localhost:8088/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userChoices),
    });
  };