export function useBoneyard() {
  if (typeof window === "undefined") return false;
  // ✅ Check the global first (only set during boneyard build)
  if (window.__BONEYARD_SNAPSHOT) return true;
  // ⚠️ Then check env var (only for local testing, can be removed)
  if (import.meta.env.VITE_BONEYARD === "true") return true;
  if (new URLSearchParams(window.location.search).get("boneyard") === "1")
    return true;
  return false;
}
