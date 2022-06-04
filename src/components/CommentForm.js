import "../styles/CommentForm.css";

function CommentForm() {
  return (
    <form className="comment-form" action="">
      <h3 className="title">Leave a Reply</h3>
      <label htmlFor="">
        <h4>Message</h4>
      </label>
      <textarea name="" id=""></textarea>
      <label htmlFor="">
        <h4>Name</h4>
      </label>
      <input type="text" />
      <button type="submit">SEND A COMMENT</button>
    </form>
  );
}

export default CommentForm;
