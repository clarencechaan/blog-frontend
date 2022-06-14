import Header from "./Header";
import "../styles/NewPost.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getJWT } from "../scripts/localStorage";
import { Link } from "react-router-dom";

function NewPost({ setLogged, fetchFeed }) {
  const spanRef = useRef(null);
  const imageRef = useRef(null);
  const imgUrlInputRef = useRef(null);
  let navigate = useNavigate();

  async function uploadImage(file) {
    const CLIENT_ID = "0ca5177e28d22b9";

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Client-ID ${CLIENT_ID}`);

    let formdata = new FormData();
    formdata.append("image", file);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    return fetch("https://api.imgur.com/3/image", requestOptions)
      .then((response) => response.text())
      .then((result) => JSON.parse(result).data.link)
      .catch((error) => console.log("error", error));
  }

  async function handleImagePicked(e) {
    if (!e.target.files[0]) return;
    if (e.target.files[0].size > 10485760) {
      alert("File is too big. Max size is 10MB.");
      return;
    }

    spanRef.current.hidden = false;
    spanRef.current.innerText = "Uploading...";
    imageRef.current.hidden = true;
    imageRef.current.src = await uploadImage(e.target.files[0]);
    imageRef.current.hidden = false;
    imgUrlInputRef.current.value = imageRef.current.src;
    spanRef.hidden = true;
  }

  async function uploadPost(event) {
    const img_url = event.target[1].value;
    const title = event.target[2].value;
    const body = event.target[3].value;
    const published = event.target[4].checked;

    const post = { title, body, published, img_url };

    const url = "https://webrite-api.herokuapp.com/api/posts/";
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getJWT(),
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(post),
    });
    const resPost = await response.json();
    return resPost._id;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const postId = await uploadPost(event);
    await fetchFeed();
    navigate("/posts/" + postId);
  }

  return (
    <div className="new-post">
      <Header setLogged={setLogged} />
      <div className="content">
        <h1 className="title">Create New Post</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="data">
            <div className="image-input">
              <label htmlFor="image">
                <span ref={spanRef}>+ Upload an Image (PNG/JPG)</span>
                <img alt="" ref={imageRef} hidden />
              </label>
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg"
                hidden
                onChange={handleImagePicked}
              />
              <input
                id="img-url"
                name="img_url"
                ref={imgUrlInputRef}
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
            <Link to="/admin">Cancel</Link>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
