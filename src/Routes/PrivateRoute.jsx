import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../providers/AuthProviders";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  const location = useLocation();
  let from = location?.state?.from?.pathname || "/";
  if (loading) {
    return (
      <div>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
