import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { COOKIE_NAME, createSession, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await prisma.user.findUnique({ where: { email: String(email).toLowerCase().trim() } });
    if (!user || user.role !== "ADMIN" || !verifyPassword(String(password), user.passwordHash)) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect." }, { status: 401 });
    }
    const response = NextResponse.json({ ok: true, name: user.name });
    response.cookies.set(COOKIE_NAME, createSession(user.id, user.role), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 60 * 60 * 24 * 7, path: "/" });
    return response;
  } catch {
    return NextResponse.json({ error: "La base de données est momentanément inaccessible. Réessayez dans quelques secondes." }, { status: 503 });
  }
}
