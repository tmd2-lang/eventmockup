import homeContent from "@/data/canon/home_content.json";

export type WrappedStory = Record<string, unknown>;

export function parseWrappedContent(raw: unknown): WrappedStory | null {
  if (!raw) return null;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return typeof parsed === "object" && parsed ? (parsed as WrappedStory) : null;
    } catch {
      return null;
    }
  }
  if (typeof raw === "object") return raw as WrappedStory;
  return null;
}

export function isWrappedCarouselReady(wrapped: WrappedStory | null | undefined): boolean {
  if (!wrapped) return false;
  const theme = wrapped.theme as Record<string, unknown> | undefined;
  const slide1 = wrapped.slide1 as Record<string, unknown> | undefined;
  return Boolean(
    theme?.horoscopeIconColor &&
    slide1?.title &&
    wrapped.meshClass &&
    wrapped.starsColor &&
    wrapped.sealedText
  );
}

/** Fill missing theme tokens from starsColor so carousel slides never crash. */
export function normalizeWrappedContent(raw: unknown): WrappedStory | null {
  const wrapped = parseWrappedContent(raw);
  if (!wrapped) return null;

  const starsColor = (wrapped.starsColor as string) || "#F5D783";
  const existingTheme = (wrapped.theme as Record<string, unknown> | undefined) ?? {};
  const accent = (existingTheme.horoscopeIconColor as string) || starsColor;

  const theme = {
    horoscopeIconColor: accent,
    slide2Glow:
      existingTheme.slide2Glow ??
      `radial-gradient(460px 460px at 18% 14%, ${accent}26, transparent 62%)`,
    slide2Eyebrow: existingTheme.slide2Eyebrow ?? accent,
    slide3Glow:
      existingTheme.slide3Glow ??
      `radial-gradient(460px 460px at 82% 16%, ${accent}33, transparent 62%)`,
    slide3Eyebrow: existingTheme.slide3Eyebrow ?? accent,
    slide3Borders: (existingTheme.slide3Borders as string[] | undefined) ?? [accent, accent, accent],
    slide4Glow:
      existingTheme.slide4Glow ??
      `radial-gradient(460px 460px at 20% 18%, ${accent}26, transparent 62%)`,
    slide4Eyebrow: existingTheme.slide4Eyebrow ?? accent,
    slide5Glow:
      existingTheme.slide5Glow ??
      `radial-gradient(460px 460px at 50% 18%, ${accent}26, transparent 62%)`,
  };

  return {
    meshClass: wrapped.meshClass ?? "deep-purple-mesh",
    starsColor,
    sealedText: wrapped.sealedText ?? "Your week, decoded.",
    theme,
    slide1: wrapped.slide1,
    slide2: wrapped.slide2,
    slide3: wrapped.slide3,
    slide4: wrapped.slide4,
    slide5: wrapped.slide5,
  };
}

/** Prefer Supabase payload; fall back to canon JSON when DB row is stale or incomplete. */
export function resolveWrappedForProfile(
  profileId: string,
  fromDb: unknown
): WrappedStory | null {
  const parsed = parseWrappedContent(fromDb);
  if (isWrappedCarouselReady(parsed)) {
    return normalizeWrappedContent(parsed);
  }

  const fallback = homeContent.wrapped?.[profileId as keyof typeof homeContent.wrapped];
  if (fallback && isWrappedCarouselReady(fallback as WrappedStory)) {
    return normalizeWrappedContent(fallback);
  }

  return parsed ? normalizeWrappedContent(parsed) : null;
}
