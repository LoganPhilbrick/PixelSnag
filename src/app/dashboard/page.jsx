"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import Link from "next/link";
import clsx from "clsx";

function Page() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      setUser(userData);

      const subscriptionData = await fetch(
        `/api/subscription?stripeCustomerId=${userData.user.user_metadata.stripe_customer_id}`
      ).then((res) => res.json());
      setSubscription(subscriptionData);
    };

    fetchData();
  }, []);

  if (!user || !subscription) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen bg-neutral-900">
      <div className="w-full h-full">
        <div className="container mx-auto pt-10">
          <h1 className="text-4xl font-bold text-neutral-300 mb-4 self-start">
            Dashboard
          </h1>
          <div className="bg-neutral-800 rounded-xl p-6">
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl font-bold text-neutral-300 mb-2 border-b border-neutral-700 pb-2">
                  User
                </h2>
                <p className="text-neutral-300 mb-4">
                  {user.user.user_metadata.first_name}{" "}
                  {user.user.user_metadata.last_name}
                </p>
                <h2 className="text-2xl font-bold text-neutral-300 mb-2 border-b border-neutral-700 pb-2">
                  Email
                </h2>
                <p className="text-neutral-300">{user.user.email}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-300 mb-2 border-b border-neutral-700 pb-2">
                  Subscription
                </h2>
                <p className="text-neutral-300 mb-4">
                  {subscription.isSubscribed ? "Subscribed" : "Not Subscribed"}
                </p>
                <Link
                  href={
                    // eslint-disable-next-line no-undef
                    process.env.NEXT_PUBLIC_STRIPE_TEST_MODE === true
                      ? "https://billing.stripe.com/p/login/test_3cs7vSdfe1OQ07e288"
                      : "https://billing.stripe.com/p/login/6oE3dZ2nw9aO4i48ww"
                  }
                  className={clsx(
                    "text-sm font-bold text-neutral-300 px-4 py-2 rounded-md cursor-pointer bg-blue-600"
                  )}
                >
                  Manage Subscription
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
