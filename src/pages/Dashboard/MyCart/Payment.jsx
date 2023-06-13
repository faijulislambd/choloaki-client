import { Elements } from "@stripe/react-stripe-js";
import PageTitle from "../../../components/PageTitle";
import useInsertCart from "../../../hooks/useInsertCart";
import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const [cart] = useInsertCart();

  const totalCartCost = cart.reduce((sum, item) => item.price + sum, 0);
  const total = parseFloat(totalCartCost.toFixed(2));
  const stripePromise = loadStripe(import.meta.env.VITE_PAMENT_KEY);

  return (
    <>
      <PageTitle title="Payment"></PageTitle>
      <div>Total Items : {cart.length}</div>
      <div>Total Price : {totalCartCost}</div>

      <Elements stripe={stripePromise}>
        <CheckOutForm total={total}></CheckOutForm>
      </Elements>
    </>
  );
};

export default Payment;
