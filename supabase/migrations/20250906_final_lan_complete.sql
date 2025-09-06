CREATE EXTENSION IF NOT EXISTS "pgcrypto";
BEGIN;
-- profiles (RLS enabled sample)
CREATE TABLE IF NOT EXISTS profiles (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), auth_id uuid UNIQUE, full_name text, email text, actor_type text, role_key text, goal_text text, goal_clarity_score int DEFAULT 0, created_at timestamptz DEFAULT now());
-- roles and courses
CREATE TABLE IF NOT EXISTS roles (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), key text UNIQUE, label text, created_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS courses (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), role_key text references roles(key), title text not null, provider text not null, link text not null, duration_hours int, duration_text text, price_inr int, price_text text, mode text, type text, is_ai_path boolean default false, tags text[] default '{}', created_at timestamptz DEFAULT now());
-- goals and milestones
CREATE TABLE IF NOT EXISTS user_goals (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid not null, role_key text references roles(key), timeframe_days int, budget_inr int, mode text, course_type text, selected_pathway text, status text default 'planned', activation_date date, target_date date, created_at timestamptz DEFAULT now(), completed_at timestamptz);
CREATE TABLE IF NOT EXISTS milestones (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), goal_id uuid references user_goals(id) on delete cascade, title text not null, is_completed boolean default false, completed_at timestamptz, sort_order int default 0);
-- recommendation events
CREATE TABLE IF NOT EXISTS rec_events (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid, query text, role_key text, inputs jsonb, results jsonb, created_at timestamptz DEFAULT now());
-- assessment and IRT
CREATE TABLE IF NOT EXISTS questions (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), skill_name text, prompt_template text, a double precision DEFAULT 1.0, b double precision DEFAULT 0.0, c double precision DEFAULT 0.25, meta jsonb);
CREATE TABLE IF NOT EXISTS question_options (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), question_id uuid references questions(id), option_text text, score_value double precision DEFAULT 0.0);
CREATE TABLE IF NOT EXISTS assessments (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid references profiles(id), role_key text, assessment_type text, status text default 'in_progress', started_at timestamptz DEFAULT now(), completed_at timestamptz);
CREATE TABLE IF NOT EXISTS assessment_items (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), assessment_id uuid references assessments(id), question_id uuid, response jsonb, score_obtained double precision, answered_at timestamptz);
CREATE TABLE IF NOT EXISTS ability_estimates (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid references profiles(id), role_key text, theta double precision DEFAULT 0.0, se double precision DEFAULT 1.0, updated_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS readiness_scores (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid references profiles(id), assessment_id uuid, overall_score double precision, breakdown jsonb, created_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS coaches (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text, expertise text[], booking_url text, bio text);
CREATE TABLE IF NOT EXISTS persona_sessions (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid references profiles(id), scenario text, persona_config jsonb, transcript jsonb, started_at timestamptz DEFAULT now(), completed_at timestamptz);
CREATE TABLE IF NOT EXISTS coaching_reports (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), session_id uuid references persona_sessions(id), user_id uuid references profiles(id), scores jsonb, feedback text, suggestions jsonb, created_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS ads_events (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid references profiles(id), ad_provider text, ad_unit_id text, watch_time_seconds int, ad_length_seconds int, clicked boolean default false, skipped boolean default false, created_at timestamptz DEFAULT now());
-- RLS: enable and policies (example)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY profiles_select_public ON profiles FOR SELECT USING (true); -- restrict as needed
-- You should replace above with stricter policies in production (e.g., auth.uid() checks)
COMMIT;