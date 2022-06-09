import { logOut, getMe, isLoggedIn } from "../scripts/localStorage";
import { Link } from "react-router-dom";

function UserButtons({ setLogged }) {
  const me = getMe();

  function handleLogOutBtnClicked() {
    logOut();
    setLogged((logged) => !logged);
  }

  function getUserButtons() {
    if (isLoggedIn()) {
      return (
        <div className="user-log-in">
          <span className="user">
            logged in as{" "}
            <Link to="/admin">
              <span className="username">{me.username}</span>
            </Link>{" "}
            ({me.first_name + " " + me.last_name})
          </span>
          <button
            type="button"
            className="log-out-btn"
            onClick={handleLogOutBtnClicked}
          >
            Log Out
          </button>
        </div>
      );
    } else {
      return (
        <div className="user-log-in">
          <div className="admin-prompt">
            Do you have an account? <Link to="/admin">Log In</Link>
          </div>
        </div>
      );
    }
  }

  return getUserButtons();
}

export default UserButtons;
