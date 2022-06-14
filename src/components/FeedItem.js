import {
  ChatCircle,
  Link as LinkIcon,
  MagnifyingGlassPlus,
} from "phosphor-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/FeedItem.css";
import ImagePreview from "./ImagePreview";
import { formatDate } from "../scripts/datetimeConversion";

function FeedItem({ post }) {
  const { author, title, body, publish_date, img_url } = post;
  const [imgPreviewVisible, setImgPreviewVisible] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const linkUrl = "/posts/" + post._id;

  useEffect(() => {
    fetchCommentCount();
  });

  function toggleImagePreview() {
    setImgPreviewVisible((prev) => !prev);
  }

  async function fetchCommentCount() {
    const url =
      "https://webrite-api.herokuapp.com/api/posts/" + post._id + "/comments";
    const response = await fetch(url);
    const comments = await response.json();
    setCommentCount(comments.length);
    return comments.length;
  }

  useEffect(() => {
    setImgPreviewVisible(false);
  }, [post]);

  return (
    <div className="feed-item-container">
      <ImagePreview
        visible={imgPreviewVisible}
        imgUrl={img_url}
        toggleImagePreview={toggleImagePreview}
      />
      <div className="feed-item" id={post._id}>
        <div className="img-container">
          <img src={img_url} alt="" />
          <div className="blue-overlay">
            <div className="post-link">
              <Link to={linkUrl}>
                <div className="badge">
                  <LinkIcon size={24} />
                </div>
              </Link>
            </div>
            <button className="full-size" onClick={toggleImagePreview}>
              <div className="badge">
                <MagnifyingGlassPlus size={24} />
              </div>
            </button>
          </div>
        </div>
        <div className="content-preview">
          <div className="by-line">
            by{" "}
            <span className="author">
              <Link to={linkUrl}>{author.username}</Link>
            </span>
            <span className="date">
              <Link to={linkUrl}>{formatDate(publish_date)}</Link>
            </span>
          </div>
          <h2 className="title">
            <Link to={linkUrl}>{title}</Link>
          </h2>
          <div className="body">{body}</div>
          <div className="full-name">
            {(author.first_name + " " + author.last_name).toUpperCase()}
          </div>
          <Link to={linkUrl}>
            <div className="comment-badge">
              <ChatCircle size={18} />
              <div className="count">{commentCount}</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeedItem;
