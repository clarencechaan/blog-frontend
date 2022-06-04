import "../styles/Post.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChatText } from "phosphor-react";
import Sidebar from "./Sidebar";
import ImagePreview from "./ImagePreview";
import CommentForm from "./CommentForm";

function Post() {
  const [imgPreviewVisible, setImgPreviewVisible] = useState(false);

  function toggleImagePreview() {
    setImgPreviewVisible((prev) => !prev);
  }

  return (
    <div className="post">
      <div className="header">
        <div className="logo">
          <Link to="/">webrite</Link>
        </div>
      </div>
      <div className="content-type-bar">
        <div className="content-type-title">Blog Post</div>
      </div>
      <div className="content-container">
        <div className="content">
          <div className="main">
            <div className="img-container">
              <img
                className="cropped"
                src="https://i.imgur.com/osBpkIK.jpg"
                alt=""
                onClick={toggleImagePreview}
              />
              <ImagePreview
                visible={imgPreviewVisible}
                imgUrl="https://i.imgur.com/osBpkIK.jpg"
                toggleImagePreview={toggleImagePreview}
              />
            </div>
            <h1 className="title">Trip that you’ll never ever forget</h1>
            <div className="by-line">
              <span className="username">by shufflehound</span>
              <span>November 23, 2016</span>
              <span className="full-name">RICARDO VALENTINE</span>
              <a href="#">
                <ChatText size={18} />
                <span className="count">0</span>
              </a>
            </div>
            <div className="text">
              Quisque dictum eros nisl, a maximus massa accumsan non. Aliquam
              erat volutpat. Quisque at finibus dui. Praesent cursus, dui sed
              tempus mollis, turpis ex porta lacus, ut egestas justo nibh in
              nisi. Donec arcu enim, congue in nunc ut, cursus sollicitudin
              urna. Pellentesque magna purus, accumsan varius mi et, gravida
              consectetur purus. Etiam mattis molestie aliquet. Aenean diam
              enim, faucibus et sodales id, iaculis vitae lectus. Duis sed
              consequat quam. Ut tincidunt eleifend pretium. Suspendisse nisl
              turpis, dapibus ac vestibulum nec, venenatis eu arcu. Etiam et
              fermentum ante. Curabitur eget diam sem. Fusce pulvinar turpis vel
              arcu pharetra bibendum. Integer leo libero, convallis nec nisi eu,
              aliquam tempus leo.
            </div>
            <CommentForm />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Post;
