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
