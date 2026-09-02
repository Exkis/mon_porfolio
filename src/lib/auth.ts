import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "portfolio_admin_session";
const secret = () => process.env.AUTH_SECRET ?? "development-only-secret";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, expected] = stored.split(":");
  if (!salt || !expected) return false;
  const actual = scryptSync(password, salt, 64);
  const expectedBuffer = Buffer.from(expected, "hex");
  return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer);
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function createSession(userId: string, role: string) {
  const payload = Buffer.from(JSON.stringify({ userId, role, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function readSession(token?: string) {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || sign(payload) !== signature) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as { userId: string; role: string; exp: number };
    return data.exp > Date.now() ? data : null;
  } catch { return null; }
}

export async function getCurrentSession() {
  const store = await cookies();
  return readSession(store.get(COOKIE_NAME)?.value);
}

export { COOKIE_NAME };
