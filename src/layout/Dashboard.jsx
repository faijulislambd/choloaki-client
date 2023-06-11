import { Outlet } from "react-router-dom";
import SideBar from "../pages/Shared/Dashboard/SideBar";
import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", "lemonade");
  }, []);

  return (
    <>
      <SideBar>
        <Outlet></Outlet>
      </SideBar>
    </>
  );
};

export default Dashboard;
