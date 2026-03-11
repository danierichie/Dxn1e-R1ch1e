-- ============================================================
-- D-COD MARKETPLACE — Supabase Schema
-- Run this in your Supabase project (SQL Editor).
-- ============================================================


-- -----------------------------------------------
-- FIX 2: Users / Profiles table
-- -----------------------------------------------
create table if not exists users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  password_hash text not null,         -- bcryptjs hash
  display_name text,
  role text not null default 'user',   -- 'user' | 'admin'
  created_at timestamptz default now()
);


-- -----------------------------------------------
-- Listings (marketplace + admin)
-- FIX 3: created_by FK references users(id)
-- -----------------------------------------------
create table if not exists market_listings (
  id uuid default gen_random_uuid() primary key,
  data jsonb not null,
  created_by uuid references users(id) on delete set null,
  created_at timestamptz default now()
);

-- -----------------------------------------------
-- Orders (marketplace purchases)
-- FIX 3: created_by FK references users(id)
-- -----------------------------------------------
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  data jsonb not null,
  created_by uuid references users(id) on delete set null,
  created_at timestamptz default now()
);

-- -----------------------------------------------
-- Sell-to-us submissions (admin view)
-- FIX 3: created_by FK references users(id)
-- -----------------------------------------------
create table if not exists sell_submissions (
  id uuid default gen_random_uuid() primary key,
  data jsonb not null,
  created_by uuid references users(id) on delete set null,
  created_at timestamptz default now()
);


-- -----------------------------------------------
-- FIX 4: Indexes for query performance
-- -----------------------------------------------
create index if not exists idx_market_listings_created_at  on market_listings  (created_at desc);
create index if not exists idx_orders_created_at           on orders           (created_at desc);
create index if not exists idx_sell_submissions_created_at on sell_submissions (created_at desc);
create index if not exists idx_market_listings_created_by  on market_listings  (created_by);
create index if not exists idx_orders_created_by           on orders           (created_by);
create index if not exists idx_sell_submissions_created_by on sell_submissions (created_by);
create index if not exists idx_users_email                 on users            (email);


-- -----------------------------------------------
-- FIX 1: Enable RLS on all tables
-- -----------------------------------------------
alter table users             enable row level security;
alter table market_listings   enable row level security;
alter table orders            enable row level security;
alter table sell_submissions  enable row level security;

-- Service role bypasses RLS by default (your app uses service role key).
-- These policies allow the anon/authenticated roles read access if needed.
-- Adjust or remove based on your security requirements.

-- users: only the service role can write; no public read
create policy "service role full access on users"
  on users for all
  using (auth.role() = 'service_role');

-- market_listings: public read, service role write
create policy "public read market_listings"
  on market_listings for select
  using (true);

create policy "service role write market_listings"
  on market_listings for all
  using (auth.role() = 'service_role');

-- orders: service role only (private order data)
create policy "service role full access on orders"
  on orders for all
  using (auth.role() = 'service_role');

-- sell_submissions: service role only (admin view)
create policy "service role full access on sell_submissions"
  on sell_submissions for all
  using (auth.role() = 'service_role');

