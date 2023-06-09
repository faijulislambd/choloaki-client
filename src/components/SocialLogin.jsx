import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosIntercept from "../hooks/useAxiosIntercept";

const SocialLogin = ({ navigate, from }) => {
  const { signInWithGoogle, signInWithGithub } = useAuth();
  const [axiosIntercept] = useAxiosIntercept();

  const handleGoogleLogin = () => {
    signInWithGoogle(navigate, from, axiosIntercept);
  };
  //   const handleGitHubLogin = () => {
  //     signInWithGithub(navigate, from, axiosIntercept);
  //   };
  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        className="btn btn-circle hover:btn-primary"
        onClick={handleGoogleLogin}
      >
        <FaGoogle></FaGoogle>
      </button>
      {/*
        <button
        className="btn btn-circle hover:btn-primary"
        onClick={handleGitHubLogin}
      >
        <FaGithub></FaGithub>
  </button>
*/}
    </div>
  );
};

export default SocialLogin;
