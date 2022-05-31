import "../styles/Hero.css";
import hero from "../images/hero.jpg";

function Hero() {
  return (
    <div className="hero">
      <img src={hero} alt=""></img>
      <div className="content">
        <div className="logo">webrite</div>
        <div className="tagline">
          <div>Connecting ideas and people</div>
          <div className="sub">Communication starts here</div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
