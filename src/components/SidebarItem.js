import { Link } from "react-router-dom";
import { Link as LinkIcon } from "phosphor-react";

function SidebarItem() {
  return (
    <div className="item">
      <Link to="/posts/:postId">
        <div className="img-container">
          <img src="https://i.imgur.com/osBpkIK.jpg" alt="" />
          <div className="blue-overlay">
            <LinkIcon size={32} color="white" />
          </div>
          <div className="comment-badge">0</div>
        </div>
      </Link>
      <div className="info">
        <Link to="/posts/:postId">
          <div className="full-name">RICARDO VALENTINE</div>
        </Link>
        <Link to="/posts/:postId">
          <h3>Trip that you’ll never ever forget</h3>
        </Link>
      </div>
    </div>
  );
}

export default SidebarItem;
