import { Link } from "react-router-dom";
import bg from "../../assets/404.svg";
import "./NoPageFound.css";

const NoPageFound = () => {
  return (
    <div className="flex w-full bg-primary relative">
      <img src={bg} className="h-screen w-full object-contain" />
      <Link
        to="/"
        className="btn btn-primary absolute absolute-align-middle text-sm sm:text-lg lg:text-2xl px-3 lg:px-8 h-2 lg:h-14"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NoPageFound;
