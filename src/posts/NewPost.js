import { useState } from "react";
import { CreateNewPost } from "../services/postServices";

export const NewPost = ({ shopObj, currentUser, getAndSetPosts }) => {
  const [newPostObj, setNewPostObj] = useState({
    userId: currentUser?.id,
    coffeeShopId: shopObj?.id,
    text: "",
  });

  const handleSubmit = () => {
    CreateNewPost(newPostObj).then(getAndSetPosts);
  };

  return (
    <form className="new-post-form">
      <textarea
        type="text"
        rows={6}
        value={newPostObj?.text}
        placeholder={`Share Your Experience at ${shopObj?.name}`}
        className="new-post-body"
        required
        onChange={(event) => {
          const copy = { ...newPostObj };
          copy.text = event.target.value;
          setNewPostObj(copy);
        }}
      />
      <button className="button" onClick={(e) => handleSubmit()}>
        Submit
      </button>
    </form>
  );
};
