"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "../../utils/supabase/client";
import Link from "next/link";
import PulseLoader from "react-spinners/PulseLoader";
import { useRouter } from "next/navigation";
import { FaWindows, FaApple } from "react-icons/fa";
import clsx from "clsx";
import Image from "next/image";

function Page() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [downloadLinksError, setDownloadLinksError] = useState(null);
  const [isDownloadLinksLoading, setIsDownloadLinksLoading] = useState(false);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
  const [hasAccessCode, setHasAccessCode] = useState(false);
  const [isSmallNavbarOpen, setIsSmallNavbarOpen] = useState(false);

  const fetchAccessCodeStatus = useCallback(async () => {
    const response = await fetch("/api/get-access-code-status");
    const data = await response.json();
    setHasAccessCode(data.hasAccessCode);
  }, []);

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
    try {
      const response = await fetch("/api/get-download-links", {
        cache: "force-cache",
        next: {
          // will refetch every 10 minutes if needed
          revalidate: 600,
        },
      });
      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(`Error ${response.status}: ${errorText} `);
      }

      const data = await response.json();
      setDownloadLinks(data.files);
    } catch (e) {
      setDownloadLinksError(e.message);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
    fetchAccessCodeStatus();
  }, [fetchSubscription, fetchAccessCodeStatus]);

  // useEffect(() => {
  //   fetchDownloadLinks();
  // }, [fetchDownloadLinks]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
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

  function getMostRecentVersion(urls) {
    // Extract version numbers from URLs and sort them
    const versions = urls
      .map((url) => {
        // Extract version number using regex
        const match = url.match(/\d+\.\d+\.\d+/);
        return match ? match[0] : null;
      })
      .filter(Boolean); // Remove any null values

    // Sort versions in descending order
    const sortedVersions = versions.sort((a, b) => {
      const [aMajor, aMinor, aPatch] = a.split(".").map(Number);
      const [bMajor, bMinor, bPatch] = b.split(".").map(Number);

      if (aMajor !== bMajor) return bMajor - aMajor;
      if (aMinor !== bMinor) return bMinor - aMinor;
      return bPatch - aPatch;
    });

    return sortedVersions[0]; // Return highest version
  }

  const handleToggleDownloadLinks = async () => {
    if (isDownloadsOpen) {
      setIsDownloadsOpen(false);
      return;
    }
    setIsDownloadLinksLoading(true);
    setIsDownloadsOpen(true);
    if (!downloadLinks.length > 0) {
      await fetchDownloadLinks();
    }
    setIsDownloadLinksLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-neutral-900 pb-10">
      <div className="w-full h-full ">
        <div className="container mx-auto pt-10 ">
          <div className="flex justify-between items-center mx-4 md:mx-0 mb-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="logo"
                width={24}
                height={24}
                onClick={() => router.push("/")}
                className="cursor-pointer"
              />
              <h2 className="text-3xl">Dashboard</h2>
            </div>
            <div className="md:flex gap-4 items-center hidden">
              <button
                onClick={() => router.push("/editor")}
                className="text-sm font-bold text-blue-500 hover:text-blue-600 underline  transition-all duration-300"
              >
                Web Editor (Experimental)
              </button>
              <button
                onClick={handleSignOut}
                className="text-sm font-bold text-neutral-300 px-4 py-2 rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 transition-all duration-300"
              >
                Sign Out
              </button>
            </div>
            <div className="inline md:hidden">
              <button onClick={() => setIsSmallNavbarOpen(!isSmallNavbarOpen)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-neutral-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>

          {isSmallNavbarOpen && (
            <div className="absolute top-0 left-0 w-full h-screen bg-neutral-900/50 backdrop-blur-sm">
              <button onClick={() => setIsSmallNavbarOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 absolute top-20 right-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="flex flex-col p-4 justify-center h-full gap-4">
                <button
                  onClick={() => router.push("/editor")}
                  className="text-sm font-bold text-blue-500 px-4 py-2 rounded-md cursor-pointer  hover:text-blue-700 hover:border-blue-700 transition-all duration-300 border-blue-500  border-2"
                >
                  Web Editor (Experimental)
                </button>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-bold text-neutral-300 px-4 py-2 rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
          {!user || !subscription ? (
            <div className="w-full h-screen bg-neutral-900 flex justify-center items-center">
              <PulseLoader color="#155dfc" speedMultiplier={0.85} />
            </div>
          ) : (
            <div className="bg-neutral-800 rounded-xl p-6 m-4 md:m-0 md:mb-6">
              <div className="flex flex-col md:flex-row justify-between ">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-300 mb-2 border-b border-neutral-700 pb-2 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    User
                  </h2>
                  <p className="text-neutral-300 mb-4">
                    {user.user.user_metadata.first_name}{" "}
                    {user.user.user_metadata.last_name}
                  </p>
                  <h2 className="text-2xl font-bold text-neutral-300 mb-2 border-b border-neutral-700 pb-2 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                      />
                    </svg>
                    Email
                  </h2>
                  <p className="text-neutral-300 mb-4 ">{user.user.email}</p>
                  <div className="mb-2 border-b border-neutral-700 pb-2 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-neutral-300 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                      </svg>
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
                    <h2 className="text-2xl font-bold text-neutral-300 mb-2 border-b border-neutral-700 pb-2 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                        />
                      </svg>
                      Subscription
                    </h2>
                    <div className="text-neutral-300 mb-4 ">
                      {!hasAccessCode
                        ? subscription.isSubscribed
                          ? "Subscribed"
                          : "Not Subscribed"
                        : " Lifetime Access"}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    {!hasAccessCode &&
                      (subscription.isSubscribed ? (
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
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Download Links Section */}
          <div className="bg-neutral-800 rounded-xl p-6 m-4 md:m-0">
            <div
              className={clsx([
                " flex justify-between items-center",
                isDownloadsOpen && "mb-4 border-b border-neutral-700 pb-2",
              ])}
            >
              <h2 className="text-2xl font-bold text-neutral-300 ">
                Download Links
              </h2>
              <button
                onClick={handleToggleDownloadLinks}
                disabled={isDownloadLinksLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-neutral-200 hover:text-neutral-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </div>
            {isDownloadsOpen && (
              <>
                {isDownloadLinksLoading && (
                  <div className="w-full  flex justify-center items-center">
                    <PulseLoader color="#155dfc" speedMultiplier={0.85} />
                  </div>
                )}
                {downloadLinksError && (
                  <p className="text-neutral-300 mb-4">{downloadLinksError}</p>
                )}
                {(subscription && subscription.isSubscribed) ||
                hasAccessCode ? (
                  <div className="text-neutral-300 mb-4 flex flex-col gap-4 md:flex-row ">
                    {downloadLinks.map(({ system, files }) => (
                      <div className="w-full" key={system}>
                        <h3 className="text-lg font-bold text-neutral-300 mb-4 border-b border-neutral-700 pb-2">
                          {system}
                        </h3>
                        <div className="flex flex-col">
                          <a
                            href={
                              files[
                                files.findIndex((e) =>
                                  e.includes(getMostRecentVersion(files))
                                )
                              ]
                            }
                            className="bg-blue-600 transition-all hover:bg-blue-700 mr-auto p-4 rounded-md flex items-center gap-2"
                          >
                            {system === "Windows" ? (
                              <FaWindows size={22} />
                            ) : (
                              <FaApple size={22} />
                            )}{" "}
                            Download for {system}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-300 mb-4">
                    You need to subscribe to download the application!
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
