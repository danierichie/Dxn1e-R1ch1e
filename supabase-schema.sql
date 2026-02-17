-- Run this in your Supabase project (SQL Editor) to create tables for D-COD MARKETPLACE.

-- Listings (marketplace + admin)
create table if not exists market_listings (
  id uuid default gen_random_uuid() primary key,
  data jsonb not null,
  created_at timestamptz default now()
);

-- Orders (marketplace purchases)
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  data jsonb not null,
  created_at timestamptz default now()
);

-- Sell-to-us submissions (admin view)
create table if not exists sell_submissions (
  id uuid default gen_random_uuid() primary key,
  data jsonb not null,
  created_at timestamptz default now()
);

-- Optional: enable RLS and allow service role full access (default)
-- alter table market_listings enable row level security;
-- alter table orders enable row level security;
-- alter table sell_submissions enable row level security;
