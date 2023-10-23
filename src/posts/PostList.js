import { useEffect, useState } from "react";
import { getShopPostsById } from "../services/shopServices";
import { Post } from "./Post";
import "./Posts.css";
import { NewPost } from "./NewPost";

export const PostList = ({ shopObj, currentUser }) => {
  const [shopPosts, setShopPosts] = useState([]);
  const [create, toggleCreate] = useState(false);

  const getAndSetShopPosts = () => {
    getShopPostsById(shopObj.id).then((data) => {
      setShopPosts(data);
    });
  };

  useEffect(() => {
    getShopPostsById(shopObj.id).then((data) => {
      setShopPosts(data);
    });
  }, [shopObj]);

  return (
    <>
      <div className="new-post">
        {create ? (
          <NewPost
            shopObj={shopObj}
            currentUser={currentUser}
            getAndSetShopPosts={getAndSetShopPosts}
            toggleCreate={toggleCreate}
          />
        ) : (
          <button className="button" id="create-post-button" onClick={(e) => toggleCreate(true)}>
            Create Post
          </button>
        )}
      </div>
      <div className="post-header">
        <h1>Experiences at {shopObj?.name}</h1>
      </div>
      <div className="post-list">
        {shopPosts.map((post) => {
          return (
            <Post
              key={post?.id}
              post={post}
              currentUser={currentUser}
              getAndSetShopPosts={getAndSetShopPosts}
            />
          );
        })}
      </div>
    </>
  );
};
