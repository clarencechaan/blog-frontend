import "../styles/Hero.css";
import hero from "../images/hero.jpg";

function Hero() {
  return (
    <div className="hero">
      <img src={hero} alt=""></img>
      <div className="content">
        <div className="logo">webrite</div>
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
