export const deletePostByPostId = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`, { method: "DELETE" });
};

export const editPost = (post, userInput) => {
  return fetch(`http://localhost:8088/posts/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
};

export const getPostById = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`).then((res) =>
    res.json()
  );
};

export const CreateNewPost = (createdPostObj) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createdPostObj),
  })
  .then((res) => res.json());
};
