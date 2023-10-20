import { useEffect, useState } from "react";
import { getShopPostsById } from "../services/shopServices";
import { Post } from "./Post";
import "./Posts.css"

export const PostList = ({ shopObj, currentUser }) => {
  const [shopPosts, setShopPosts] = useState([]);

  useEffect(() => {
    getShopPostsById(shopObj.id).then((res) => setShopPosts(res));
  }, [shopObj]);

  return (
    <>
      <div className="post-header">
        <h1>Experiences at {shopObj?.name}</h1>
      </div>
      <div className="post-list">
        {shopPosts?.map((post) => {
          return <Post key={post?.id} post={post} currentUser={currentUser}/>;
        })}
      </div>
    </>
  );
};
