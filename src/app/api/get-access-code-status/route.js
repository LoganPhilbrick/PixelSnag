import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: accessCodeData, error: accessCodeError } = await supabase
    .from("access_codes")
    .select("*")
    .eq("user_id", user.user.id)
    .single();

  if (accessCodeError) {
    return NextResponse.json(
      { error: accessCodeError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    hasAccessCode: !!accessCodeData,
  });
}
