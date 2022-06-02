import "../styles/ImagePreview.css";

function ImagePreview({ visible, imgUrl, toggleImagePreview }) {
  return (
    <div className="image-preview">
      <div
        className={visible ? "overlay visible" : "overlay"}
        onClick={toggleImagePreview}
      ></div>
      <div className="img-container">
        <img className={visible ? "visible" : ""} src={imgUrl} alt="" />
      </div>
    </div>
  );
}

export default ImagePreview;
