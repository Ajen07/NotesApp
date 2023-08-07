import React from 'react'
import { navlinks } from "../utils/navlinks";
import { NavLink } from "react-router-dom";
import { useAppContext } from '../Context/appContext';

const Links = () => {
    const{handleToggle}=useAppContext()
  return (
    <>
    <nav className="mobile-nav-menu">
      {navlinks.map((navlink) => {
        const { id, link, text } = navlink;
        return (
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-links active" : "nav-links "
            }
            to={link}
            key={id}
            end
            onClick={handleToggle}
          >
            {text}
          </NavLink>
        );
      })}
    </nav>
    <button>sign out</button>
    </>
  )
}

export default Links