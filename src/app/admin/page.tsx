"use client";

import { FormEvent, useEffect, useState } from "react";
import { BarChart3, FileText, FolderKanban, Inbox, LogOut, Plus, Settings, Users } from "lucide-react";

const menu = [["Vue d'ensemble", BarChart3], ["Projets", FolderKanban], ["Articles", FileText], ["Messages", Inbox], ["Utilisateurs", Users]] as const;
type Stats = { projects: number; articles: number; unreadMessages: number; visits: number };

export default function AdminPage() {
  const [active, setActive] = useState("Vue d'ensemble");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<Stats>({ projects: 0, articles: 0, unreadMessages: 0, visits: 0 });

  async function loadStats() {
    const response = await fetch("/api/admin/stats");
    if (!response.ok) return false;
    setStats(await response.json());
    setAuthenticated(true);
    return true;
  }

  useEffect(() => {
    let mounted = true;
    loadStats().finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: data.get("email"), password: data.get("password") }) });
    if (!response.ok) {
      const result = await response.json().catch(() => null) as { error?: string } | null;
      setError(result?.error ?? "Email ou mot de passe incorrect.");
      return;
    }
    setError("");
    await loadStats();
  }

  if (loading) return <main className="flex min-h-screen items-center justify-center bg-[#eeeae2] mono text-xs">Chargement sécurisé...</main>;
  if (!authenticated) return <main className="flex min-h-screen items-center justify-center bg-[#eeeae2] p-5"><form onSubmit={login} className="w-full max-w-md border border-[var(--line)] bg-[var(--background)] p-8 md:p-10"><p className="mono mb-3 text-xs text-[var(--orange)]">Accès restreint</p><h1 className="display text-4xl">Connexion studio</h1><p className="mt-4 text-sm leading-6 text-[var(--muted)]">Connectez-vous pour gérer votre portfolio.</p>{error && <p className="mt-5 text-sm text-[var(--orange)]">{error}</p>}<label className="mt-7 block text-xs uppercase tracking-[.12em]">Email<input name="email" type="email" required className="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 outline-none focus:border-[var(--ink)]" /></label><label className="mt-5 block text-xs uppercase tracking-[.12em]">Mot de passe<input name="password" type="password" required className="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 outline-none focus:border-[var(--ink)]" /></label><button className="mt-8 w-full bg-[var(--ink)] px-5 py-4 text-sm text-white">Se connecter ↗</button></form></main>;

  const cards = [["Visites ce mois", String(stats.visits), "Neon"], ["Projets publiés", String(stats.projects), "en ligne"], ["Articles", String(stats.articles), "publiés"], ["Messages non lus", String(stats.unreadMessages).padStart(2, "0"), "à traiter"]];
  return <main className="min-h-screen bg-[#eeeae2] text-[var(--ink)]"><aside className="fixed hidden h-screen w-64 flex-col border-r border-[var(--line)] bg-[var(--background)] p-6 md:flex"><a href="/" className="mono text-sm">NM<span className="text-[var(--orange)]">.</span> / studio</a><nav className="mt-16 space-y-2">{menu.map(([label, Icon]) => <button key={label} onClick={() => setActive(label)} className={`flex w-full items-center gap-3 px-3 py-3 text-left text-sm ${active === label ? "bg-[var(--accent)] font-semibold" : "text-[var(--muted)] hover:text-[var(--ink)]"}`}><Icon size={16} strokeWidth={1.7} />{label}</button>)}</nav><div className="mt-auto space-y-2 border-t border-[var(--line)] pt-5"><button className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--muted)]"><Settings size={16} />Paramètres</button><a href="/" className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--muted)]"><LogOut size={16} />Retour au site</a></div></aside><div className="md:ml-64"><header className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--background)] px-5 py-5 md:px-10"><div><p className="mono text-[10px] uppercase tracking-[.15em] text-[var(--orange)]">Espace administrateur</p><h1 className="mt-2 text-2xl font-semibold">{active}</h1></div><div className="flex items-center gap-3"><span className="hidden text-right text-xs md:block">Excellence Kisengo<br /><span className="text-[var(--muted)]">Administrateur</span></span><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--ink)] text-xs text-white">EK</div></div></header><section className="p-5 md:p-10"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cards.map(([label, value, delta]) => <div key={label} className="border border-[var(--line)] bg-[var(--background)] p-5"><p className="text-xs text-[var(--muted)]">{label}</p><div className="mt-5 flex items-end justify-between"><strong className="text-3xl font-semibold">{value}</strong><span className="mono text-[10px] text-[#63810a]">{delta}</span></div></div>)}</div><div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]"><div className="border border-[var(--line)] bg-[var(--background)] p-6"><div className="flex items-center justify-between"><h2 className="font-semibold">Activité du portfolio</h2><span className="mono text-[10px] text-[var(--muted)]">30 derniers jours</span></div><div className="mt-8 flex h-48 items-end gap-2 border-b border-l border-[var(--line)] px-3">{[32, 46, 40, 66, 55, 71, 48, 84, 62, 77, 92, 68, 80, 95, 72, 88, 76, 100, 84, 90].map((height, index) => <div key={index} style={{ height: `${height}%` }} className="flex-1 bg-[var(--orange)] opacity-80" />)}</div></div><div className="border border-[var(--line)] bg-[var(--background)] p-6"><h2 className="font-semibold">Actions rapides</h2><div className="mt-6 space-y-3"><button className="flex w-full items-center gap-2 bg-[var(--ink)] px-4 py-3 text-left text-xs text-white"><Plus size={15} />Nouveau projet</button><button className="flex w-full items-center gap-2 border border-[var(--line)] px-4 py-3 text-left text-xs"><FileText size={15} />Nouvel article</button></div></div></div></section></div></main>;
}
