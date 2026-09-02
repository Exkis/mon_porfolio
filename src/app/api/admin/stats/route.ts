import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/auth";

export async function GET() {
  const session = await getCurrentSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const [projects, articles, unreadMessages, visits, recentMessages] = await Promise.all([
    prisma.project.count({ where: { published: true } }),
    prisma.article.count({ where: { published: true } }),
    prisma.contactMessage.count({ where: { status: "NEW" } }),
    prisma.visit.count({ where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5, select: { id: true, name: true, email: true, message: true, status: true, createdAt: true } }),
  ]);
  return NextResponse.json({ projects, articles, unreadMessages, visits, recentMessages });
}
