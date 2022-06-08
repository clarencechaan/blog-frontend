import { setMe, setJWT } from "../scripts/localStorage";
import { useNavigate } from "react-router-dom";

function LogIn({ setLogged }) {
  const navigate = useNavigate();

  function handleSubmitted(event) {
    event.preventDefault();
    logIn(event.target[0].value, event.target[1].value);
    navigate("/");
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

    const { user, token } = await response.json();
    if (user) {
      setMe(user);
      setJWT(token);
      setLogged((logged) => !logged);
    }
  }

  return (
    <div>
      <form action="/" onSubmit={handleSubmitted}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LogIn;
