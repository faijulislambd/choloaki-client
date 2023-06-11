import Swal from "sweetalert2";
import useAllClasses from "../../../hooks/useAllClasses";
import useAxiosIntercept from "../../../hooks/useAxiosIntercept";

const ManageClasses = () => {
  const [allClasses, refetch] = useAllClasses();
  const [axiosIntercept] = useAxiosIntercept();
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
  return (
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
              <td>{data.status}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleClassStatus(data._id, "approved")}
                  >
                    Approved
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleClassStatus(data._id, "denied")}
                  >
                    Denied
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        // <dialog id="my_modal_class_detail" className="modal">
        //   <form
        //     method="dialog"
        //     className="modal-box w-11/12 max-w-5xl bg-white text-black"
        //   >
        //     <ClassDetail cls={classDetail !== null && classDetail}></ClassDetail>
        //     <div className="modal-action">
        //       <button className="btn">Close</button>
        //     </div>
        //   </form>
        // </dialog>
      }
    </div>
  );
};

export default ManageClasses;
