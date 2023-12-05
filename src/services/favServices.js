export const getFavoritesByUserId = (id) => {
    return fetch(`http://localhost:8088/favorites?userId=${id}&_expand=user&_expand=business`).then((res) => res.json());
}

export const deleteFromFavorites = (favoriteId) => {
    return fetch(`http://localhost:8088/favorites/${favoriteId}`, { method: "DELETE" });
}

export const addToFavorites = (createdFavoriteObj) => {
return fetch(`http://localhost:8088/favorites`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(createdFavoriteObj),
    })
    .then(res => res.json());
};
