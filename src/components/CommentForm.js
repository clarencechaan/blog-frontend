import "../styles/CommentForm.css";

function CommentForm({ postId, fetchComments }) {
  async function sendPostRequest(event) {
    const text = event.target[0].value;
    const name = event.target[1].value;
    const comment = { text, name };

    const url = "http://localhost:3000/api/posts/" + postId + "/comments";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(comment),
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await sendPostRequest(event);
    await fetchComments();
    clearForm(event);
    scrollToComments();
  }

  function clearForm(event) {
    event.target.reset();
  }

  function scrollToComments() {
    window.location.href = "#a";
    window.location.href = "#comments";
  }

  return (
    <form className="comment-form" action="" onSubmit={handleSubmit}>
      <h3 className="title">Leave a Reply</h3>
      <label htmlFor="">
        <h4>Message</h4>
      </label>
      <textarea
        name=""
        id=""
        minLength="1"
        maxLength="1000"
        required
      ></textarea>
      <label htmlFor="">
        <h4>Name</h4>
      </label>
      <input type="text" minLength="1" maxLength="42" required />
      <button type="submit">SEND A COMMENT</button>
    </form>
  );
}

export default CommentForm;
