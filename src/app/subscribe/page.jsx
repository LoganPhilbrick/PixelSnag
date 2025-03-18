import Subscribe from "../../screens/Subscribe";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return <Subscribe />;
}

export default page;
