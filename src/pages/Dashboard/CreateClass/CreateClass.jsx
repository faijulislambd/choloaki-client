import { useForm } from "react-hook-form";
import PageTitle from "../../../components/PageTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosIntercept from "../../../hooks/useAxiosIntercept";
import useUploadImg from "../../../hooks/useUploadImg";
import Swal from "sweetalert2";

const CreateClass = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [axiosIntercept] = useAxiosIntercept();
  const [imageUpload, imageURL, loading] = useUploadImg();
  const handleImageUploadOnChange = (file) => {
    imageUpload(file);
  };
  const onClassCreate = async (data) => {
    const name = data.name;
    const class_instructor = user.displayName;
    const instructor_email = user.email;
    const price = parseFloat(data.price);
    const seats = parseInt(data.seats);
    const status = "pending";
    const students = [];
    if (!loading) {
      const image = imageURL;
      const classData = {
        name,
        image,
        class_instructor,
        instructor_email,
        price,
        seats,
        status,
        students,
      };
      const response = await axiosIntercept.post(
        "teacher/new-class",
        classData
      );
      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New Class Created!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    }
  };
  return (
    <>
      <PageTitle title="Create Class"></PageTitle>
      <div className="container">
        <div className="card w-full shadow-2xl bg-slate-800  text-white">
          <div className="card-body items-center">
            <h1 className="card-title font-bold">Create New Class!</h1>
            <form onSubmit={handleSubmit(onClassCreate)} className="w-full ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Class Name</span>
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
                  <span className="label-text">Instructor Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={user.displayName}
                  className="input input-bordered"
                  {...register("class_instructor")}
                  disabled
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="input input-bordered"
                  {...register("instructor_email")}
                  disabled
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Seats</span>
                </label>
                <input
                  type="number"
                  placeholder="Number Of Seats"
                  className="input input-bordered"
                  {...register("seats")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  placeholder="Price Of Seats"
                  className="input input-bordered"
                  {...register("price")}
                />
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
                  onChange={(e) => handleImageUploadOnChange(e.target.files[0])}
                />
              </div>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Create Class"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateClass;
