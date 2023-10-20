import { useEffect, useState } from "react";
import { getUserById } from "../services/userServices";
import {FaRegWindowClose} from 'react-icons/fa'
import {FiEdit} from "react-icons/fi"

export const Post = ({ post, currentUser }) => {
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    getUserById(post.userId * 1).then((res) => setUserImg(res[0].picture));
  }, [post]);

  console.log("post", post);
  return (
    <div className="post-item">
      <div className="post-left">
        <img id="user-picture" src={userImg} alt="user headshot" />
      </div>
      <div className="post-center">
        <p className="post-text">{post.text}</p>
      </div>
      <div className="post-right">
        {currentUser.id === post.userId ? <div className="edit-icon"><FiEdit id="edit-icon"/></div> : "" }
        {currentUser.admin ? <div className="delete-icon"><FaRegWindowClose id="delete-icon"/></div>: ""}
      </div>
    </div>
  );
};
