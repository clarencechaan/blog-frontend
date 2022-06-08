import {
  logOut,
  getMe,
  isLoggedIn,
  setMe,
  setJWT,
} from "../scripts/localStorage";
import { useState } from "react";

function UserButtons({ setLogged }) {
  const me = getMe();
  const [message, setMessage] = useState("");

  function handleLogOutBtnClicked() {
    logOut();
    setLogged((logged) => !logged);
  }

  async function handleLogInBtnClicked(event) {
    event.preventDefault();
    await logIn(event.target[0].value, event.target[1].value);
    event.target.reset();
  }

  async function logIn(username, password) {
    const url = "http://localhost:3000/auth/login";
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ username, password }),
    });

    const resObj = await response.json();
    if (resObj.user) {
      setMe(resObj.user);
      setJWT(resObj.token);
      setLogged((logged) => !logged);
    } else {
      setMessage(resObj.info);
    }
  }

  function getUserButtons() {
    if (isLoggedIn()) {
      return (
        <div className="user-log-in">
          <span className="user">
            logged in as <span className="username">{me.username}</span> (
            {me.first_name + " " + me.last_name})
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
          <form action="/" onSubmit={handleLogInBtnClicked}>
            <input type="text" id="username" placeholder="Username" />
            <input type="password" id="password" placeholder="Password" />
            <button type="submit" className="log-in-btn">
              Log In
            </button>
          </form>
        </div>
      );
    }
  }

  return getUserButtons();
}

export default UserButtons;
