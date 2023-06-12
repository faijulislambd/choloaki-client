import { useForm } from "react-hook-form";

const ClassEditForm = ({
  classData,
  handleForm,
  handleImageUploadOnChange,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { name, images, class_instructor, instructor_email, seats, price } =
    classData;
  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className="w-full lg:flex lg:flex-col lg:gap-4"
    >
      <div className="form-control">
        <label className="label">
          <span className="label-text text-slate-600">Class Name</span>
        </label>
        <input
          type="text"
          defaultValue={name}
          className="input input-bordered border-slate-300"
          {...register("name")}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-slate-600">Instructor Name</span>
        </label>
        <input
          type="text"
          defaultValue={class_instructor}
          className="input input-bordered border-slate-300"
          {...register("class_instructor")}
          disabled
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-slate-600">Email</span>
        </label>
        <input
          type="email"
          defaultValue={instructor_email}
          className="input input-bordered border-slate-300"
          {...register("instructor_email")}
          disabled
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-slate-600">Seats</span>
        </label>
        <input
          type="number"
          defaultValue={seats}
          className="input input-bordered border-slate-300"
          {...register("seats")}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-slate-600">Price</span>
        </label>
        <input
          type="text"
          defaultValue={price}
          className="input input-bordered border-slate-300"
          {...register("price")}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-slate-600">
            Upload Profile Image
          </span>
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
        <input type="submit" className="btn btn-primary" value="Update Class" />
      </div>
    </form>
  );
};

export default ClassEditForm;
