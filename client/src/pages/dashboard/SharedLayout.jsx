import React from "react";
import Navbar from "../../componenets/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../../componenets/Sidebar";
import { useAppContext } from "../../Context/appContext";
import ButtonContainer from "../../componenets/ButtonContainer";
const SharedLayout = () => {
  const { numofPages } = useAppContext();
  return (
    <main className="dashboard-main">
      <div className="dashboard">
        <Navbar />
      </div>
      <div className="dashboard-navbar-mobile-menu">
        <Sidebar />
      </div>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </main>
  );
};

export default SharedLayout;
