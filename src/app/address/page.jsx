"use client";

import React, { useEffect, useState, Suspense } from "react";
import { createClient } from "../../utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, AddressElement } from "@stripe/react-stripe-js";
import RoundButton from "../../components/RoundButton";
import { PulseLoader } from "react-spinners";
import clsx from "clsx";

const stripePromise = loadStripe(
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const createSetupIntent = async (setSetupIntent, setIsLoading) => {
  const res = await fetch("/api/create-setup-intent", {
    method: "POST",
  });
  const data = await res.json();
  setSetupIntent(data);
  setIsLoading(false);
};

const updateCustomerAddress = async (address) => {
  const res = await fetch("/api/update-customer-address", {
    method: "POST",
    body: JSON.stringify({ address }),
  });
  const data = await res.json();
  return data;
};

// Component to handle search params
const SearchParamsComponent = ({ setRedirectTo }) => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  useEffect(() => {
    setRedirectTo(redirectTo);
  }, [redirectTo, setRedirectTo]);
  return null;
};

function Page() {
  const [_, setUser] = useState(null);
  const [setupIntent, setSetupIntent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);
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
    createSetupIntent(setSetupIntent, setIsLoading);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateCustomerAddress(address);

    if (res.status === 200) {
      router.push(redirectTo ?? "/dashboard");
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsComponent setRedirectTo={setRedirectTo} />
      <div className="relative bg-[url(/mesh.png)] bg-cover bg-center h-screen w-full flex justify-center items-center md:justify-end">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#050505] to-transparent" />
        <div className="absolute top-0 left-0 p-4">
          <RoundButton onClick={() => router.back()} text="Back" />
        </div>
        <div className="w-full md:w-1/2 md:h-full bg-neutral-800 max-w-lg p-8 rounded-lg md:rounded-none shadow-lg z-50">
          <form
            onSubmit={handleSubmit}
            className={clsx(
              "flex flex-col gap-4",
              isLoading ? "flex justify-center items-center h-full" : ""
            )}
          >
            {isLoading ? (
              <PulseLoader color="#155dfc" speedMultiplier={0.85} />
            ) : (
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
    </Suspense>
  );
}

export default Page;
