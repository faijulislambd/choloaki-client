const Register = () => {
  return (
    <>
      <PageTitle title="Login"></PageTitle>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="card w-full max-w-sm shadow-2xl bg-base-100 lg:scale-110">
            <div className="card-body items-center">
              <h1 className="card-title font-bold">Register now!</h1>
              <form onSubmit={handleSubmit(onRegister)}>
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
                  <input
                    type="text"
                    placeholder="password"
                    className="input input-bordered"
                    {...register("password")}
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
              <div className="flex justify-center items-center space-x-2">
                <button
                  className="btn btn-circle hover:btn-primary"
                  onClick={handleGoogleLogin}
                >
                  <FaGoogle></FaGoogle>
                </button>
                <button
                  className="btn btn-circle hover:btn-primary"
                  onClick={handleGitHubLogin}
                >
                  <FaGithub></FaGithub>
                </button>
              </div>
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
