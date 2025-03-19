import Stripe from "stripe";

const stripe = new Stripe(
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
);

export async function GET(request) {
  // Add CORS headers
  const allowedOrigins = [
    "http://localhost:3000",
    "https://pixelsnag.it.com",
    "http://localhost:9002",
  ]; // Adjust these URLs
  const origin = request.headers.get("origin");
  const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin)
      ? origin
      : allowedOrigins[0],
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  const url = new URL(request.url, `http://${request.headers.get("host")}`);
  const stripeCustomerId = url.searchParams.get("stripeCustomerId");

  if (!stripeCustomerId) {
    return new Response(JSON.stringify({ error: "Customer ID required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
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
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error("Stripe error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  }
}
