import Swal from "sweetalert2";
import useAllClasses from "../../../hooks/useAllClasses";
import useAxiosIntercept from "../../../hooks/useAxiosIntercept";
import { useForm } from "react-hook-form";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import PageTitle from "../../../components/PageTitle";
const ManageClasses = () => {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [allClasses, refetch] = useAllClasses();
  const [axiosIntercept] = useAxiosIntercept();
  const [classID, setClassID] = useState("");
  const handleClassStatus = async (id, status) => {
    const updateRes = await axiosIntercept.patch(`admin/class/status/${id}`, {
      status: status,
    });
    if (updateRes.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Status Updated!",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };
  const statusBadge = (status) => {
    if (status === "approved") return "badge-success";
    if (status === "pending") return "badge-warning";
    if (status === "denied") return "badge-error";
  };

  const handleFeedback = (id) => {
    setClassID(id);
    toggleModal();
  };

  const onFeedback = (data) => {
    const feedbackText = { feedback: data.feedback };
    const response = axiosIntercept
      .patch(`/admin/feedback/${classID}`, feedbackText)
      .then((data) => {
        console.log(data.data.modifiedCount);
        if (data.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Feedback Sent!",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          toggleModal();
          refetch();
        }
      });
  };

  return (
    <>
      <PageTitle title="Mange Classes"></PageTitle>
      <div className="overflow-x-auto">
        <table className="table text-black">
          {/* head */}
          <thead className="text-black">
            <tr>
              <th>#</th>
              <th>Class</th>
              <th>Instructor</th>
              <th>Instructor Email</th>
              <th>Seats</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allClasses.length <= 0 && (
              <tr>
                <td colSpan={7} className="text-center">
                  No Classes To Manage At The Moment{" "}
                </td>
              </tr>
            )}
            {allClasses.map((data, index) => (
              <tr key={data._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-circle w-12 h-12">
                        <img src={data.image} alt={data.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{data.name}</div>
                    </div>
                  </div>
                </td>
                <td>{data.class_instructor}</td>
                <td>{data.instructor_email}</td>
                <td>{data.seats}</td>
                <td>
                  <span
                    className={` badge badge-sm ${statusBadge(
                      data.status
                    )} font-semibold`}
                  >
                    {data.status}
                  </span>
                </td>
                <td>
                  <div className="flex items-center space-x-2">
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handleClassStatus(data._id, "approved")}
                      disabled={data.status === "approved" ? true : false}
                      style={{
                        color: data.status === "approved" && "rgba(0,0,0,.2)",
                      }}
                    >
                      Approved
                    </button>
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() => handleClassStatus(data._id, "pending")}
                      disabled={data.status === "pending" ? true : false}
                      style={{
                        color: data.status === "pending" && "rgba(0,0,0,.2)",
                      }}
                    >
                      Pending
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleClassStatus(data._id, "denied")}
                      disabled={data.status === "denied" ? true : false}
                      style={{
                        color: data.status === "denied" && "rgba(0,0,0,.2)",
                      }}
                    >
                      Denied
                    </button>
                    {data.status === "denied" && (
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => handleFeedback(data._id)}
                        disabled={data.feedback.length > 0 && true}
                        style={{
                          color: data.feedback.length > 0 && "rgba(0,0,0,.2)",
                        }}
                      >
                        {data.feedback.length > 0
                          ? "Feedback Sent"
                          : "Feedback"}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={toggleModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 mb-5 flex justify-between items-center"
                    >
                      Your Feedback
                      <button
                        onClick={toggleModal}
                        className="btn btn-sm btn-circle btn-primary"
                      >
                        <FaTimes></FaTimes>
                      </button>
                    </Dialog.Title>
                    <form onSubmit={handleSubmit(onFeedback)}>
                      <div className="form-control mb-5">
                        <textarea
                          className="textarea textarea-bordered border-slate-300 h-24 text-black"
                          placeholder="Bio"
                          {...register("feedback")}
                        ></textarea>
                      </div>
                      <div className="form-control">
                        <input
                          type="submit"
                          value="Send Feedback"
                          className="btn btn-primary"
                        />
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default ManageClasses;
