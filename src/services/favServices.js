export const getFavoritesByUserId = (id) => {
    return fetch(`http://localhost:8088/favorites?userId=${id}&_expand=user&_expand=business`).then((res) => res.json());
}