import { Link } from "react-router-dom";
import { Link as LinkIcon } from "phosphor-react";
import { useEffect, useState } from "react";

function SidebarItem({ post }) {
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    fetchCommentCount();
  }, []);

  async function fetchCommentCount() {
    const response = await fetch(
      "http://localhost:3000/api/posts/" + post._id + "/comments"
    );
    const comments = await response.json();
    setCommentCount(comments.length);
  }

  const linkUrl = "/posts/" + post._id;

  return (
    <div className="item">
      <Link to={linkUrl}>
        <div className="img-container">
          <img src={post.img_url} alt="" />
          <div className="blue-overlay">
            <LinkIcon size={32} color="white" />
          </div>
          <div className="comment-badge">{commentCount}</div>
        </div>
      </Link>
      <div className="info">
        <Link to={linkUrl}>
          <div className="full-name">
            {(
              post.author.first_name +
              " " +
              post.author.last_name
            ).toUpperCase()}
          </div>
        </Link>
        <Link to={linkUrl}>
          <h3>{post.title}</h3>
        </Link>
      </div>
    </div>
  );
}

export default SidebarItem;
