import Stripe from "stripe";

const stripe = new Stripe(
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
);

export async function GET(request) {
  const url = new URL(request.url, `http://${request.headers.get("host")}`); // Ensure absolute URL

  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const decodedToken = token === "token";

  if (!decodedToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const stripeCustomerId = decodedToken.stripeCustomerId;

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
