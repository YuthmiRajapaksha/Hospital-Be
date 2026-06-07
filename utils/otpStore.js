// Bounded, in-memory OTP store.
//
// Previous code stored OTPs in `global.otpStore` and scheduled a separate
// `setTimeout` on every /send-otp request. Each timer captured a closure that
// pinned memory for 5 minutes, and repeat requests for the same email never
// cleared the previous timer — so timers and entries accumulated under load
// and were not reclaimable until they fired. This module replaces that with a
// single Map and ONE sweeping interval, so memory stays bounded regardless of
// request volume.

const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const SWEEP_INTERVAL_MS = 60 * 1000; // purge expired entries once a minute

const store = new Map(); // emailKey -> { otp: string, expiresAt: number }

function normalizeKey(email) {
  return String(email || "").trim().toLowerCase();
}

function setOtp(email, otp) {
  const key = normalizeKey(email);
  store.set(key, { otp: String(otp), expiresAt: Date.now() + OTP_TTL_MS });
  return key;
}

function verifyOtp(email, otp) {
  const key = normalizeKey(email);
  const entry = store.get(key);
  if (!entry || entry.expiresAt < Date.now()) {
    store.delete(key);
    return false;
  }
  if (entry.otp !== String(otp)) return false;
  store.delete(key); // single-use
  return true;
}

function deleteOtp(email) {
  store.delete(normalizeKey(email));
}

// Single sweep timer for the whole process. `unref()` so it never keeps the
// event loop (and the process) alive on its own.
const sweeper = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.expiresAt < now) store.delete(key);
  }
}, SWEEP_INTERVAL_MS);
sweeper.unref();

module.exports = { setOtp, verifyOtp, deleteOtp, _store: store };
