# D-COD Marketplace

A custom marketplace for Call of Duty: Mobile accounts. Built with Next.js, Supabase, and Tailwind.

## Project Overview

This is a specialized platform where players can securely buy or sell high-end CODM accounts. It handles everything from verification to appraisal, using Supabase for the backend and Next.js for the frontend.

### Key Parts
- **Marketplace**: Browse verified listings with rare skins and blueprints.
- **Sell System**: Simple form to submit account details for manual appraisal.
- **Auth**: Secure login/signup system using Supabase.
- **Admin**: Internal dashboard to manage submissions and inventory.

## Setup

1. **Install things**
   ```bash
   npm install
   ```

2. **Environment**
   Copy `.env.example` to `.env.local` and add your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

3. **Database**
   Run the SQL in `supabase-schema.sql` inside your Supabase project's SQL editor to set up the tables.

4. **Run Dev**
   ```bash
   npm run dev
   ```

## Deployment

Deploys automatically to Vercel whenever changes are pushed to `main`.
