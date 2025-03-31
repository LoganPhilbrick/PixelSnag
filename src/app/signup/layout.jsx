import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";

async function layout({ children }) {
  const supabase = await createClient();

  const {
    data: { user: userData },
  } = await supabase.auth.getUser();

  if (userData) {
    redirect("/dashboard");
  }
  return children;
}

export default layout;
