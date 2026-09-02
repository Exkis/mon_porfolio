import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({ where: { published: true }, orderBy: [{ featured: "desc" }, { createdAt: "desc" }] });
    return NextResponse.json(projects, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } });
  } catch {
    return NextResponse.json({ error: "Contenu momentanément indisponible." }, { status: 503 });
  }
}
