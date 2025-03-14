"use client";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import clsx from "clsx";
import { formatCurrency } from "../utils/supabase/currency";
import { useRouter } from "next/navigation";
import RoundButton from "../components/RoundButton";

const stripePromise = loadStripe(
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutForm = ({ subscription }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      alert(error.message);
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <div className="absolute top-0 left-0 p-4">
        <RoundButton onClick={() => router.back()} text="Back" />
      </div>
      <h1 className="text-2xl font-bold ">Checkout</h1>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{formatCurrency(subscription.latest_invoice.subtotal)}</p>
        </div>
        <div className="flex justify-between border-b border-neutral-500 pb-2">
          <p>Tax</p> <p>{formatCurrency(subscription.latest_invoice.tax)}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold">Total</p>{" "}
          <p className="font-bold">
            {formatCurrency(subscription.latest_invoice.total)}
          </p>
        </div>
      </div>
      <PaymentElement />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Subscribe for {formatCurrency(subscription.latest_invoice.total)}{" "}
        monthly
      </button>
    </form>
  );
};

const createSubscription = async (setOptions) => {
  const res = await fetch("/api/create-subscription", {
    method: "POST",
  });
  const data = await res.json();
  setOptions({ ...data });
};

export default function Subscribe() {
  const [options, setOptions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    createSubscription(setOptions);
    setIsLoading(false);
  }, []);

  return (
    <div className="relative bg-[url(/mesh.png)] bg-cover bg-center h-screen w-full flex justify-center items-center md:justify-end">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#050505] to-transparent" />
      <div
        className={clsx(
          "w-full md:w-1/2 md:h-full bg-neutral-800 max-w-lg p-8 rounded-lg md:rounded-none shadow-lg z-50",
          isLoading || !options ? "flex justify-center items-center" : ""
        )}
      >
        {isLoading || !options ? (
          <PulseLoader color="#155dfc" speedMultiplier={0.85} />
        ) : (
          <Elements
            stripe={stripePromise}
            options={{
              ...options,

              appearance: {
                theme: "night",
                variables: {
                  colorPrimary: "#155dfc",
                  colorBackground: "#0a0a0a",
                  colorText: "#e5e5e5",
                  colorTextSecondary: "#e5e5e5",
                },
              },
            }}
          >
            <CheckoutForm subscription={options.subscription} />
          </Elements>
        )}
      </div>
    </div>
  );
}
