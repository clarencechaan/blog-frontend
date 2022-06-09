import { Link } from "react-router-dom";
import UserButtons from "./UserButtons";
import hero from "../images/hero.jpg";

function Header({ setLogged }) {
  return (
    <div className="header">
      <div className="bar">
        <div className="logo">
          <Link to="/">webrite</Link>
        </div>
        <UserButtons setLogged={setLogged} />
      </div>
      <img src={hero} alt="" />
    </div>
  );
}

export default Header;
