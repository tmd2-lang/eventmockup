/**
 * Seed profiles table from scripts/canon/constants.ts → PROFILE_IDENTITY.
 *
 * Usage: npm run import:profiles
 * Prerequisite: 001_v1_profiles_only.sql applied to v1 Supabase project
 */

import * as fs from "fs";
import * as path from "path";
import { createClient } from "@supabase/supabase-js";
import { PROFILE_IDENTITY } from "./canon/constants";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

async function main() {
  loadEnvLocal();
  const dryRun = process.argv.includes("--dry-run");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }

  const rows = PROFILE_IDENTITY.map((p) => ({
    id: p.id,
    display_name: p.display_name,
    first_name: p.first_name,
    year_level: p.year_level,
    pronouns: p.pronouns,
    school: p.school,
    archetype_name: p.archetype_name,
    archetype_id: p.archetype_id,
    avatar_url: p.avatar_url,
    gradient: p.gradient,
    hot_take: p.hot_take,
    behavioral_note: null,
    sort_order: p.sort_order,
  }));

  console.log(`profiles to upsert: ${rows.length}`);
  if (dryRun) {
    console.log("Dry run — no writes.");
    return;
  }

  const supabase = createClient(url, key);
  const { error } = await supabase.from("profiles").upsert(rows, { onConflict: "id" });
  if (error) {
    console.error(error);
    process.exit(1);
  }

  const { count, error: countError } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });
  if (countError) {
    console.error(countError);
    process.exit(1);
  }

  console.log(`profiles: ${count ?? rows.length} OK`);
  console.log("Profile import complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
