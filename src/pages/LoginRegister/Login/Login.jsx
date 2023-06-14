import PageTitle from "../../../components/PageTitle";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../../components/SocialLogin";
import { motion } from "framer-motion";
const Login = () => {
  const [passwordState, setPasswordState] = useState(true);
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  let from = location?.state?.from?.pathname || "/";

  const onLogin = (data) => {
    const email = data.email;
    const password = data.password;
    signIn(email, password).then((result) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Welcome Back!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    });
  };

  return (
    <>
      <PageTitle title="Login"></PageTitle>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="card w-full max-w-sm shadow-2xl bg-base-100 lg:scale-110">
              <div className="card-body items-center">
                <h1 className="card-title font-bold">Login now!</h1>
                <form onSubmit={handleSubmit(onLogin)}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="text"
                      placeholder="email"
                      className="input input-bordered"
                      {...register("email")}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={passwordState ? "password" : "text"}
                        placeholder="password"
                        className="input input-bordered"
                        {...register("password")}
                      />
                      <div
                        className="absolute inset-y-4 right-4 cursor-pointer"
                        onClick={() => setPasswordState(!passwordState)}
                      >
                        {passwordState ? (
                          <FaEyeSlash></FaEyeSlash>
                        ) : (
                          <FaEye></FaEye>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-control mt-6">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Login"
                    />
                  </div>
                </form>
                <div className="divider">Or Sign In With</div>
                <SocialLogin navigate={navigate} from={from}></SocialLogin>
                <div className="w-full block text-left text-xs mt-3">
                  No Account?{" "}
                  <Link className="btn-link" to="/register">
                    Please Register Here!
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
