import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosIntercept from "../../../hooks/useAxiosIntercept";
import { useEffect } from "react";
import PageTitle from "../../../components/PageTitle";

const Enrolled = () => {
  const { user } = useAuth();
  const [axiosIntercept] = useAxiosIntercept();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  useEffect(() => {
    axiosIntercept.get(`classes/enrolled/${user.email}`).then((res) => {
      if (res.status === 200) {
        setEnrolledClasses(res.data);
      }
    });
  }, []);
  return (
    <>
      <PageTitle title="Enrolled"></PageTitle>

      <div className="overflow-x-auto">
        <table className="table text-black">
          {/* head */}
          <thead className="text-black">
            <tr>
              <th>#</th>
              <th>Class</th>
              <th>Instructor</th>
              <th>Instructor Email</th>
            </tr>
          </thead>
          <tbody>
            {enrolledClasses.length <= 0 && (
              <tr>
                <td colSpan={4} className="text-center">
                  No Classes Enrolled Yet{" "}
                </td>
              </tr>
            )}
            {enrolledClasses.map((data, index) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Enrolled;
