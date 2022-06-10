import { Link } from "react-router-dom";

function DashNewPost() {
  return (
    <Link to="/new">
      <div className="dash-post new">+ Create New Post</div>
    </Link>
  );
}

export default DashNewPost;
