import { useRef } from "react";
import "../styles/CommentForm.css";

function CommentForm({ postId }) {
  async function sendPostRequest(event) {
    const text = event.target[0].value;
    const name = event.target[1].value;
    const comment = { text, name };

    const url = "http://localhost:3000/api/posts/" + postId + "/comments";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(comment),
    });
  }

  return (
    <form className="comment-form" action="" onSubmit={sendPostRequest}>
      <h3 className="title">Leave a Reply</h3>
      <label htmlFor="">
        <h4>Message</h4>
      </label>
      <textarea
        name=""
        id=""
        minlength="1"
        maxlength="1000"
        required
      ></textarea>
      <label htmlFor="">
        <h4>Name</h4>
      </label>
      <input type="text" minlength="1" maxlength="42" required />
      <button type="submit">SEND A COMMENT</button>
    </form>
  );
}

export default CommentForm;
