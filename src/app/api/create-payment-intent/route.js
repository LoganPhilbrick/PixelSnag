import Stripe from "stripe";
import { NextResponse } from "next/server";

// Initialize Stripe with your secret key
const stripe = new Stripe(
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
);

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
};

// OPTIONS handler for CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request) {
  try {
    const { amount, email, name } = await request.json();

    // Create or retrieve a customer
    let customer;
    const customers = await stripe.customers.list({ email: email });

    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: email,
        name: name,
      });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // amount in cents
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json(
      {
        clientSecret: paymentIntent.client_secret,
        customerId: customer.id,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
