import { NavLink } from "react-router-dom";

const ActiveNav = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "active btn-primary" : ""
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveNav;
