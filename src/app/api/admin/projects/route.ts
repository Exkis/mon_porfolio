import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/auth";

async function authorized() { const session = await getCurrentSession(); return session?.role === "ADMIN"; }

export async function GET() {
  if (!await authorized()) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  return NextResponse.json(await prisma.project.findMany({ orderBy: { updatedAt: "desc" } }));
}

export async function POST(request: Request) {
  if (!await authorized()) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const body = await request.json();
  const title = String(body.title ?? "").trim();
  const slug = String(body.slug ?? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")).trim();
  if (!title || !slug || !body.summary || !body.description) return NextResponse.json({ error: "Titre, résumé et description requis." }, { status: 400 });
  const project = await prisma.project.create({ data: { title, slug, summary: String(body.summary), description: String(body.description), coverImage: body.coverImage ? String(body.coverImage) : null, tags: Array.isArray(body.tags) ? body.tags.map(String) : [], featured: Boolean(body.featured), published: Boolean(body.published) } });
  return NextResponse.json(project, { status: 201 });
}
