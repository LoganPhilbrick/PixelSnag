"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import Link from "next/link";
import PulseLoader from "react-spinners/PulseLoader";
import { redirect } from "next/navigation";

function Page() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      setUser(userData);

      const subscriptionData = await fetch(`/api/subscription?stripeCustomerId=${userData.user.user_metadata.stripe_customer_id}`).then((res) => res.json());
      setSubscription(subscriptionData);
    };

    fetchData();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/");
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date * 1000).toLocaleDateString("en-US", options);
  };

  return (
    <div className="w-full h-screen bg-neutral-900">
      <div className="w-full h-full ">
        <div className="container mx-auto pt-10 ">
          <div className="flex justify-between items-center mx-4 md:mx-0">
            <h1 className="text-4xl font-bold text-neutral-300 mb-4 self-start ">Dashboard</h1>
            <button onClick={handleSignOut} className="text-sm font-bold text-neutral-300 px-4 py-2 rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 transition-all duration-300">
              Sign Out
            </button>
          </div>
          {!user || !subscription ? (
            <div className="w-full h-screen bg-neutral-900 flex justify-center items-center">
              <PulseLoader color="#155dfc" speedMultiplier={0.85} />
            </div>
          ) : (
            <div className="bg-neutral-800 rounded-xl p-6 m-4 md:m-0">
              <div className="flex flex-col md:flex-row justify-between ">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-300 mb-2 border-b border-neutral-700 pb-2">User</h2>
                  <p className="text-neutral-300 mb-4">
                    {user.user.user_metadata.first_name} {user.user.user_metadata.last_name}
                  </p>
                  <h2 className="text-2xl font-bold text-neutral-300 mb-2 border-b border-neutral-700 pb-2">Email</h2>
                  <p className="text-neutral-300 mb-4 md:mb-0">{user.user.email}</p>
                </div>
                {subscription.data && (
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-300 mb-2 border-b border-neutral-700 pb-2">Period start</h2>
                    <p className="text-neutral-300 mb-4">{formatDate(subscription.data[0].current_period_start)}</p>
                    <h2 className="text-2xl font-bold text-neutral-300 mb-2 border-b border-neutral-700 pb-2">Period end</h2>
                    <p className="text-neutral-300 mb-4 md:mb-0">{formatDate(subscription.data[0].current_period_end)}</p>
                  </div>
                )}
                <div>
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-300 mb-2 border-b border-neutral-700 pb-2">Subscription</h2>
                    <p className="text-neutral-300 mb-4 ">{subscription.isSubscribed ? "Subscribed" : "Not Subscribed"}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    {subscription.isSubscribed ? (
                      <>
                        <Link
                          href={
                            // eslint-disable-next-line no-undef
                            process.env.NEXT_PUBLIC_STRIPE_TEST_MODE === true ? "https://billing.stripe.com/p/login/test_3cs7vSdfe1OQ07e288" : "https://billing.stripe.com/p/login/6oE3dZ2nw9aO4i48ww"
                          }
                          className="text-sm font-bold text-neutral-300 px-4 py-2 rounded-md cursor-pointer bg-blue-600"
                        >
                          Manage Subscription
                        </Link>
                        <p className="text-neutral-400 text-[12px] mt-2">
                          You'll be redirected to Stripe
                          <br />
                          to manage your subscription.
                        </p>
                      </>
                    ) : (
                      <Link href="/subscribe" className="text-sm font-bold text-neutral-300 px-4 py-2 rounded-md cursor-pointer bg-blue-600">
                        Subscribe
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
