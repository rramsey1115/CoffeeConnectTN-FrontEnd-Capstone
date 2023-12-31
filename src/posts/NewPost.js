import { useState } from "react";
import { CreateNewPost } from "../services/postServices";

export const NewPost = ({
  shopObj,
  currentUser,
  getAndSetPosts,
  toggleCreate,
}) => {

const [newPostObj, setNewPostObj] = useState({
    userId: currentUser?.id,
    businessId: shopObj?.id,
    text: "",
});

  const handleSubmit = () => {
    CreateNewPost(newPostObj).then(getAndSetPosts);
  };

  return (
    <form className="new-post-form">
      <textarea
        type="text"
        value={newPostObj?.text}
        placeholder={`Share Your Experience at ${shopObj?.name}`}
        className="new-post-input"
        onChange={(event) => {
          const copy = { ...newPostObj };
          copy.text = event.target.value;
          setNewPostObj(copy);
        }}
      />
      {newPostObj.text ? (
        <button className="button" onClick={(e) => handleSubmit()}>
          Submit
        </button>
      ) : (
        <button
          className="button"
          id="close-textarea-button"
          onClick={(e) => {
            toggleCreate(false);
          }}
        >
          Close
        </button>
      )}
    </form>
  );
};
