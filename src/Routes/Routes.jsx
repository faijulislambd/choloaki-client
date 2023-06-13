import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../layout/Main";
import Instructors from "../pages/Instructors/Instructors/Instructors";
import Courses from "../pages/Courses/Courses/Courses";
import Login from "../pages/LoginRegister/Login/Login";
import Register from "../pages/LoginRegister/Register/Register";
import MyCart from "../pages/Dashboard/MyCart/MyCart";
import Dashboard from "../layout/Dashboard";
import UserDashboard from "../pages/Dashboard/UserDashboard/UserDashboard";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import TeacherClasses from "../pages/Dashboard/TeacherClasses/TeacherClasses";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import CreateClass from "../pages/Dashboard/CreateClass/CreateClass";
import InstructorRoute from "./InstructorRoute";
import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";
import Payment from "../pages/Dashboard/MyCart/Payment";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
      },
      {
        path: "/classes",
        element: <Courses></Courses>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-dashboard",
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "cart",
        element: (
          <StudentRoute>
            <MyCart></MyCart>
          </StudentRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <StudentRoute>
            <Payment></Payment>
          </StudentRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "my-classes",
        element: (
          <InstructorRoute>
            <TeacherClasses></TeacherClasses>
          </InstructorRoute>
        ),
      },
      {
        path: "classes",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },
      {
        path: "new-class",
        element: (
          <InstructorRoute>
            <CreateClass></CreateClass>
          </InstructorRoute>
        ),
      },
    ],
  },
]);
