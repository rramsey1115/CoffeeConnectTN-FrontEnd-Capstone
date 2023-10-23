import { useEffect, useState } from "react";
import { getUserById } from "../services/userServices";
import { FaRegWindowClose } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiCheckboxLine } from "react-icons/ri";
import { deletePostByPostId } from "../services/postServices";
import { EditPostForm } from "./editPostForm";

export const Post = ({ post, currentUser, getAndSetShopPosts }) => {
  const [userImg, setUserImg] = useState("");
  const [edit, toggleEdit] = useState(false);

  useEffect(() => {
    getUserById(post.userId * 1).then((res) => setUserImg(res[0].picture));
  }, [post]);

  const handleDeletePost = (postId) => {
    deletePostByPostId(postId).then(getAndSetShopPosts);
  };

  const handeEditPost = () => {
    toggleEdit(!edit);
    console.log("Edit clicked");
  };

  const saveEditPost = () => {
    toggleEdit()
  }

  return (
    <div className="post-item">
      <div className="post-left">
        <img id="user-picture" src={userImg} alt="user headshot" />
      </div>
      <div className="post-center">
        {edit ? (
          <EditPostForm post={post} />
        ) : (
          <p className="post-text">{post.text}</p>
        )}
      </div>
      <div className="post-right">
        {currentUser.id === post.userId ? (
          <div className="edit-icon">
            {edit ? <RiCheckboxLine id="save-icon" onClick={saveEditPost} /> : <FiEdit
              id="edit-icon"
              onClick={(e) => {
                handeEditPost();
              }}
            />}
          </div>
        ) : (
          ""
        )}
        {currentUser.admin || currentUser.id === post.userId ? (
          <div className="delete-icon">
            <FaRegWindowClose
              id="delete-icon"
              onClick={(e) => {
                handleDeletePost(post.id);
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
