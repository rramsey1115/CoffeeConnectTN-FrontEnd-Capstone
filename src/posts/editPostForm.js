import { useState } from "react";

export const EditPostForm = (post) => {
const currentPost = {...post}
  const [userInput, updatePost] = useState({
    id: currentPost?.id,
    coffeeShopId: post?.coffeeShopId,
    userId: post?.id,
    text: post?.text,
  });

  return (
    <textarea
      type="text"
      rows={6}
    //   value={userInput?.text}
      placeholder={post?.text}
      className="new-post-input"
      onChange={(event) => {
        const copy = { ...userInput };
        copy.text = event.target.value;
        updatePost(copy);
      }}
    ></textarea>
  );
};
