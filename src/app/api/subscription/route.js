import Stripe from "stripe";

const stripe = new Stripe(
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
);

export async function GET(request) {
  const url = new URL(request.url, `http://${request.headers.get("host")}`); // Ensure absolute URL
  const stripeCustomerId = url.searchParams.get("stripeCustomerId");

  if (!stripeCustomerId) {
    return new Response(JSON.stringify({ error: "Customer ID required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: "active",
    });

    return new Response(
      JSON.stringify({
        ...subscriptions,
        isSubscribed: subscriptions.data.length > 0,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Stripe error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
