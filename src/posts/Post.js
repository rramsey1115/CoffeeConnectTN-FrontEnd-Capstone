import { useEffect, useState } from "react";
import { getUserById } from "../services/userServices";
import { FaRegWindowClose } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiCheckboxLine } from "react-icons/ri";
import { deletePostByPostId, editPost } from "../services/postServices";
import { Link } from "react-router-dom";

export const Post = ({ post, currentUser, getAndSetShopPosts }) => {
  const [userImg, setUserImg] = useState("");
  const [edit, toggleEdit] = useState(false);
  const [userInput, updatePost] = useState({
    id: post?.id,
    coffeeShopId: post?.coffeeShopId,
    userId: currentUser?.id,
    text: post?.text,
  });

  useEffect(() => {
    getUserById(post.userId * 1).then((res) => setUserImg(res[0].picture));
  }, [post]);

  const handleDeletePost = (postId) => {
    deletePostByPostId(postId).then(getAndSetShopPosts);
  };

  const handeEditPost = () => {
    toggleEdit(!edit);
  };

  const saveEditedPost = () => {
    editPost(post, userInput).then(getAndSetShopPosts).then(toggleEdit(false));
  };

  return (
    <div className="post-item">
      <div className="post-left">
          <Link to={`/profile/${post.userId}`}>
            <img id="user-picture" src={userImg} alt="user headshot" />
          </Link>
      </div>
      <div className="post-center">
        {edit ? (
          <textarea
            type="text"
            rows={6}
            value={userInput?.text}
            className="new-post-input"
            onChange={(event) => {
              const copy = { ...userInput };
              copy.text = event.target.value;
              updatePost(copy);
            }}
          ></textarea>
        ) : (
          <p className="post-text">{post?.text}</p>
        )}
      </div>
      <div className="post-right">
        {currentUser.id === post?.userId ? (
          <div className="edit-icon">
            {edit ? (
              <RiCheckboxLine
                id="save-icon"
                onClick={(e) => saveEditedPost()}
              />
            ) : (
              <FiEdit
                id="edit-icon"
                onClick={(e) => {
                  handeEditPost();
                }}
              />
            )}
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
