import { getSupabase } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const { data, error } = await supabase
    .from("orders")
    .select("data")
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const orders = (data || []).map((row) => row.data);
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const body = await request.json();
  const orders = Array.isArray(body.orders || body) ? (body.orders || body) : [body];
  const created_by = body.created_by || null;
  
  const rows = orders.map((data: object) => ({ 
    data,
    created_by: created_by 
  }));
  
  const { error } = await supabase.from("orders").insert(rows);
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
  const orders = await request.json();
  if (!Array.isArray(orders)) {
    return NextResponse.json({ error: "Expected array of orders" }, { status: 400 });
  }
  const { error: deleteError } = await supabase.from("orders").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }
  if (orders.length === 0) {
    return NextResponse.json({ ok: true });
  }
  const rows = orders.map((data: object) => ({ data }));
  const { error: insertError } = await supabase.from("orders").insert(rows);
  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
