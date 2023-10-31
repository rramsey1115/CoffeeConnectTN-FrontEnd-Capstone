export const getShopById = (id) => {
  return fetch(`http://localhost:8088/businesses?id=${id}`).then((res) =>
    res.json()
  );
};

export const getShopPostsById = (id) => {
  return fetch(`http://localhost:8088/posts?businessId=${id}`).then((res) =>
    res.json()
  );
};

export const getAllShops = (cityName) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer in1TQZx2L-Gvdw8FbfrbXt4_5JxQgwCmOLtXk_HLFkwdITFs7QpnSwrf77UZAyAuuVSRfweWXilKRou-NULaDW8dkuJRFRh3BOMSDwp2Ed9dfTTw5W-rsKYsp_AuZXYx",
    },
  };

  fetch(
    `https://api.yelp.com/v3/businesses/search?location=${cityName}&radius=10000&categories=coffee&sort_by=best_match&limit=20`,
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};