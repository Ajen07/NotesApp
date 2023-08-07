import React from "react";
import { navlinks } from "../utils/navlinks";
import { NavLink } from "react-router-dom";
import Logo from "../componenets/Logo";
import { useAppContext } from "../Context/appContext";

const Navbar = () => {
  const { logoutUser } = useAppContext();
  return (
    <>
      <div>
        <Logo />
      </div>
      <nav className="dashboard-navbar">
        {navlinks.map((navlink) => {
          const { id, link, text } = navlink;
          return (
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-links active" : "nav-links"
              }
              to={link}
              key={id}
              end
            >
              {text}
            </NavLink>
          );
        })}
      </nav>
      <button type="button" className="btn" onClick={logoutUser}>
        sign out
      </button>
    </>
  );
};

export default Navbar;
