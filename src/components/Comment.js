import { getTimeAgo } from "../scripts/datetimeConversion";

function Comment({ comment }) {
  return (
    <div className="comment">
      <div className="by-line">
        <span className="username">{comment.name}</span>
        <span>{getTimeAgo(comment.timestamp)}</span>
      </div>
      <div className="text">{comment.text} </div>
    </div>
  );
}

export default Comment;
