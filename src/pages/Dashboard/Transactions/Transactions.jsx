import { useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import useAxiosIntercept from "../../../hooks/useAxiosIntercept";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

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
                <td>{data.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Transactions;