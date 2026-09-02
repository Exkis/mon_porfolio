import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/auth";

async function authorized() { const session = await getCurrentSession(); return session?.role === "ADMIN"; }

export async function GET() {
  if (!await authorized()) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  return NextResponse.json(await prisma.article.findMany({ orderBy: { updatedAt: "desc" } }));
}

export async function POST(request: Request) {
  if (!await authorized()) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const body = await request.json();
  const title = String(body.title ?? "").trim();
  const slug = String(body.slug ?? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")).trim();
  if (!title || !slug || !body.excerpt || !body.content) return NextResponse.json({ error: "Titre, extrait et contenu requis." }, { status: 400 });
  const published = Boolean(body.published);
  const article = await prisma.article.create({ data: { title, slug, excerpt: String(body.excerpt), content: String(body.content), coverImage: body.coverImage ? String(body.coverImage) : null, published, publishedAt: published ? new Date() : null } });
  return NextResponse.json(article, { status: 201 });
}
