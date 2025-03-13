"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, AddressElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const createSetupIntent = async (setSetupIntent) => {
  const res = await fetch("/api/create-setup-intent", {
    method: "POST",
  });
  const data = await res.json();
  console.log(data);
  setSetupIntent(data);
};

const updateCustomerAddress = async (address) => {
  const res = await fetch("/api/update-customer-address", {
    method: "POST",
    body: JSON.stringify({ address }),
  });
  const data = await res.json();
  return data;
};

function Page() {
  const [_, setUser] = useState(null);
  const [setupIntent, setSetupIntent] = useState(null);
  const [address, setAddress] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const fetchUser = async () => {
      const {
        data: { user: userData },
      } = await supabase.auth.getUser();

      if (!userData) {
        router.push("/");
      } else {
        setUser(userData);
      }
    };

    fetchUser();
  }, [router]);

  useEffect(() => {
    createSetupIntent(setSetupIntent);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateCustomerAddress(address);

    if (res.status === 200) {
      router.push("/subscribe");
    }
  };

  return (
    <div className="relative bg-[url(/mesh.png)] bg-cover bg-center h-screen w-full flex justify-center items-center md:justify-end">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#050505] to-transparent" />
      <div className="w-full md:w-1/2 md:h-full bg-neutral-800 max-w-lg p-8 rounded-lg md:rounded-none shadow-lg z-50">
        <form onSubmit={handleSubmit}>
          {setupIntent && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret: setupIntent.clientSecret,
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
              <AddressElement
                options={{ mode: "billing" }}
                onChange={(event) => setAddress(event.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md w-full mt-4"
              >
                Submit
              </button>
            </Elements>
          )}
        </form>
      </div>
    </div>
  );
}

export default Page;
