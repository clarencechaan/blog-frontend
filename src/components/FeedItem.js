import {
  ChatCircle,
  Link as LinkIcon,
  MagnifyingGlassPlus,
} from "phosphor-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/FeedItem.css";
import ImagePreview from "./ImagePreview";

function FeedItem({ imgUrl }) {
  const [imgPreviewVisible, setImgPreviewVisible] = useState(false);

  function toggleImagePreview() {
    setImgPreviewVisible((prev) => !prev);
  }

  return (
    <div className="feed-item-container">
      <ImagePreview
        visible={imgPreviewVisible}
        imgUrl={imgUrl}
        toggleImagePreview={toggleImagePreview}
      />
      <div className="feed-item">
        <div className="img-container">
          <img src={imgUrl} alt="" />
          <div className="blue-overlay">
            <a className="post-link">
              <Link to="/posts/:postId">
                <div className="badge">
                  <LinkIcon size={24} />
                </div>
              </Link>
            </a>
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
            <a className="author">
              <Link to="/posts/:postId">shufflehound</Link>
            </a>
            <a className="date">
              <Link to="/posts/:postId">November 23, 2016</Link>
            </a>
          </div>
          <a className="title">
            <Link to="/posts/:postId">Trip that you’ll never ever forget</Link>
          </a>
          <div className="body">
            Quisque dictum eros nisl, a maximus massa accumsan non. Aliquam erat
            volutpat. Quisque at finibus dui. Quisque dictum eros nisl, a
            maximus massa accumsan non. Aliquam erat volutpat. Quisque at
            finibus dui.Quisque dictum eros nisl, a maximus massa accumsan non.
            Aliquam erat volutpat. Quisque at finibus dui.Quisque dictum eros
            nisl, a maximus massa accumsan non. Aliquam erat volutpat. Quisque
            at finibus dui. Praesent…
          </div>
          <div className="full-name">RICARDO VALENTINE</div>
          <Link to="/posts/:postId">
            <a className="comment-badge">
              <ChatCircle size={18} />
              <div className="count">0</div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeedItem;
