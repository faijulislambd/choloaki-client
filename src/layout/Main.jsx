import React from "react";
import Navbar from "../pages/Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

const Main = () => {
  const { loading } = useAuth();
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Main;
