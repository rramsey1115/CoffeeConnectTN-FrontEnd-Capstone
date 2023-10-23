import { useState } from "react";
import { useParams } from "react-router-dom";

export const NewPost = ({ shopObj, currentUser }) => {

  const [newPostObj, setNewPostObj] = useState({
    userId: currentUser?.id,
    coffeeShopId: shopObj?.id,
    text: "",
  });
  
  return (
    <form>
      <textarea
        type="text"
        value={newPostObj?.text}
        placeholder={`Share Your Experience at ${shopObj.name}`}
        className="new-post-body new-post-form-item"
        required
        onChange={(event) => {
          const copy = { ...newPostObj };
          copy.body = event.target.value;
          setNewPostObj(copy);
        }}
      />
    </form>
  );
};
