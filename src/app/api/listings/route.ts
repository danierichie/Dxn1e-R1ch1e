import { getSupabase, hasSupabase } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const { data, error } = await supabase
    .from("market_listings")
    .select("data")
    .order("created_at", { ascending: true });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const listings = (data || []).map((row) => row.data);
  return NextResponse.json(listings);
}

export async function POST(request: Request) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const body = await request.json();
  const listing = body.listing ?? body;
  const { error } = await supabase.from("market_listings").insert({ data: listing });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function PUT(request: Request) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const listings = await request.json();
  if (!Array.isArray(listings)) {
    return NextResponse.json({ error: "Expected array of listings" }, { status: 400 });
  }
  const { error: deleteError } = await supabase.from("market_listings").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }
  if (listings.length === 0) {
    return NextResponse.json({ ok: true });
  }
  const rows = listings.map((data: object) => ({ data }));
  const { error: insertError } = await supabase.from("market_listings").insert(rows);
  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
