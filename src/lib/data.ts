/**
 * Data layer: tries API (Supabase) first, falls back to localStorage.
 * Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to enable persistence.
 */

const API = typeof window !== "undefined" ? "" : undefined;

async function apiGet(path: string): Promise<{ ok: true; data: unknown } | { ok: false }> {
  if (typeof window === "undefined") return { ok: false };
  try {
    const res = await fetch(path);
    if (res.status === 503 || res.status !== 200) return { ok: false };
    const data = await res.json();
    return { ok: true, data };
  } catch {
    return { ok: false };
  }
}

async function apiPost(path: string, body: unknown): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.status === 200;
  } catch {
    return false;
  }
}

async function apiPut(path: string, body: unknown): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const res = await fetch(path, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.status === 200;
  } catch {
    return false;
  }
}

export async function getListings(): Promise<unknown[]> {
  const result = await apiGet("/api/listings");
  if (result.ok && Array.isArray(result.data)) return result.data;
  const saved = typeof window !== "undefined" ? localStorage.getItem("market_listings") : null;
  return saved ? JSON.parse(saved) : [];
}

export async function saveListings(listings: unknown[]): Promise<void> {
  const putOk = await apiPut("/api/listings", listings);
  if (typeof window !== "undefined") {
    localStorage.setItem("market_listings", JSON.stringify(listings));
  }
}

export async function addListing(listing: unknown): Promise<boolean> {
  const ok = await apiPost("/api/listings", { listing });
  return ok;
}

export async function getOrders(): Promise<unknown[]> {
  const result = await apiGet("/api/orders");
  if (result.ok && Array.isArray(result.data)) return result.data;
  const saved = typeof window !== "undefined" ? localStorage.getItem("orders") : null;
  return saved ? JSON.parse(saved) : [];
}

export async function saveOrders(orders: unknown[]): Promise<void> {
  await apiPut("/api/orders", orders);
  if (typeof window !== "undefined") {
    localStorage.setItem("orders", JSON.stringify(orders));
  }
}

export async function getSubmissions(): Promise<unknown[]> {
  const result = await apiGet("/api/submissions");
  if (result.ok && Array.isArray(result.data)) return result.data;
  const saved = typeof window !== "undefined" ? localStorage.getItem("sell_submissions") : null;
  return saved ? JSON.parse(saved) : [];
}

export async function addSubmission(submission: unknown): Promise<boolean> {
  const ok = await apiPost("/api/submissions", submission);
  return ok;
}
