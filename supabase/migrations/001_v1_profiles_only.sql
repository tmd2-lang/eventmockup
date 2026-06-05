-- Ligo v1 — profiles only (no daily, connection, or home content tables)

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

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_profiles" ON profiles
  FOR SELECT USING (true);
