import Stripe from "stripe";
import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  const stripe = new Stripe(
    // eslint-disable-next-line no-undef
    process.env.NEXT_PUBLIC_STRIPE_TEST_MODE === "true"
      ? // eslint-disable-next-line no-undef
        process.env.NEXT_PUBLIC_STRIPE_TEST_SECRET_KEY
      : // eslint-disable-next-line no-undef
        process.env.NEXT_PUBLIC_STRIPE_LIVE_SECRET_KEY
  );

  const subscription = await stripe.subscriptions.create({
    customer: user.data.user.user_metadata.stripe_customer_id,
    items: [
      {
        price:
          // eslint-disable-next-line no-undef
          process.env.NEXT_PUBLIC_STRIPE_TEST_MODE === "true"
            ? "price_1R1HW0Ru8vr2oRZohHhIDQ95"
            : "price_1R1HX9Ru8vr2oRZocEBf9mN6",
      },
    ],
    payment_behavior: "default_incomplete",
    payment_settings: { save_default_payment_method: "on_subscription" },
    expand: ["latest_invoice.payment_intent"],
  });

  console.log(subscription);

  return NextResponse.json({
    subscriptionId: subscription.id,
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
  });
}
