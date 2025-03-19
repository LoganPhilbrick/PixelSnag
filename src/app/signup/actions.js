"use server";

import { redirect } from "next/navigation";

import { createClient } from "../../utils/supabase/server";
import Stripe from "stripe";

export async function signup(values) {
  const email = values.email?.trim();
  const password = values.password?.trim();
  const firstName = values.firstName?.trim();
  const lastName = values.lastName?.trim();
  const accessCode = values.accessCode?.trim();

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
      process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
    );
    // check if the stripe customer already exists
    // if it does, use it
    // if it doesn't, create a new one
    // we need to pass the customer id to the supabase auth.signup
    let customer;
    try {
      const existingCustomer = await stripe.customers.list({
        email,
      });

      if (existingCustomer.data.length > 0) {
        customer = existingCustomer.data[0];
      } else {
        customer = await stripe.customers.create({
          email,
          name: `${firstName} ${lastName}`,
        });
      }
    } catch (stripeError) {
      return { error: `Stripe error: ${stripeError.message}` };
    }

    const { error: authError, data: user } = await supabase.auth.signUp({
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

    if (!user) {
      return { error: "User creation failed" };
    }

    if (accessCode) {
      try {
        const { data: accessCodeData, error: accessCodeError } = await supabase
          .from("access_codes")
          .select("*")
          .eq("code", accessCode)
          .single();

        if (accessCodeError) {
          return { error: `Access code error: ${accessCodeError.message}` };
        }

        if (!accessCodeData) {
          return { error: "Invalid access code" };
        }

        if (accessCodeData.user_id) {
          console.log("Access code has already been used");
          return { error: "Access code has already been used" };
        }

        const { error: updateError } = await supabase
          .from("access_codes")
          .update({ user_id: user.user.id, redeemed_at: new Date() })
          .eq("code", accessCode);

        if (updateError) {
          return {
            error: `Failed to update access code: ${updateError.message}`,
          };
        }

        const { error: userUpdateError } = await supabase.auth.updateUser({
          data: {
            access_code: accessCode,
          },
        });

        console.log("userUpdateError", userUpdateError);

        if (userUpdateError) {
          return { error: `Failed to update user: ${userUpdateError.message}` };
        }
      } catch (accessCodeError) {
        return {
          error: `Access code processing error: ${accessCodeError.message}`,
        };
      }
    }

    return { success: true };
  } catch (error) {
    return { error: `Unexpected error: ${error.message}` };
  }
}
