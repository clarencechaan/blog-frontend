import { ChatCircle, Link, MagnifyingGlassPlus } from "phosphor-react";
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
            <a href="##" className="post-link">
              <div className="badge">
                <Link size={24} />
              </div>
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
            <a href="##" className="author">
              shufflehound
            </a>
            <a href="##" className="date">
              November 23, 2016
            </a>
          </div>
          <a href="##" className="title">
            Trip that you’ll never ever forget
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
          <a href="##" className="comment-badge">
            <ChatCircle size={18} />
            <div className="count">0</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default FeedItem;
