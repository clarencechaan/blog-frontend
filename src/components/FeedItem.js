import "../styles/FeedItem.css";
import { ChatCircle } from "phosphor-react";

function FeedItem() {
  return (
    <div className="feed-item">
      <div className="img-container">
        <img src="https://i.imgur.com/osBpkIK.jpg" alt="" />
        <div className="blue-overlay"></div>
      </div>
      <div className="content-preview">
        <div className="by-line">
          <span className="author">by shufflehound</span>
          <span className="date">November 23, 2016</span>
        </div>
        <div className="title">Trip that you’ll never ever forget</div>
        <div className="body">
          Quisque dictum eros nisl, a maximus massa accumsan non. Aliquam erat
          volutpat. Quisque at finibus dui. Praesent…
        </div>
        <div className="full-name">RICARDO VALENTINE</div>
        <div className="comment-badge">
          <ChatCircle size={18} />
          <div className="count">0</div>
        </div>
      </div>
    </div>
  );
}

export default FeedItem;
