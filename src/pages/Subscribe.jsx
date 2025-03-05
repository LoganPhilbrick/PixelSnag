import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";

const stripePromise = loadStripe("pk_live_51P8EBrRu8vr2oRZoPkCl24uVJXT1Vw2gVuZRTIlTgndww2J7lCevE5EwBRN9X1F66eCNJzLUrhuJ80DIftEzxD5s00otGUvvLE");

const CheckoutForm = () => {
  return (
    <form className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold ">Checkout</h1>
      <PaymentElement options={{}} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
    </form>
  );
};

const getClientSecret = async (setOptions) => {
  const res = await fetch("http://localhost:3000/create-payment-intent", {
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

  if (isLoading || !options) {
    // todo: add a loading spinner
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[url(/mesh.png)] bg-cover bg-center h-screen w-full flex justify-center items-center md:justify-end">
      <div className="w-full md:w-1/2 md:h-full bg-neutral-800 max-w-lg p-8 rounded-lg md:rounded-none shadow-lg ">
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
      </div>
    </div>
  );
}
