import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useUploadImg from "../../../hooks/useUploadImg";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosIntercept from "../../../hooks/useAxiosIntercept";
import SocialLogin from "../../../components/SocialLogin";

const Register = () => {
  const [passwordState, setPasswordState] = useState(true);
  const [confirmPasswordState, setConfirmPasswordState] = useState(true);
  const { createUser, setUserNameImage } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [axiosIntercept] = useAxiosIntercept();
  const [imageUpload, imageURL, loading] = useUploadImg();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location?.state?.from?.pathname || "/";

  const handleImageUploadOnChange = (file) => {
    imageUpload(file);
  };

  const onRegister = async (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const confirm_password = data.confirm_password;
    // imageUpload(data.image[0])
    // Start and end metacharacters
    const emptyFieldRegEx = /^\s*$/g;

    if (emptyFieldRegEx.test(name)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Name Felid Cannot Be Empty",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (emptyFieldRegEx.test(email)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Email Felid Cannot Be Empty",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password Must Be Minimum 6 Characters Long",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    console.log(imageURL);

    if (!loading) {
      console.log(imageURL);
      createUser(email, password)
        .then((result) => {
          setUserNameImage(name, imageURL)
            .then(async (img = imageURL) => {
              console.log(img);
              const response = await axiosIntercept.post(`users`, {
                name: name,
                email: email,
                image: imageURL,
                role: "student",
              });
            })
            .catch((error) => console.error(error));

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registration Updated!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        })
        .catch((error) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  return (
    <>
      <PageTitle title="Register"></PageTitle>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content lg:w-1/3 flex-col">
          <div className="card w-full shadow-2xl bg-base-100 lg:scale-110">
            <div className="card-body items-center">
              <h1 className="card-title font-bold">Register now!</h1>
              <form onSubmit={handleSubmit(onRegister)} className="w-full">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    {...register("name")}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
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
                      placeholder="Password"
                      className="input input-bordered w-full"
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
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={confirmPasswordState ? "password" : "text"}
                      placeholder="Rewrite Password"
                      className="input input-bordered w-full"
                      {...register("confirm_password")}
                    />
                    <div
                      className="absolute inset-y-4 right-4 cursor-pointer"
                      onClick={() =>
                        setConfirmPasswordState(!confirmPasswordState)
                      }
                    >
                      {confirmPasswordState ? (
                        <FaEyeSlash></FaEyeSlash>
                      ) : (
                        <FaEye></FaEye>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Upload Profile Image</span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs"
                    accept="image/png, image/gif, image/jpeg"
                    {...register("image")}
                    onChange={(e) =>
                      handleImageUploadOnChange(e.target.files[0])
                    }
                  />
                </div>
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Register"
                  />
                </div>
              </form>
              <div className="divider">Or Sign In With</div>
              <SocialLogin navigate={navigate} from={from}></SocialLogin>

              <div className="w-full block text-left text-xs mt-3">
                Already Have An Account?{" "}
                <Link className="btn-link" to="/login">
                  Login Here!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
