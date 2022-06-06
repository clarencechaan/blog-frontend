import {
  ChatCircle,
  Link as LinkIcon,
  MagnifyingGlassPlus,
} from "phosphor-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/FeedItem.css";
import ImagePreview from "./ImagePreview";

function FeedItem({ post, updateHeights }) {
  const { author, title, body, publish_date, img_url } = post;
  const [imgPreviewVisible, setImgPreviewVisible] = useState(false);
  const [hidden, setHidden] = useState(true);

  function toggleImagePreview() {
    setImgPreviewVisible((prev) => !prev);
  }

  useEffect(() => {
    setImgPreviewVisible(false);
  }, [post]);

  return (
    <div
      className={hidden ? "feed-item-container hidden" : "feed-item-container"}
    >
      <ImagePreview
        visible={imgPreviewVisible}
        imgUrl={img_url}
        toggleImagePreview={toggleImagePreview}
      />
      <div className="feed-item" id={post._id}>
        <div className="img-container">
          <img
            src={img_url}
            alt=""
            onLoad={() => {
              updateHeights();
              setHidden(false);
            }}
          />
          <div className="blue-overlay">
            <div className="post-link">
              <Link to="/posts/:postId">
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
              <Link to="/posts/:postId">{author.username}</Link>
            </span>
            <span className="date">
              <Link to="/posts/:postId">November 23, 2016</Link>
            </span>
          </div>
          <h2 className="title">
            <Link to="/posts/:postId">{title}</Link>
          </h2>
          <div className="body">{body}</div>
          <div className="full-name">
            {(author.first_name + " " + author.last_name).toUpperCase()}
          </div>
          <Link to="/posts/:postId">
            <div className="comment-badge">
              <ChatCircle size={18} />
              <div className="count">0</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeedItem;
