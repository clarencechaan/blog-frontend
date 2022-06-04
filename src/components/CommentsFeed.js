import "../styles/CommentsFeed.css";
import Comment from "./Comment";

function CommentsFeed() {
  return (
    <div className="comments-feed-container">
      <h3 className="comments-title">5 comments</h3>
      <div className="comments-feed" id="comments">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  );
}

export default CommentsFeed;
