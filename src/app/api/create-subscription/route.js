import Stripe from "stripe";
import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Step 1: Get the authenticated user
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

    const customerId = user.user_metadata?.stripe_customer_id;
    if (!customerId) {
      return NextResponse.json(
        { error: "Stripe customer ID not found" },
        { status: 400 }
      );
    }

    // eslint-disable-next-line no-undef
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

    // Step 2 (optional): Update the Stripe customer with address info if available
    await stripe.customers.update(customerId, {
      address: user.user_metadata.address || undefined,
    });

    // Step 3: Create the subscription with trial and setup intent
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: "price_1R1HX9Ru8vr2oRZocEBf9mN6", // <-- Replace with your real price ID
        },
      ],
      trial_period_days: 14, // <-- Set your trial length here
      payment_behavior: "default_incomplete",
      payment_settings: {
        save_default_payment_method: "on_subscription",
      },
      expand: ["pending_setup_intent", "latest_invoice"],
      automatic_tax: { enabled: true },
    });

    const setupIntent = subscription.pending_setup_intent;

    // Step 4: Validate and return the SetupIntent's client secret
    if (
      !setupIntent ||
      typeof setupIntent !== "object" ||
      !("client_secret" in setupIntent) ||
      !setupIntent.client_secret
    ) {
      console.error("Missing setup intent client secret:", setupIntent);
      return NextResponse.json(
        { error: "Unable to initialize payment." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: setupIntent.client_secret,
      subscription,
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
