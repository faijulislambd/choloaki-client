import { useQuery } from "@tanstack/react-query";
import useAxiosIntercept from "../../../hooks/useAxiosIntercept";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import PageTitle from "../../../components/PageTitle";

const AllUsers = () => {
  const { user } = useAuth();
  const [axiosIntercept] = useAxiosIntercept();
  const { data: users = [], refetch } = useQuery(["user"], async () => {
    const response = await axiosIntercept.get(`users?email=${user.email}`);
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
      <PageTitle title="Manage Users"></PageTitle>
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
            {allUsers.length <= 0 && (
              <tr>
                <td colSpan={5} className="text-center">
                  No Users Have Joint Yet{" "}
                </td>
              </tr>
            )}
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
                <td>
                  <span className="badge badge-success">{data.role}</span>
                </td>
                <td>
                  <div className="flex items-center space-x-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleRole(data._id, "admin")}
                      style={{
                        color: data.role === "admin" && "rgba(0,0,0,.2)",
                      }}
                      disabled={data.role === "admin" && true}
                    >
                      Make Admin
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleRole(data._id, "instructor")}
                      style={{
                        color: data.role === "instructor" && "rgba(0,0,0,.2)",
                      }}
                      disabled={data.role === "instructor" && true}
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
