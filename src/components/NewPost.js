import Header from "./Header";
import "../styles/NewPost.css";

function NewPost({ setLogged }) {
  const imgUrl = "https://i.imgur.com/QZ5lNQQ.jpg";
  return (
    <div className="new-post">
      <Header setLogged={setLogged} />
      <div className="content">
        <h1 className="title">Create New Post</h1>
        <form action="">
          <div className="data">
            <div className="image-input">
              <label htmlFor="image">
                <span>+ Upload an Image (PNG/JPG)</span>
                <img alt="" />
              </label>
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg"
                hidden
                required
              />
            </div>
            <div className="text-input">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                minLength="1"
                maxLength="42"
                required
              />
              <label htmlFor="body">Body</label>
              <textarea
                name="body"
                id="body"
                minLength="1"
                maxLength="10000"
                required
              ></textarea>
            </div>
          </div>
          <div className="action-bar">
            <span>Publish</span>
            <label className="switch">
              <input type="checkbox" defaultChecked={true} />
              <span className="slider round"></span>
            </label>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
