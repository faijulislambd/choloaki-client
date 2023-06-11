import {
  FaCartArrowDown,
  FaDashcube,
  FaHome,
  FaPenSquare,
  FaUser,
  FaUserFriends,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
const SideBar = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-4">
        {children}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content space-y-3">
          {/* Sidebar content here */}
          <li>
            <NavLink to="/dashboard/my-dashboard">
              <FaUser></FaUser> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/users">
              <FaUsers></FaUsers> All Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/classes">
              <FaDashcube></FaDashcube> Manage Classes
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-classes">
              <FaDashcube></FaDashcube> My Classes
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/new-class">
              <FaPenSquare></FaPenSquare> Create Class
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">
              <FaCartArrowDown></FaCartArrowDown> My Cart
            </NavLink>
          </li>
          <div className="divider py-4"></div>
          <li>
            <Link to="/">
              <FaHome></FaHome> Home
            </Link>
          </li>
          <li>
            <Link to="/instructors">
              <FaUserFriends></FaUserFriends> Instructors
            </Link>
          </li>
          <li>
            <Link to="/classes">
              <FaUserGraduate></FaUserGraduate> Classes
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
