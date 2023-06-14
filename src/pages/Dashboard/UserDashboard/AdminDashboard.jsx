import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../../components/PageTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosIntercept from "../../../hooks/useAxiosIntercept";
import { FaFlipboard, FaUsers, FaWallet } from "react-icons/fa";
import CountUp from "react-countup";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [axiosIntercept] = useAxiosIntercept();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats", user?.email],
    queryFn: async () => {
      const res = await axiosIntercept("admin/stats");
      return res.data;
    },
  });

  return (
    <>
      <PageTitle title="Admin Dashboard"></PageTitle>
      <div className="card w-full shadow-2xl bg-slate-800  text-white">
        <div className="card-body">
          <h1 className="text-3xl font-semibold">
            Welcome Back{" "}
            <span className="text-primary">{user.displayName}</span>
          </h1>
          <div className="mt-8 mb-4 flex flex-wrap items-center justify-center -mx-[15px] gap-y-8">
            <div className="w-full md:w-1/2 px-[15px]">
              <div className="card w-full bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-3xl">
                    <FaWallet></FaWallet> Earned
                  </h2>
                  <p className="text-2xl font-semibold">
                    <CountUp
                      start={0}
                      end={stats.totalIncome}
                      duration={2}
                      decimals={2}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-[15px]">
              <div className="card w-full bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-3xl">
                    <FaFlipboard></FaFlipboard> Classes
                  </h2>
                  <p className="text-2xl font-semibold">
                    <CountUp start={0} end={stats.classes} duration={2} />
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-[15px]">
              <div className="card w-full bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-3xl">
                    <FaUsers></FaUsers> Instructors
                  </h2>
                  <p className="text-2xl font-semibold">
                    <CountUp start={0} end={stats.instructors} duration={2} />
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-[15px]">
              <div className="card w-full bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-3xl">
                    <FaUsers></FaUsers> Students
                  </h2>
                  <p className="text-2xl font-semibold">
                    <CountUp start={0} end={stats.students} duration={2} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
