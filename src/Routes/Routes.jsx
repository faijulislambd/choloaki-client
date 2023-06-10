import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../layout/Main";
import Instructors from "../pages/Instructors/Instructors/Instructors";
import Courses from "../pages/Courses/Courses/Courses";
import Login from "../pages/LoginRegister/Login/Login";
import Register from "../pages/LoginRegister/Register/Register";
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
]);
