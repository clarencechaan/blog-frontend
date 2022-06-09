import Header from "./Header";
import LogIn from "./LogIn";
import "../styles/AdminDash.css";
import { isLoggedIn } from "../scripts/localStorage";
import { getMe } from "../scripts/localStorage";

function AdminDash({ setLogged, posts }) {
  const [myPosts, setMyPosts] = posts.filter(
    (post) => post.author._id === getMe()._id
  );
  return (
    <div className="admin-dash">
      <Header setLogged={setLogged} />
      <h1 className="title">Admin Dash</h1>
      {!isLoggedIn() ? (
        <LogIn setLogged={setLogged} />
      ) : (
        <div className="content"></div>
      )}
    </div>
  );
}

export default AdminDash;
