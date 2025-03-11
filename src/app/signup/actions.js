"use server";

import { redirect } from "next/navigation";

import { createClient } from "../../utils/supabase/server";
import Stripe from "stripe";

export async function signup(values) {
  const email = values.email?.trim();
  const password = values.password?.trim();
  const firstName = values.firstName?.trim();
  const lastName = values.lastName?.trim();

  if (!email || !password || !firstName || !lastName) {
    return { error: "All fields are required" };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Invalid email format" };
  }

  // Password validation
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long" };
  }

  try {
    const supabase = await createClient();

    // Check honeypot
    const honeypot = values.username_confirm;
    if (honeypot && honeypot.length > 0) {
      redirect("/error");
    }

    const stripe = new Stripe(
      // eslint-disable-next-line no-undef
      process.env.NEXT_PUBLIC_STRIPE_TEST_MODE
        ? // eslint-disable-next-line no-undef
          process.env.NEXT_PUBLIC_STRIPE_TEST_SECRET_KEY
        : // eslint-disable-next-line no-undef
          process.env.NEXT_PUBLIC_STRIPE_LIVE_SECRET_KEY
    );
    // check if the stripe customer already exists
    // if it does, use it
    // if it doesn't, create a new one
    // we need to pass the customer id to the supabase auth.signup
    const existingCustomer = await stripe.customers.list({
      email,
    });

    let customer;

    if (existingCustomer.data.length > 0) {
      console.log("Customer already exists");
      customer = existingCustomer.data[0];
    } else {
      customer = await stripe.customers.create({
        email,
        name: `${firstName} ${lastName}`,
      });
    }

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          stripe_customer_id: customer.id,
        },
      },
    });

    if (authError) {
      return { error: authError.message };
    }

    console.log("Customer created");
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}
