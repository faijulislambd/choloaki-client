import { Elements } from "@stripe/react-stripe-js";
import PageTitle from "../../../components/PageTitle";
import useInsertCart from "../../../hooks/useInsertCart";
import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const [cart, refetch] = useInsertCart();

  const totalCartCost = cart.reduce((sum, item) => item.price + sum, 0);
  const total = parseFloat(totalCartCost.toFixed(2));
  const stripePromise = loadStripe(import.meta.env.VITE_PAMENT_KEY);

  return (
    <>
      <PageTitle title="Payment Portal"></PageTitle>
      <div className="stats bg-base-200 text-primary-content w-full mb-4">
        <div className="stat">
          <div className="stat-title text-slate-400">Total Items</div>
          <div className="stat-value text-slate-300 text-md">{cart.length}</div>
        </div>

        <div className="stat">
          <div className="stat-title text-slate-400">Total Cost</div>
          <div className="stat-value text-slate-300">${totalCartCost}</div>
        </div>
      </div>

      <Elements stripe={stripePromise}>
        <CheckOutForm
          total={total}
          cart={cart}
          refetch={refetch}
        ></CheckOutForm>
      </Elements>
    </>
  );
};

export default Payment;
