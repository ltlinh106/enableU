import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../assets/styles/common.css";
const Layout = () => {
  return (
    <div>
      <div className="header-site">
        <Header />
      </div>

      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
