import "../styles/Hero.css";
import hero from "../images/hero.jpg";
import { Link } from "react-router-dom";
import { isLoggedIn, logOut, getMe } from "../scripts/localStorage";

function Hero({ setLogged }) {
  const me = getMe();

  function getUserBar() {
    if (isLoggedIn()) {
      return (
        <div className="user-log-in">
          <span className="user">
            logged in as {me.username} ({me.first_name + " " + me.last_name})
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
          <Link to="/login">
            <span className="log-in-btn">Log In</span>
          </Link>
        </div>
      );
    }
  }

  function handleLogOutBtnClicked() {
    logOut();
    setLogged((logged) => !logged);
  }

  return (
    <div className="hero">
      <img src={hero} alt=""></img>
      <div className="content">
        <div className="bar">
          <div className="logo">webrite</div>
          {getUserBar()}
        </div>
        <div className="tagline">
          <div>Get the real story</div>
          <div className="sub">
            Journalism that is independent, honest, and dignified
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
