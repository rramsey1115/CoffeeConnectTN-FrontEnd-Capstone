export const getFavoritesByUserId = (id) => {
    return fetch(`http://localhost:8088/favorites?userId=${id}&_expand=user`).then((res) => res.json());
}