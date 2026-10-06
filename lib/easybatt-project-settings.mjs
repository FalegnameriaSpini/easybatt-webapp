export function projectSettings(env = process.env) {
  const preview =
    env.EASYBATT_SANDBOX === "1" &&
    env.NODE_ENV === "development" &&
    !env.VERCEL;
  if (env.EASYBATT_SANDBOX === "1" || env.EASYBATT_PROJECTS_ENABLED !== "1")
    return { enabled: false, preview };
  try {
    if (
      new URL(env.SUPABASE_URL).protocol !== "https:" ||
      new URL(env.EASYBATT_PRIVACY_URL).protocol !== "https:"
    )
      return { enabled: false, preview: false };
  } catch {
    return { enabled: false, preview: false };
  }
  if (
    !env.SUPABASE_SECRET_KEY ||
    (env.EASYBATT_PROJECTS_SECRET || "").length < 32 ||
    !/^[\w.-]{1,80}$/.test(env.EASYBATT_PROJECTS_PRIVACY_VERSION || "")
  )
    return { enabled: false, preview: false };
  return {
    enabled: true,
    preview: false,
    privacyUrl: env.EASYBATT_PRIVACY_URL,
    privacyVersion: env.EASYBATT_PROJECTS_PRIVACY_VERSION,
  };
}
