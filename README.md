# LNS — Final LAN Complete (Production-ready ZIP)

This package includes a production-ready Next.js app and Supabase migration + seed scripts following the Final LAN.pdf flow and our full feature set:
- Role-first Goal Engine, Goal Search, Resume parse
- Adaptive IRT engine (2PL/3PL) + calibration script
- Actor-specific dashboards (Learner, Coach, Provider, Hiring, Evaluator, Manager, Admin)
- Recommendation engine (courses + AI Tutor + affiliate links)
- Persona practice (OpenAI enabled fallback), Coaching reports, Roadmaps
- Ad interstitial (60s, skippable after 15s) and ad-event logging
- Supabase RLS policies for core tables
- Demo Auth users seeded via script
- Admin CRUD UI to manage questions & edit IRT params and run calibration

IMPORTANT: Do **NOT** paste API keys in public chats. Revoke any keys you may have exposed earlier.

## Quick deploy (one-time)
1. Unzip project and `cd` into it.
2. `npm install`
3. Create a Supabase project.
4. In Supabase SQL editor, paste and run `supabase/migrations/20250906_final_lan_complete.sql`.
5. Copy `.env.example` -> `.env.local` and populate:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - Optional: `OPENAI_API_KEY`, `ADSENSE_CLIENT_ID`
6. Run seeds:
   - `npm run seed-db` (seeds roles, skills, questions, courses, coaches, demo data)
   - `npm run seed-auth` (creates demo auth users; requires `SUPABASE_SERVICE_ROLE_KEY`)
7. Start dev server: `npm run dev`. Visit `http://localhost:3000`.
8. Login with seeded demos (see scripts/seed_auth_users.js for creds).

## Calibration
- To calibrate question difficulties (b-parameters) using real responses, run:
  `npm run calibrate-irt` (requires SUPABASE_SERVICE_ROLE_KEY). This script reads assessment_items and updates b values.

## Deploy on Vercel
- Push to GitHub. In Vercel, add environment variables listed in `.env.example` (set service role on server side only).
- Deploy. Enable preview protection for service role key.

Security: Keep `SUPABASE_SERVICE_ROLE_KEY` private. Add RLS policies per your org.

If you want, I can:
- Run a simulated calibration and bake initial `b` values into SQL (I can simulate locally but cannot push to your Supabase).
- Create GitHub repo from this package and provide a deploy script for you to run.
