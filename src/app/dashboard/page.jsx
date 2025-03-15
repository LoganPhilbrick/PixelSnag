"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "../../utils/supabase/client";
import Link from "next/link";
import PulseLoader from "react-spinners/PulseLoader";
import { redirect } from "next/navigation";
import { getVersionNumber } from "../../utils/versionNumber";

function Page() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [downloadLinks, setDownloadLinks] = useState([]);

  const fetchSubscription = useCallback(async () => {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    setUser(userData);

    const subscriptionData = await fetch(
      `/api/subscription?stripeCustomerId=${userData.user.user_metadata.stripe_customer_id}`
    ).then((res) => res.json());
    setSubscription(subscriptionData);
  }, []);

  const fetchDownloadLinks = useCallback(async () => {
    const response = await fetch("/api/get-download-links?signed=true");
    const data = await response.json();
    setDownloadLinks(data.files);
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  useEffect(() => {
    fetchDownloadLinks();
  }, [fetchDownloadLinks]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/");
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date * 1000).toLocaleDateString("en-US", options);
  };

  const formatAddress = (address) => {
    const { line1, line2, city, state, postal_code, country } = address;
    return (
      <>
        <p>{line1}</p>
        {line2 && <p>{line2}</p>}
        <p>
          {city}, {state} {postal_code}
        </p>
        <p>{country}</p>
      </>
    );
  };

  return (
    <div className="w-full min-h-screen bg-neutral-900 pb-10">
      <div className="w-full h-full ">
        <div className="container mx-auto pt-10 ">
          <div className="flex justify-between items-center mx-4 md:mx-0">
            <h1 className="text-4xl font-bold text-neutral-300 mb-4 self-start ">
              Dashboard
            </h1>
            <button
              onClick={handleSignOut}
              className="text-sm font-bold text-neutral-300 px-4 py-2 rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 transition-all duration-300"
            >
              Sign Out
            </button>
          </div>
          {!user || !subscription ? (
            <div className="w-full h-screen bg-neutral-900 flex justify-center items-center">
              <PulseLoader color="#155dfc" speedMultiplier={0.85} />
            </div>
          ) : (
            <div className="bg-neutral-800 rounded-xl p-6 m-4 md:m-0 md:mb-6">
              <div className="flex flex-col md:flex-row justify-between ">
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
                  <p className="text-neutral-300 mb-4 ">{user.user.email}</p>
                  <div className="mb-2 border-b border-neutral-700 pb-2 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-neutral-300 ">
                      Address
                    </h2>
                    <Link
                      href="/address"
                      query={{ redirectTo: "/dashboard" }}
                      className="underline"
                    >
                      {user.user.user_metadata.address ? "Edit" : "Add"}
                    </Link>
                  </div>
                  <div className="text-neutral-300 mb-4 md:mb-0">
                    {user.user.user_metadata.address
                      ? formatAddress(user.user.user_metadata.address)
                      : "No address set"}
                  </div>
                </div>
                {subscription.data && subscription.data.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-300 mb-2 border-b border-neutral-700 pb-2">
                      Period start
                    </h2>
                    <p className="text-neutral-300 mb-4">
                      {formatDate(subscription.data[0].current_period_start)}
                    </p>
                    <h2 className="text-2xl font-bold text-neutral-300 mb-2 border-b border-neutral-700 pb-2">
                      Period end
                    </h2>
                    <p className="text-neutral-300 mb-4 md:mb-0">
                      {formatDate(subscription.data[0].current_period_end)}
                    </p>
                  </div>
                )}
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-300 mb-2 border-b border-neutral-700 pb-2">
                      Subscription
                    </h2>
                    <div className="text-neutral-300 mb-4 ">
                      {subscription.isSubscribed
                        ? "Subscribed"
                        : "Not Subscribed"}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    {subscription.isSubscribed ? (
                      <>
                        <Link
                          href={
                            // eslint-disable-next-line no-undef
                            process.env.NEXT_PUBLIC_STRIPE_TEST_MODE === true
                              ? "https://billing.stripe.com/p/login/test_3cs7vSdfe1OQ07e288"
                              : "https://billing.stripe.com/p/login/6oE3dZ2nw9aO4i48ww"
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
                      <Link
                        href={
                          user.user.user_metadata.address
                            ? "/subscribe"
                            : "/address"
                        }
                        className="text-sm font-bold text-neutral-300 px-4 py-2 rounded-md cursor-pointer bg-blue-600 w-full text-center hover:bg-blue-700 transition-all duration-300"
                      >
                        Subscribe
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {downloadLinks.length > 0 && (
            <div className="bg-neutral-800 rounded-xl p-6 m-4 md:m-0">
              <h2 className="text-2xl font-bold text-neutral-300 mb-4 border-b border-neutral-700 pb-2">
                Download Links
              </h2>
              <div className="text-neutral-300 mb-4 flex flex-col gap-4 md:flex-row ">
                {downloadLinks.map(({ system, files }) => (
                  <div className="w-full" key={system}>
                    <h3 className="text-lg font-bold text-neutral-300 mb-2 border-b border-neutral-700 pb-2">
                      {system}
                    </h3>
                    <div className="flex flex-col">
                      {files.slice(0, 3).map((url) => (
                        <a
                          key={url}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-300 mb-2 hover:text-blue-500 transition-all duration-300"
                        >
                          {getVersionNumber(url)}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
