// Central place that decides where API requests go.
//
// In development: REACT_APP_API_URL is unset, so this falls back to ""
// (empty string), meaning requests go to relative paths like "/api/peers" —
// which works locally via the "proxy" field in package.json.
//
// In production (Vercel): REACT_APP_API_URL is set to your Render/Railway URL,
// e.g. "https://shelearn-backend.up.railway.app", so every request is
// sent there instead.

export const API_URL = process.env.REACT_APP_API_URL || "";

// Helper so every fetch call in the app looks the same and nobody has to
// remember to prepend API_URL by hand.
export function apiFetch(path, options = {}) {
  return fetch(`${API_URL}${path}`, options);
}
