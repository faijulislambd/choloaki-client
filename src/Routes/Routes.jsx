import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../layout/Main";
import Instructors from "../pages/Instructors/Instructors/Instructors";
import Courses from "../pages/Courses/Courses/Courses";
import Login from "../pages/LoginRegister/Login/Login";
import Register from "../pages/LoginRegister/Register/Register";
import MyCart from "../pages/Dashboard/MyCart/MyCart";
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import TeacherClasses from "../pages/Dashboard/TeacherClasses/TeacherClasses";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import CreateClass from "../pages/Dashboard/CreateClass/CreateClass";
import InstructorRoute from "./InstructorRoute";
import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";
import Payment from "../pages/Dashboard/MyCart/Payment";
import Transactions from "../pages/Dashboard/Transactions/Transactions";
import Enrolled from "../pages/Dashboard/Enrolled/Enrolled";
import AdminDashboard from "../pages/Dashboard/UserDashboard/AdminDashboard";
import StudentDashboard from "../pages/Dashboard/UserDashboard/StudentDashboard";
import InstructorDashboard from "../pages/Dashboard/UserDashboard/InstructorDashboard";
import NoPageFound from "../pages/NoPageFound/NoPageFound";
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
        path: "admin-dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard></AdminDashboard>
          </AdminRoute>
        ),
      },
      {
        path: "student-dashboard",
        element: (
          <StudentRoute>
            <StudentDashboard></StudentDashboard>
          </StudentRoute>
        ),
      },
      {
        path: "instructor-dashboard",
        element: (
          <InstructorRoute>
            <InstructorDashboard></InstructorDashboard>
          </InstructorRoute>
        ),
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
        path: "enrolled",
        element: (
          <StudentRoute>
            <Enrolled></Enrolled>
          </StudentRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <StudentRoute>
            <Transactions></Transactions>
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
  {
    path: "*",
    element: <NoPageFound></NoPageFound>,
  },
]);
