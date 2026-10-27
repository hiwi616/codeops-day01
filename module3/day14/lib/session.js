import { cookies } from "next/headers";

// DEMO auth: the cookie holds a user id. Real apps sign/encrypt the session.
export const USERS = [
  { id: "u_almaz", name: "Almaz" },
  { id: "u_dawit", name: "Dawit" },
];

// Reading cookies() makes the calling route dynamic - only call this from
// /checkout and /orders, never from a shared layout or header.
export async function getSession() {
  const jar = await cookies();
  const id = jar.get("session")?.value;
  return USERS.find((u) => u.id === id) ?? null;
}
