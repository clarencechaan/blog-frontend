import Header from "./Header";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJWT } from "../scripts/localStorage";
import { Link } from "react-router-dom";

function EditPost({ setLogged, fetchFeed }) {
  const [post, setPost] = useState({
    title: "",
    body: "",
    published: false,
    img_url: "",
  });
  const spanRef = useRef(null);
  const imageRef = useRef(null);
  const imgUrlInputRef = useRef(null);
  let navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    fetchPost();
  }, [postId]);

  async function fetchPost() {
    const response = await fetch(
      "https://webrite-api.onrender.com/api/posts/" + postId
    );
    const post = await response.json();
    setPost(post);
    imageRef.current.hidden = false;
  }

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
    const imgUrl = await uploadImage(e.target.files[0]);
    setPost((post) => ({
      ...post,
      img_url: imgUrl,
    }));
    imageRef.current.hidden = false;
    spanRef.hidden = true;
  }

  async function uploadPost() {
    const url = "https://webrite-api.onrender.com/api/posts/" + postId;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getJWT(),
    };

    await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(post),
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await uploadPost(event);
    await fetchFeed();
    navigate("/posts/" + postId);
  }

  function handleTitleChanged(event) {
    setPost((post) => ({ ...post, title: event.target.value }));
  }

  function handleBodyChanged(event) {
    setPost((post) => ({ ...post, body: event.target.value }));
  }

  function handlePublishedChanged(event) {
    setPost((post) => ({ ...post, published: event.target.checked }));
  }

  function handleImgUrlChanged(event) {
    setPost((post) => ({ ...post, img_url: event.target.value }));
  }

  return (
    <div className="new-post">
      <Header setLogged={setLogged} />
      <div className="content">
        <h1 className="title">Edit Post</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="data">
            <div className="image-input">
              <label htmlFor="image">
                <span ref={spanRef} hidden>
                  + Upload an Image (PNG/JPG)
                </span>
                <img src={post.img_url} alt="" ref={imageRef} hidden />
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
                value={post.img_url}
                onChange={handleImgUrlChanged}
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
                value={post.title}
                onChange={handleTitleChanged}
                required
              />
              <label htmlFor="body">Body</label>
              <textarea
                name="body"
                id="body"
                minLength="1"
                maxLength="10000"
                value={post.body}
                onChange={handleBodyChanged}
                required
              />
            </div>
          </div>
          <div className="action-bar">
            <span>Publish</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={post.published}
                onChange={handlePublishedChanged}
              />
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

export default EditPost;
