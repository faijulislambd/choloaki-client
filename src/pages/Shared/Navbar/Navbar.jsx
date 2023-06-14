import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./../../../assets/logo/choloaki-logo.svg";
import logoDark from "./../../../assets/logo/choloaki-logo-dark.svg";
import Swal from "sweetalert2";
import useInsertCart from "../../../hooks/useInsertCart";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useRef } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const light = "cupcake";
  const dark = "forest";
  const [currentTheme, setCurrentTheme] = useState(light);
  const checkboxRef = useRef(null);
  const [selectedLogo, setSelectedLogo] = useState(logo);
  const [checked, setChecked] = useState(currentTheme);
  const [role, setRole] = useState("");

  useEffect(() => {
    axios(`https://cholo-aki-server.vercel.app/users/role/${user?.email}`).then(
      (res) => {
        setRole(res.data.role);
      }
    );
  }, []);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      if (localStorage.getItem("theme") === dark) {
        setSelectedLogo(logoDark);
        checkboxRef.current.checked = false;
      }
      setCurrentTheme(localStorage.getItem("theme"));
    } else {
      localStorage.setItem("theme", light);
      setCurrentTheme(light);
    }
  }, []);

  const [cart] = useInsertCart();
  const totalCartCost = cart.reduce((sum, item) => item.price + sum, 0);

  document.querySelector("html").setAttribute("data-theme", currentTheme);

  const handleTheme = (e) => {
    setChecked(!checked);
    console.log(e.target.checked);

    if (currentTheme === light) {
      setCurrentTheme(dark);
      setSelectedLogo(logoDark);
      localStorage.setItem("theme", dark);
    } else {
      setCurrentTheme(light);
      setSelectedLogo(logo);
      localStorage.setItem("theme", light);
    }
  };

  const handleLogOut = () => {
    logout()
      .then(() => {})
      .catch((err) => console.log(err));
    Swal.fire({
      position: "bottom-end",
      icon: "success",
      title: "Come Back Soon!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  document.querySelector("html").setAttribute("data-theme", currentTheme);

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/instructors">Instructors</NavLink>
      </li>
      <li>
        <NavLink to="/classes">Classes</NavLink>
      </li>
    </>
  );

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-200">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <img src={selectedLogo} className="w-24" />
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal space-x-2 py-0">{navLinks}</ul>
          </div>
          <div className="flex-none lg:block">
            <ul className="menu menu-horizontal space-x-2 items-center lg:border-l-2 ps-5 lg:border-slate-300 py-0">
              {!user ? (
                <>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                        <img src={user.photoURL} />
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-40 z-10"
                    >
                      <li className="ps-3 text-primary">{user.displayName}</li>
                      <li>
                        <Link
                          className="justify-between"
                          to={
                            (role === "admin" &&
                              "/dashboard/admin-dashboard") ||
                            (role === "instructor" &&
                              "/dashboard/instructor-dashboard") ||
                            (role === "student" &&
                              "/dashboard/student-dashboard")
                          }
                        >
                          Dashboard
                        </Link>
                      </li>

                      <li>
                        <a onClick={handleLogOut}>Logout</a>
                      </li>
                    </ul>
                  </div>

                  {role === "student" && (
                    <>
                      <div className="dropdown dropdown-end">
                        <label
                          tabIndex={0}
                          className="btn btn-ghost btn-circle"
                        >
                          <div className="indicator">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            <span className="badge badge-sm badge-primary indicator-item">
                              {cart ? cart.length : 0}
                            </span>
                          </div>
                        </label>
                        <div
                          tabIndex={0}
                          className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow z-10"
                        >
                          <div className="card-body">
                            <span className="font-bold text-lg">
                              {cart ? cart.length : 0} Items
                            </span>
                            <span className="text-info">
                              Subtotal: ${totalCartCost ? totalCartCost : 0}
                            </span>
                            <div className="card-actions">
                              <Link
                                className="btn btn-primary btn-block"
                                disable={cart ? "false" : "true"}
                                to="/dashboard/cart"
                              >
                                View cart
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              <li>
                <input
                  type="checkbox"
                  className="toggle toggle-md"
                  ref={checkboxRef}
                  checked={checked}
                  onChange={handleTheme}
                />
              </li>
            </ul>
          </div>
        </div>
        {/* Page content here */}
      </div>
      <div className="drawer-side z-[1000]">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200">{navLinks}</ul>
      </div>
    </div>
  );
};

export default Navbar;
