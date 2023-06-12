import { useState } from "react";
import useTeacherClasses from "../../../hooks/useTeacherClasses";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import ClassEditForm from "./ClassEditForm";
import useAxiosIntercept from "../../../hooks/useAxiosIntercept";
import Swal from "sweetalert2";
import useUploadImg from "../../../hooks/useUploadImg";

const TeacherClasses = () => {
  const [teacherClasses, refetch] = useTeacherClasses();
  const [feedback, setFeedback] = useState("");
  const [classData, setClassData] = useState(null);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [classEditModal, setClassEditModal] = useState(false);
  const [axiosIntercept] = useAxiosIntercept();
  const [imageUpload, imageURL, loading] = useUploadImg();
  const handleImageUploadOnChange = (file) => {
    imageUpload(file);
  };
  const handleFeedbackModal = (feedback) => {
    setFeedback(feedback);
    setFeedbackModal(true);
  };
  const closeModal = () => {
    setFeedbackModal(false);
    setClassEditModal(false);
  };
  const handleEditClass = (data) => {
    setClassData(data);
    setClassEditModal(true);
  };
  const handleEditForm = (data) => {
    loading && imageUpload(data.image[0]);
    const name = data.name;
    const price = data.price;
    const seats = data.seats;
    const image = data.image.length > 0 ? imageURL : classData.image;
    const updatedClassData = { name, price, seats, image };
    axiosIntercept
      .patch(`/instructor/class/${classData._id}`, updatedClassData)
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Class Updated!",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
          closeModal();
        }
      });
  };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table text-black">
          {/* head */}
          <thead className="text-black">
            <tr>
              <th>#</th>
              <th>Class</th>
              <th>Number Of Students</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teacherClasses.map((data, index) => (
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
                <td>{data.students.length}</td>
                <td>{data.seats}</td>
                <td>{data.price}</td>
                <td>{data.status}</td>
                <td>
                  <div className="flex items-center space-x-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEditClass(data)}
                    >
                      Edit
                    </button>
                    {data.status === "denied" && data.feedback.length > 0 ? (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleFeedbackModal(data.feedback)}
                      >
                        Admin Feedback
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/*FeedBack Modal*/}
      <Transition appear show={feedbackModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-slate-600 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-5 flex justify-between items-center"
                  >
                    Admin Feedback
                    <button
                      onClick={closeModal}
                      className="btn btn-sm btn-circle btn-primary"
                    >
                      <FaTimes></FaTimes>
                    </button>
                  </Dialog.Title>
                  <p>{feedback}</p>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/*Edit Class Modal*/}
      <Transition appear show={classEditModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-slate-600 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-5 flex justify-between items-center"
                  >
                    Edit Class
                    <button
                      onClick={closeModal}
                      className="btn btn-sm btn-circle btn-primary"
                    >
                      <FaTimes></FaTimes>
                    </button>
                  </Dialog.Title>
                  <ClassEditForm
                    classData={classData}
                    handleForm={handleEditForm}
                    handleImageUploadOnChange={handleImageUploadOnChange}
                  ></ClassEditForm>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TeacherClasses;
