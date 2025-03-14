import Stripe from "stripe";
import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  // get the user from the supabase client
  // we should have a user at this point in the flow
  const user = await supabase.auth.getUser();

  const stripe = new Stripe(
    // eslint-disable-next-line no-undef
    process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
  );

  const { error } = await stripe.customers.update(
    user.data.user.user_metadata.stripe_customer_id,
    {
      address: user.data.user.user_metadata.address,
    }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // create the subscription
  // this also creates the client secret
  // The price is an item that is created in the stripe dashboard
  // https://dashboard.stripe.com/products?active=true
  const subscription = await stripe.subscriptions.create({
    customer: user.data.user.user_metadata.stripe_customer_id,
    items: [
      {
        price: "price_1R1HW0Ru8vr2oRZohHhIDQ95",
      },
    ],
    payment_behavior: "default_incomplete",
    payment_settings: { save_default_payment_method: "on_subscription" },
    expand: ["latest_invoice.payment_intent"],
    automatic_tax: { enabled: true },
  });

  // return the subscription id and the client secret
  return NextResponse.json({
    subscriptionId: subscription.id,
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    subscription: subscription,
  });
}
