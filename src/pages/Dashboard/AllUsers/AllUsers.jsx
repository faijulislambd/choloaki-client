import { useQuery } from "@tanstack/react-query";
import useAxiosIntercept from "../../../hooks/useAxiosIntercept";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { user } = useAuth();
  const [axiosIntercept] = useAxiosIntercept();
  const { data: users = [], refetch } = useQuery(["user"], async () => {
    const response = await axiosIntercept.get("users");
    return response.data;
  });

  const allUsers = users.filter((data) => data.email !== user.email);

  const handleRole = async (id, role) => {
    const updateRes = await axiosIntercept.patch(`admin/users/role/${id}`, {
      role: role,
    });
    if (updateRes.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Role Change Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table text-black">
          {/* head */}
          <thead className="text-black">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((data, index) => (
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
                <td>{data.email}</td>
                <td>{data.role}</td>
                <td>
                  <div className="flex items-center space-x-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleRole(data._id, "admin")}
                    >
                      Make Admin
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleRole(data._id, "instructor")}
                    >
                      Make Instructor
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
