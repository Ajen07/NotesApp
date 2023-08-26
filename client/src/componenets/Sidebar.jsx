import React from "react";
import { navlinks } from "../utils/navlinks";
import { NavLink } from "react-router-dom";
import Logo from "../componenets/Logo";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useAppContext } from "../Context/appContext";
import Links from "./Links";

const Sidebar = () => {
  const { toggleMenu, handleToggle } = useAppContext();
  return (
    <>
      <div>
        <Logo />
      </div>

      {toggleMenu ? (
        <>
          <div className="mobile-menu close" onClick={handleToggle}>
            <RxCross1 />
          </div>
          <Links />
        </>
      ) : (
        <div className="mobile-menu" onClick={handleToggle}>
          <GiHamburgerMenu />
        </div>
      )}
    </>
  );
};

export default Sidebar;
