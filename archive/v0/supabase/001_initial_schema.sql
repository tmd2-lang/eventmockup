-- Ligo demo canon — phase 1 schema
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profiles (
  id              text PRIMARY KEY,
  display_name    text NOT NULL,
  first_name      text NOT NULL,
  year_level      text,
  pronouns        text,
  school          text NOT NULL DEFAULT 'Georgetown',
  archetype_name  text NOT NULL,
  archetype_id    text NOT NULL,
  avatar_url      text,
  gradient        text,
  hot_take        text,
  behavioral_note text,
  sort_order      int NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- daily_questions
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS daily_questions (
  day_number      int PRIMARY KEY,
  scheduled_date  date NOT NULL,
  weekday         text NOT NULL,
  question_type   text NOT NULL,
  answer_type     text NOT NULL CHECK (answer_type IN ('Song', 'Artist', 'Genre')),
  question_text   text NOT NULL,
  original_number int
);

-- ---------------------------------------------------------------------------
-- daily_answers
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS daily_answers (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_number   int NOT NULL REFERENCES daily_questions (day_number) ON DELETE CASCADE,
  profile_id   text NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  answer_text  text NOT NULL,
  answer_kind  text NOT NULL CHECK (answer_kind IN ('song', 'artist', 'genre')),
  artist       text,
  title        text,
  cover_url    text,
  UNIQUE (day_number, profile_id)
);

CREATE INDEX IF NOT EXISTS daily_answers_profile_id_idx ON daily_answers (profile_id);
CREATE INDEX IF NOT EXISTS daily_answers_day_number_idx ON daily_answers (day_number);

-- ---------------------------------------------------------------------------
-- connection_pairs (reference — not used at runtime for Connection Night UI)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS connection_pairs (
  profile_a_id      text NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  profile_b_id      text NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  score             int NOT NULL,
  match_type        text NOT NULL,
  shared_lane       text,
  headline_overlap  text,
  why_copy          text NOT NULL,
  PRIMARY KEY (profile_a_id, profile_b_id),
  CHECK (profile_a_id < profile_b_id)
);

-- ---------------------------------------------------------------------------
-- connection_roster (runtime source for Connection Night — denormalized)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS connection_roster (
  viewer_id         text NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  rank              int NOT NULL,
  match_id          text NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  score             int NOT NULL,
  match_type        text NOT NULL,
  shared_lane       text,
  headline_overlap  text,
  why_copy          text NOT NULL,
  PRIMARY KEY (viewer_id, rank),
  UNIQUE (viewer_id, match_id)
);

CREATE INDEX IF NOT EXISTS connection_roster_viewer_id_idx ON connection_roster (viewer_id);

-- ---------------------------------------------------------------------------
-- RLS — public read for demo canon; writes via service role only
-- ---------------------------------------------------------------------------
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE connection_pairs ENABLE ROW LEVEL SECURITY;
ALTER TABLE connection_roster ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_profiles" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "public_read_daily_questions" ON daily_questions
  FOR SELECT USING (true);

CREATE POLICY "public_read_daily_answers" ON daily_answers
  FOR SELECT USING (true);

CREATE POLICY "public_read_connection_pairs" ON connection_pairs
  FOR SELECT USING (true);

CREATE POLICY "public_read_connection_roster" ON connection_roster
  FOR SELECT USING (true);
