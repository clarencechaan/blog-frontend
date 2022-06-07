import "../styles/Post.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChatText } from "phosphor-react";
import Sidebar from "./Sidebar";
import ImagePreview from "./ImagePreview";
import CommentForm from "./CommentForm";
import CommentsFeed from "./CommentsFeed";
import hero from "../images/hero.jpg";
import { formatDate } from "../scripts/datetimeConversion";

function Post() {
  const [imgPreviewVisible, setImgPreviewVisible] = useState(false);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    fetchPost();
    fetchComments();
    fetchLatestPosts();
  }, [postId]);

  async function fetchPost() {
    const response = await fetch("http://localhost:3000/api/posts/" + postId);
    const post = await response.json();
    setPost(post);
  }

  async function fetchComments() {
    const response = await fetch(
      "http://localhost:3000/api/posts/" + postId + "/comments"
    );
    const comments = await response.json();
    setComments(comments);
  }

  async function fetchLatestPosts() {
    const response = await fetch(
      "http://localhost:3000/api/posts/published/latest"
    );
    const latest = await response.json();
    setLatestPosts(latest);
  }

  function toggleImagePreview() {
    setImgPreviewVisible((prev) => !prev);
  }

  function splitText(text) {
    if (!text) {
      return;
    }
    const arr = text.split("\n");
    let result = [];
    for (const line of arr) {
      result.push(line);
      result.push(<br />);
      result.push(<br />);
    }
    return result;
  }

  return (
    <div className="post">
      <div className="header">
        <div className="logo">
          <Link to="/">webrite</Link>
        </div>
        <img src={hero} alt="" />
      </div>
      <div className="content-container">
        <div className="content">
          <div className="main">
            <div className="img-container">
              <img
                className="cropped"
                src={post.img_url}
                alt=""
                onClick={toggleImagePreview}
              />
              <ImagePreview
                visible={imgPreviewVisible}
                imgUrl={post.img_url}
                toggleImagePreview={toggleImagePreview}
              />
            </div>
            <h1 className="title">{post.title}</h1>
            <div className="by-line">
              <span className="username">
                by {post.author && post.author.username}
              </span>
              <span>{formatDate(post.publish_date)}</span>
              <span className="full-name">
                {post.author &&
                  (
                    post.author.first_name +
                    " " +
                    post.author.last_name
                  ).toUpperCase()}
              </span>
              <a href="#comments">
                <ChatText size={18} />
                <span className="count">{comments.length}</span>
              </a>
            </div>
            <div className="text">{splitText(post.body)}</div>
            <CommentsFeed comments={comments} />
            <CommentForm postId={postId} />
          </div>
          <Sidebar latestPosts={latestPosts} />
        </div>
      </div>
    </div>
  );
}

export default Post;
