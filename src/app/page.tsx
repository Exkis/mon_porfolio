"use client";

import { useState } from "react";

const projects = [
  { title: "Luma finance", type: "Product design · 2024", color: "#d5f45b", visual: "◒" },
  { title: "Maison Matisse", type: "Direction artistique · 2023", color: "#ed704b", visual: "✳" },
  { title: "Atelier Noma", type: "Identité & digital · 2023", color: "#c5d5e8", visual: "⌁" },
];

export default function Home() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [filter, setFilter] = useState("Tous");

  return (
    <main>
      <header className="fixed top-0 z-20 flex w-full items-center justify-between border-b border-[var(--line)] bg-[rgba(244,241,235,.9)] px-5 py-4 backdrop-blur-md md:px-10">
        <a href="#top" className="mono text-sm tracking-[-.04em]">NM<span className="text-[var(--orange)]">.</span></a>
        <nav className="hidden gap-8 text-xs uppercase tracking-[.12em] md:flex">
          <a href="#work" className="transition-opacity hover:opacity-50">Projets</a>
          <a href="#journal" className="transition-opacity hover:opacity-50">Journal</a>
          <a href="#about" className="transition-opacity hover:opacity-50">À propos</a>
        </nav>
        <button onClick={() => setAdminOpen(true)} className="rounded-full border border-[var(--ink)] px-4 py-2 text-xs font-semibold transition-colors hover:bg-[var(--ink)] hover:text-[var(--background)]">Espace admin ↗</button>
      </header>

      <section id="top" className="grid-paper relative flex min-h-screen flex-col justify-end overflow-hidden px-5 pb-14 pt-32 md:px-10 md:pb-20">
        <div className="absolute right-[10%] top-[26%] hidden h-36 w-36 rotate-12 border border-[var(--ink)] md:block"><div className="absolute inset-4 border border-[var(--orange)]" /></div>
        <div className="max-w-6xl reveal">
          <p className="mono mb-5 text-xs uppercase tracking-[.18em] text-[var(--muted)]">Paris · France / 2026</p>
          <h1 className="display max-w-5xl text-[clamp(3.7rem,10vw,9.5rem)] leading-[.85] tracking-[-.06em]">Je donne une forme<br /><em className="text-[var(--orange)]">claire</em> aux idées.</h1>
          <div className="mt-10 flex max-w-xl items-start justify-between gap-8 text-sm leading-6 text-[var(--muted)] md:ml-[34%]"><p>Designer produit indépendant, je crée des identités et des expériences numériques qui restent en tête.</p><span className="mono hidden text-xs text-[var(--ink)] md:block">↓<br />défiler</span></div>
        </div>
        <div className="absolute bottom-5 left-0 w-[200%] overflow-hidden border-y border-[var(--line)] py-3 text-xs uppercase tracking-[.16em] text-[var(--muted)]"><div className="marquee flex w-max gap-10">Strategy — Identity — Digital products — Strategy — Identity — Digital products — Strategy — Identity — Digital products —</div></div>
      </section>

      <section id="work" className="px-5 py-24 md:px-10 md:py-36">
        <div className="mb-14 flex items-end justify-between border-b border-[var(--line)] pb-5"><div><p className="mono mb-3 text-xs text-[var(--orange)]">01 / Sélection</p><h2 className="display text-5xl leading-none md:text-7xl">Travaux choisis</h2></div><span className="mono text-xs text-[var(--muted)]">{projects.length} projets</span></div>
        <div className="mb-8 flex gap-2">{["Tous", "Digital", "Identité"].map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-4 py-2 text-xs transition-colors ${filter === item ? "bg-[var(--ink)] text-[var(--background)]" : "border border-[var(--line)] hover:border-[var(--ink)]"}`}>{item}</button>)}</div>
        <div className="grid gap-5 md:grid-cols-3">{projects.map((project, index) => <article key={project.title} className={`group ${filter !== "Tous" && index === 1 ? "hidden" : ""}`}><div style={{ backgroundColor: project.color }} className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-[var(--ink)]"><span className="display text-[10rem] leading-none transition-transform duration-500 group-hover:scale-110">{project.visual}</span><span className="absolute bottom-4 left-4 mono text-xs">0{index + 1}</span><span className="absolute right-4 top-4 text-xs opacity-0 transition-opacity group-hover:opacity-100">Voir le projet ↗</span></div><div className="flex justify-between gap-4 border-b border-[var(--line)] py-4"><div><h3 className="text-lg font-semibold">{project.title}</h3><p className="mt-1 text-xs text-[var(--muted)]">{project.type}</p></div><span className="text-xl">↗</span></div></article>)}</div>
      </section>

      <section id="about" className="bg-[var(--ink)] px-5 py-24 text-[var(--background)] md:px-10 md:py-36"><div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:items-end"><div><p className="mono mb-5 text-xs text-[var(--accent)]">02 / Le studio</p><h2 className="display text-6xl leading-[.9] tracking-[-.04em] md:text-8xl">Petit studio,<br /><em className="text-[var(--accent)]">grandes idées.</em></h2></div><div className="max-w-lg text-sm leading-7 text-[#b1b2aa]"><p>Je m&apos;appelle Noé. J&apos;accompagne des équipes ambitieuses dans la transformation d&apos;une intuition en quelque chose de tangible, désirable et utile.</p><p className="mt-8 text-[var(--background)]">Branding · UX/UI · Direction artistique · Développement créatif</p><a href="mailto:hello@noemartin.studio" className="mt-12 inline-block border-b border-[var(--accent)] pb-2 text-sm text-[var(--accent)]">Parlons de votre projet ↗</a></div></div></section>

      <section id="journal" className="px-5 py-24 md:px-10 md:py-32"><div className="mb-10 flex items-end justify-between border-b border-[var(--line)] pb-5"><div><p className="mono mb-3 text-xs text-[var(--orange)]">03 / Journal</p><h2 className="display text-5xl md:text-7xl">Notes de terrain</h2></div><span className="hidden text-xs text-[var(--muted)] md:block">Pensées, méthodes, trouvailles</span></div><div className="divide-y divide-[var(--line)]">{[["01", "Le beau n&apos;est pas une stratégie", "12.06.2024"], ["02", "Dessiner pour comprendre", "28.05.2024"], ["03", "La contrainte comme terrain de jeu", "04.04.2024"]].map(([n, title, date]) => <a href="#journal" key={n} className="group grid grid-cols-[44px_1fr_auto] items-center gap-5 py-6 transition-colors hover:bg-[var(--accent)] md:grid-cols-[80px_1fr_auto]"><span className="mono text-xs text-[var(--muted)]">{n}</span><h3 className="text-lg md:text-2xl" dangerouslySetInnerHTML={{ __html: title }} /><span className="mono text-[10px] text-[var(--muted)]">{date}</span></a>)}</div></section>

      <footer className="border-t border-[var(--line)] px-5 py-8 md:px-10"><div className="flex flex-col justify-between gap-6 text-xs text-[var(--muted)] md:flex-row"><span>© 2026 Noé Martin Studio</span><div className="flex gap-6"><a href="#top">Instagram ↗</a><a href="#top">LinkedIn ↗</a><a href="mailto:hello@noemartin.studio">Contact ↗</a></div></div></footer>

      {adminOpen && <div className="fixed inset-0 z-30 flex items-center justify-center bg-[rgba(32,33,30,.65)] p-5 backdrop-blur-sm"><div className="w-full max-w-lg border border-[var(--ink)] bg-[var(--background)] p-7 shadow-2xl md:p-10"><div className="flex items-start justify-between"><div><p className="mono mb-3 text-xs text-[var(--orange)]">Accès restreint</p><h2 className="display text-4xl">Connexion studio</h2></div><button onClick={() => setAdminOpen(false)} className="text-2xl" aria-label="Fermer">×</button></div><p className="mt-6 text-sm leading-6 text-[var(--muted)]">Gérez vos projets, articles, utilisateurs et messages depuis votre espace sécurisé.</p><form className="mt-8 space-y-4" onSubmit={(event) => event.preventDefault()}><label className="block text-xs uppercase tracking-[.12em]">Email<input type="email" placeholder="vous@studio.fr" className="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 outline-none focus:border-[var(--ink)]" /></label><label className="block text-xs uppercase tracking-[.12em]">Mot de passe<input type="password" placeholder="••••••••" className="mt-2 w-full border-b border-[var(--line)] bg-transparent py-3 outline-none focus:border-[var(--ink)]" /></label><button className="mt-5 w-full bg-[var(--ink)] px-5 py-4 text-sm text-[var(--background)] transition-transform hover:-translate-y-1">Se connecter ↗</button></form></div></div>}
    </main>
  );
}
