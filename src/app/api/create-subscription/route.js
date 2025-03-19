import Stripe from "stripe";
import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (!user.user_metadata?.stripe_customer_id) {
      return NextResponse.json(
        { error: "Stripe customer ID not found" },
        { status: 400 }
      );
    }

    // eslint-disable-next-line no-undef
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

    try {
      // Update Stripe customer address (optional)
      await stripe.customers.update(user.user_metadata.stripe_customer_id, {
        address: user.user_metadata.address,
      });

      const subscription = await stripe.subscriptions.create({
        customer: user.user_metadata.stripe_customer_id,
        items: [{ price: "price_1R1HX9Ru8vr2oRZocEBf9mN6" }],
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"],
        automatic_tax: { enabled: true },
        trial_period_days: 1,
      });

      const setupIntent = await stripe.setupIntents.create({
        customer: user.user_metadata.stripe_customer_id,
        usage: "off_session",
      });

      return NextResponse.json({
        subscriptionId: subscription.id,
        clientSecret: setupIntent.client_secret,
        subscription,
      });
    } catch (stripeError) {
      console.error("Stripe error:", stripeError);
      return NextResponse.json({ error: stripeError.message }, { status: 400 });
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
