"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import clsx from "clsx";

const stripePromise = loadStripe(
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_STRIPE_TEST_MODE === "true"
    ? // eslint-disable-next-line no-undef
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_TEST_KEY
    : // eslint-disable-next-line no-undef
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_LIVE_KEY
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/",
      },
    });
    if (error) {
      console.log(error);
    }
  };
  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold ">Checkout</h1>
      <PaymentElement />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

const getClientSecret = async (setOptions) => {
  const res = await fetch("/api/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: 1000 }),
  });
  const data = await res.json();
  console.log(data);
  setOptions({ clientSecret: data.clientSecret });
};

export default function Subscribe() {
  const [options, setOptions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getClientSecret(setOptions);
    setIsLoading(false);
  }, []);

  return (
    <div className="relative bg-[url(/mesh.png)] bg-cover bg-center h-screen w-full flex justify-center items-center md:justify-end">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#050505] to-transparent" />
      <div className={clsx("w-full md:w-1/2 md:h-full bg-neutral-800 max-w-lg p-8 rounded-lg md:rounded-none shadow-lg z-50", isLoading || !options ? "flex justify-center items-center" : "")}>
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
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
}
