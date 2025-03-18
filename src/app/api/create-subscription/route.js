import Stripe from "stripe";
import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  // eslint-disable-next-line no-undef
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

  // Update Stripe customer address (optional)
  await stripe.customers.update(
    user.data.user.user_metadata.stripe_customer_id,
    {
      address: user.data.user.user_metadata.address,
    }
  );

  // 1️⃣ Create a subscription with a 1-day free trial
  const subscription = await stripe.subscriptions.create({
    customer: user.data.user.user_metadata.stripe_customer_id,
    items: [{ price: "price_1R1HX9Ru8vr2oRZocEBf9mN6" }],
    payment_behavior: "default_incomplete",
    payment_settings: { save_default_payment_method: "on_subscription" },
    expand: ["latest_invoice.payment_intent"],
    automatic_tax: { enabled: true },
    trial_period_days: 1,
  });

  // 2️⃣ Create a SetupIntent to collect payment details
  const setupIntent = await stripe.setupIntents.create({
    customer: user.data.user.user_metadata.stripe_customer_id,
    usage: "off_session", // Allows Stripe to charge them after trial
  });

  return NextResponse.json({
    subscriptionId: subscription.id,
    clientSecret: setupIntent.client_secret, // Send SetupIntent client secret
    subscription, // Send subscription details
  });
}
