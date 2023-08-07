import React from "react";
import { Link } from "react-router-dom";
import main from "../assets/images/landinglogo2.svg";
import Logo from "../componenets/Logo";

const Landing = () => {
  return (
    <main className="main-container">
      <nav className="nav">
        <Logo />
        <h3>Note It</h3>
      </nav>
      <div className="container">
        <div className="landing-info">
          <h1>
            Notes <span>Making</span> Application
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rerum
            molestiae ipsam enim quia commodi minus nihil officia a ullam quas
            repellat amet dicta hic nisi qui consequuntur nemo, provident
            laboriosam excepturi. Natus, voluptatem? Praesentium vitae quidem
          </p>
          <Link to="/register" className="link">
            Login / Register
          </Link>
        </div>
        <img src={main} alt="Notes main Logo" className="image" />
      </div>
    </main>
  );
};

export default Landing;
