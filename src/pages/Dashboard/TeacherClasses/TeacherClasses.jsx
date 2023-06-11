import { useState } from "react";
import useTeacherClasses from "../../../hooks/useTeacherClasses";
import ClassDetail from "./ClassDetail";

const TeacherClasses = () => {
  const [teacherClasses] = useTeacherClasses();
  const [classDetail, setClassDetail] = useState(null);
  const handleDetailModal = (data) => {
    setClassDetail(data);
    window.my_modal_class_detail.showModal();
  };
  return (
    <div className="overflow-x-auto">
      <table className="table text-black">
        {/* head */}
        <thead className="text-black">
          <tr>
            <th>#</th>
            <th>Class</th>
            <th>Number Of Students</th>
            <th>Available Seats</th>
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
              <td>{data.status}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleDetailModal(data)}
                  >
                    Details
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => window.my_modal_class_edit.showModal()}
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <dialog id="my_modal_class_detail" className="modal">
        <form
          method="dialog"
          className="modal-box w-11/12 max-w-5xl bg-white text-black"
        >
          <ClassDetail cls={classDetail !== null && classDetail}></ClassDetail>
          <div className="modal-action">
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default TeacherClasses;
