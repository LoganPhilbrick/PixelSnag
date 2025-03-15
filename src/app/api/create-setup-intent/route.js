import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "../../../utils/supabase/server";

// eslint-disable-next-line no-undef
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Ensure a customer ID is provided
    if (!user.user_metadata.stripe_customer_id) {
      return NextResponse.json(
        { error: "Missing customer ID" },
        { status: 400 }
      );
    }

    // Create a SetupIntent for collecting billing details
    const setupIntent = await stripe.setupIntents.create({
      customer: user.user_metadata.stripe_customer_id,
      payment_method_types: ["card"],
      metadata: {
        purpose: "address_collection",
      },
    });

    return NextResponse.json({ clientSecret: setupIntent.client_secret });
  } catch (error) {
    console.error("SetupIntent Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
