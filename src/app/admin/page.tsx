"use client";

import { BarChart3, FileText, FolderKanban, Inbox, LogOut, Plus, Settings, Users } from "lucide-react";
import { useState } from "react";

const menu = [
  ["Vue d'ensemble", BarChart3],
  ["Projets", FolderKanban],
  ["Articles", FileText],
  ["Messages", Inbox],
  ["Utilisateurs", Users],
] as const;

export default function AdminPage() {
  const [active, setActive] = useState("Vue d'ensemble");
  return (
    <main className="min-h-screen bg-[#eeeae2] text-[var(--ink)]">
      <aside className="fixed hidden h-screen w-64 flex-col border-r border-[var(--line)] bg-[var(--background)] p-6 md:flex">
        <a href="/" className="mono text-sm">NM<span className="text-[var(--orange)]">.</span> / studio</a>
        <nav className="mt-16 space-y-2">{menu.map(([label, Icon]) => <button key={label} onClick={() => setActive(label)} className={`flex w-full items-center gap-3 px-3 py-3 text-left text-sm ${active === label ? "bg-[var(--accent)] font-semibold" : "text-[var(--muted)] hover:text-[var(--ink)]"}`}><Icon size={16} strokeWidth={1.7} />{label}</button>)}</nav>
        <div className="mt-auto space-y-2 border-t border-[var(--line)] pt-5"><button className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--muted)]"><Settings size={16} />Paramètres</button><a href="/" className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--muted)]"><LogOut size={16} />Retour au site</a></div>
      </aside>
      <div className="md:ml-64"><header className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--background)] px-5 py-5 md:px-10"><div><p className="mono text-[10px] uppercase tracking-[.15em] text-[var(--orange)]">Espace administrateur</p><h1 className="mt-2 text-2xl font-semibold">{active}</h1></div><div className="flex items-center gap-3"><span className="hidden text-right text-xs md:block">Noé Martin<br /><span className="text-[var(--muted)]">Administrateur</span></span><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--ink)] text-xs text-white">NM</div></div></header><section className="p-5 md:p-10"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["Visites ce mois", "12 842", "+18.4%"], ["Projets publiés", "24", "+3"], ["Articles", "18", "+2"], ["Messages non lus", "07", "à traiter"]].map(([label, value, delta]) => <div key={label} className="border border-[var(--line)] bg-[var(--background)] p-5"><p className="text-xs text-[var(--muted)]">{label}</p><div className="mt-5 flex items-end justify-between"><strong className="text-3xl font-semibold">{value}</strong><span className="mono text-[10px] text-[#63810a]">{delta}</span></div></div>)}</div><div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]"><div className="border border-[var(--line)] bg-[var(--background)] p-6"><div className="flex items-center justify-between"><h2 className="font-semibold">Activité du portfolio</h2><span className="mono text-[10px] text-[var(--muted)]">30 derniers jours</span></div><div className="mt-8 flex h-48 items-end gap-2 border-b border-l border-[var(--line)] px-3">{[32, 46, 40, 66, 55, 71, 48, 84, 62, 77, 92, 68, 80, 95, 72, 88, 76, 100, 84, 90].map((height, index) => <div key={index} style={{ height: `${height}%` }} className="flex-1 bg-[var(--orange)] opacity-80 transition-opacity hover:opacity-100" />)}</div><div className="mt-3 flex justify-between mono text-[9px] text-[var(--muted)]"><span>01 août</span><span>15 août</span><span>30 août</span></div></div><div className="border border-[var(--line)] bg-[var(--background)] p-6"><div className="flex items-center justify-between"><h2 className="font-semibold">Derniers messages</h2><button className="text-xs text-[var(--orange)]">Tout voir ↗</button></div><div className="mt-5 divide-y divide-[var(--line)]">{[["Sarah Chou", "Refonte de notre identité", "Il y a 2h"], ["Marc Dubois", "Projet Luma finance", "Hier"], ["Studio Oka", "Collaboration", "28 août"]].map(([name, subject, time]) => <div key={name} className="py-4"><div className="flex justify-between"><strong className="text-sm">{name}</strong><span className="mono text-[9px] text-[var(--muted)]">{time}</span></div><p className="mt-1 text-xs text-[var(--muted)]">{subject}</p></div>)}</div></div></div><div className="mt-6 flex items-center justify-between border-b border-[var(--line)] pb-4"><h2 className="text-lg font-semibold">Contenu récent</h2><button className="flex items-center gap-2 bg-[var(--ink)] px-4 py-3 text-xs text-white"><Plus size={15} />Créer</button></div></section></div>
    </main>
  );
}
