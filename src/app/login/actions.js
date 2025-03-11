"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";

export async function login(formData) {
  const supabase = await createClient();

  // Check honeypot field - if it's filled, silently fail
  const honeypot = formData.get("username");
  if (honeypot && honeypot.length > 0) {
    // Redirect to same error page to not reveal it was a honeypot detection
    redirect("/error");
  }

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/");
  redirect("/");
}
