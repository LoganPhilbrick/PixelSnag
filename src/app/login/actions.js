"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";

export async function login(formData) {
  const supabase = await createClient();
  console.log(formData);

  // Check honeypot field - if it's filled, silently fail
  const honeypot = formData.username;
  if (honeypot && honeypot.length > 0) {
    redirect("/error");
  }

  // Access object properties directly instead of using .get()
  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/");
  redirect("/dashboard");
}
