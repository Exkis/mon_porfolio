import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } });
    return NextResponse.json(articles, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } });
  } catch {
    return NextResponse.json({ error: "Contenu momentanément indisponible." }, { status: 503 });
  }
}
