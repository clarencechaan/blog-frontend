import Header from "./Header";
import LogIn from "./LogIn";
import "../styles/AdminDash.css";
import { isLoggedIn } from "../scripts/localStorage";
import { getMe } from "../scripts/localStorage";
import DashPost from "./DashPost";
import DashNewPost from "./DashNewPost";

function AdminDash({ setLogged, posts, fetchFeed }) {
  const myPosts = getMe()
    ? posts.filter((post) => post.author._id === getMe()._id)
    : [];

  return (
    <div className="admin-dash">
      <Header setLogged={setLogged} />
      {isLoggedIn() ? <h1 className="title">Your Posts</h1> : null}
      {!isLoggedIn() ? (
        <LogIn setLogged={setLogged} />
      ) : (
        <div className="content">
          <div className="post-list">
            <DashNewPost />
            {myPosts.map((post) => (
              <DashPost post={post} fetchFeed={fetchFeed} key={post._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDash;
