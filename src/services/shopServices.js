export const getShopById = (id) => {
    return fetch(`http://localhost:8088/businesses?id=${id}`).then(res => res.json());
}

export const getShopPostsById = (id) => {
    return fetch(`http://localhost:8088/posts?businessId=${id}`).then(res => res.json());
}