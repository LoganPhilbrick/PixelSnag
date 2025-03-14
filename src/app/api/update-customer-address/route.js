import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { address } = await req.json();
  const supabase = await createClient();

  const { data, error } = await supabase.auth.updateUser({
    data: {
      address: address.address,
    },
  });

  console.log("data", data);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Address updated", data, error: null, status: 200 },
    { status: 200 }
  );
}
