import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useStudent from "../hooks/useStudent";
import Loader from "../components/Loader";

const StudentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isStudent, isStudentLoading] = useStudent();
  const location = useLocation();

  if (loading || isStudentLoading) {
    return <Loader></Loader>;
  }

  if (user && isStudent) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default StudentRoute;
