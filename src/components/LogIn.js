import { setMe, setJWT } from "../scripts/localStorage";
import { useState } from "react";

function LogIn({ setLogged }) {
  const [message, setMessage] = useState("");

  async function handleLogInBtnClicked(event) {
    event.preventDefault();
    await logIn(event.target[0].value, event.target[1].value);
    event.target.reset();
  }

  async function logIn(username, password) {
    const url = "https://webrite-api.onrender.com/auth/login";
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

  return (
    <div className="log-in">
      <form action="/" onSubmit={handleLogInBtnClicked}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button type="submit" className="log-in-btn">
          Log In
        </button>
        <div className="message">{message}</div>
      </form>
    </div>
  );
}

export default LogIn;
