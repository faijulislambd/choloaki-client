import { useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import useAxiosIntercept from "../../../hooks/useAxiosIntercept";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import moment from "moment";

const Transactions = () => {
  const { user } = useAuth();
  const [axiosIntercept] = useAxiosIntercept();
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    axiosIntercept.get(`payments/${user.email}`).then((res) => {
      if (res.status === 200) {
        setTransactions(res.data);
      }
    });
  }, []);

  return (
    <>
      <PageTitle title="Transaction History"></PageTitle>

      <div className="overflow-x-auto">
        <table className="table text-black">
          {/* head */}
          <thead className="text-black">
            <tr>
              <th>#</th>
              <th>Items</th>
              <th>Transaction ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length <= 0 && (
              <tr>
                <td colSpan={4} className="text-center">
                  No Transactions Yet{" "}
                </td>
              </tr>
            )}
            {transactions.map((data, index) => (
              <tr key={data._id}>
                <td>{index + 1}</td>
                <td>
                  <ul className="list-disc">
                    {data.classes_names.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </td>
                <td>{data.transactionId}</td>
                <td>{moment(data.date).format("MMMM Do, YYYY [at] h:mm a")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Transactions;
