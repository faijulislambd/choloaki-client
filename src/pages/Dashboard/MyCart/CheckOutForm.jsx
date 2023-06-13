import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosIntercept from "../../../hooks/useAxiosIntercept";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckOutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [axiosIntercept] = useAxiosIntercept();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axiosIntercept
      .post("/create-payment-intent", { price: total })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [total]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setErrorMessage("");
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      setErrorMessage(confirmError);
    }
    if (paymentIntent.status === "succeeded") {
      const transactionID = paymentIntent.id;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Payment Success!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card w-1/2 mx-auto border-2 mt-4 p-5"
    >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="btn btn-sm btn-primary mt-4 rounded-full"
      >
        Pay
      </button>
      {errorMessage.length > 0 && (
        <span className="text-red-500 font-semibold text-sm mt-4 border-2 border-red-400 rounded-full p-2">
          {errorMessage}
        </span>
      )}
    </form>
  );
};

export default CheckOutForm;
