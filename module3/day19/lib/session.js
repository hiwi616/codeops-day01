import { cookies } from "next/headers";

const MOCK_USERS = {
  tok_customer_1: { id: "usr_1", name: "Almaz", role: "customer" },
  tok_customer_2: { id: "usr_2", name: "Dawit", role: "customer" },
  tok_staff_1: { id: "usr_staff", name: "Chef Abebe", role: "staff" },
};

export async function getSession() {
  try {
    const cookieStore = await cookies();
    if (!cookieStore || typeof cookieStore.get !== "function") {
      return null;
    }
    const cookieItem = cookieStore.get("session");
    const token = cookieItem?.value;
    if (!token) return null;
    return MOCK_USERS[token] || null;
  } catch {
    return null;
  }
}

export async function setSession(token) {
  try {
    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  } catch (err) {
    console.error("Failed to set session cookie", err);
  }
}

export async function clearSession() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session");
  } catch (err) {
    console.error("Failed to delete session cookie", err);
  }
}
