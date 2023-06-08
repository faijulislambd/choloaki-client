import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./../../../assets/logo/choloaki-logo.svg";
import logoDark from "./../../../assets/logo/choloaki-logo-dark.svg";

const Navbar = () => {
  const [selectedLogo, setSelectedLogo] = useState(logo);
  const [checked, setChecked] = useState(true);

  const light = "cupcake";
  const dark = "forest";

  const [currentTheme, setCurrentTheme] = useState(light);
  document.querySelector("html").setAttribute("data-theme", currentTheme);

  const handleTheme = () => {
    setChecked(!checked);

    if (currentTheme === light) {
      setCurrentTheme(dark);
      setSelectedLogo(logoDark);
    }
    if (currentTheme === dark) {
      setCurrentTheme(light);
      setSelectedLogo(logo);
    }
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
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <input
                  type="checkbox"
                  className="toggle toggle-md"
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
