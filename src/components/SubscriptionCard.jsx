import Image from "next/image";

function SubscriptionCard() {
  const benefits = [
    "Instant capturing and sharing",
    "Extensive editing tools",
    "AI-powered image analysis",
    "Full feature access across Windows and MacOS",
    "Priority customer support",
  ];

  return (
    <div className=" flex flex-col items-center justify-center bg-neutral-800 p-6 rounded-lg shadow-lg z-10">
      <Image
        src="/logo.svg"
        alt="logo"
        width={40}
        height={40}
        className="w-10 h-10 mb-2 mx-auto bg-neutral-500 rounded-md p-1"
      />
      <h3 className="text-lg lg:text-2xl font-bold mb-2 border-b border-neutral-700 pb-2 text-center text-neutral-200">
        Subscribe And Get:
      </h3>
      <div className=" border-b border-neutral-700 mb-2 ">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex items-center gap-2 mb-2 max-w-64 lg:max-w-96"
          >
            <span>✅</span>
            <p className="text-sm text-neutral-300">{benefit}</p>
          </div>
        ))}
      </div>
      <p className="text-md lg:text-xl text-neutral-300 font-bold text-center mb-1">
        Try for free- 14-Day Trial
      </p>
      <p className="text-md lg:text-xl text-neutral-300 text-center">
        Just $5/month after that!
      </p>
    </div>
  );
}

export default SubscriptionCard;
