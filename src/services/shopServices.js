export const getShopById = (id) => {
    return fetch(`http://localhost:8088/businesses?id=${id}`).then(res => res.json());
}

export const getShopPostsById = (id) => {
    return fetch(`http://localhost:8088/posts?coffeeShopId=${id}`).then(res => res.json());
}