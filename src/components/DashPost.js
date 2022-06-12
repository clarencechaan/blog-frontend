import { formatDate } from "../scripts/datetimeConversion";
import { Link } from "react-router-dom";
import { getJWT } from "../scripts/localStorage";
import { useState } from "react";

function DashPost({ post, fetchFeed }) {
  const [confirmDeleteShown, setConfirmDeleteShown] = useState(false);
  async function updatePublished(event) {
    const url = "http://localhost:3000/api/posts/" + post._id;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getJWT(),
    };
    const updatedPublished = event.target.checked;
    const updatedPost = { ...post, published: updatedPublished };

    await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(updatedPost),
    });
    fetchFeed();
  }

  async function deletePost() {
    const url = "http://localhost:3000/api/posts/" + post._id;
    const headers = {
      Authorization: "Bearer " + getJWT(),
    };

    await fetch(url, {
      method: "DELETE",
      headers: headers,
    });
    await fetchFeed();
    setConfirmDeleteShown(false);
  }

  function handleDeleteBtnClicked() {
    setConfirmDeleteShown(true);
  }

  function handleCancelBtnClicked() {
    setConfirmDeleteShown(false);
  }

  return (
    <div className="dash-post">
      <div className="img-container">
        <Link to={"/posts/" + post._id}>
          <img src={post.img_url} alt="" />
        </Link>
      </div>
      <div className="info">
        <Link to={"/posts/" + post._id}>
          <h3 className="title">{post.title}</h3>
        </Link>
        <div className="date">{formatDate(post.publish_date)}</div>
        {!confirmDeleteShown ? (
          <div className="actions">
            <span>Published?</span>
            <label className="published switch">
              <input
                type="checkbox"
                defaultChecked={post.published}
                onChange={updatePublished}
              />
              <span className="slider round"></span>
            </label>
            <Link to={"/posts/" + post._id + "/edit"}>Edit</Link>
            <button className="delete-btn" onClick={handleDeleteBtnClicked}>
              Delete
            </button>
          </div>
        ) : (
          <div className="actions">
            <span className="delete-msg">Delete forever?</span>
            <button className="cancel" onClick={handleCancelBtnClicked}>
              Cancel
            </button>
            <button className="confirm-delete" onClick={deletePost}>
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashPost;
