import "../styles/CommentsFeed.css";
import Comment from "./Comment";

function CommentsFeed({ comments }) {
  return (
    <div id="comments" className="comments-feed-container">
      <h3 className="comments-title">{comments.length} comments</h3>
      {comments.length ? (
        <div className="comments-feed">
          {comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default CommentsFeed;
