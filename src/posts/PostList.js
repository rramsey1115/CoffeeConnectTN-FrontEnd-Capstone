import { useEffect, useState } from "react";
import { getShopPostsById } from "../services/shopServices";
import { Post } from "./Post";
import "./Posts.css";

export const PostList = ({ shopObj, currentUser }) => {
  const [shopPosts, setShopPosts] = useState([]);

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
