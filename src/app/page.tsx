"use client";

import { FormEvent, useState } from "react";

const skills = ["Python", "SQL", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "FastAPI", "TypeScript", "React", "Next.js", "PostgreSQL", "Docker"];
const services = [
  ["01", "Data Science", "Transformer vos données en indicateurs compréhensibles et décisions utiles."],
  ["02", "Machine Learning", "Concevoir, entraîner et déployer des modèles adaptés à votre problème."],
  ["03", "Intelligence Artificielle", "Prototyper et intégrer des solutions IA dans vos produits et processus."],
  ["04", "Développement web", "Construire des applications web rapides, accessibles et maintenables."],
];

export default function Home() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.get("name"), email: data.get("email"), message: data.get("message") }) });
    if (!response.ok) { setError("Impossible d'envoyer le message. Réessayez."); return; }
    form.reset(); setError(""); setSent(true);
  }

  return <main>
    <header className="fixed top-0 z-20 w-full border-b border-[var(--line)] bg-[rgba(13,17,23,.9)] px-5 py-4 text-white backdrop-blur-md md:px-12"><div className="flex items-center justify-between"><a href="#home" className="mono text-sm">EXCELLENCE<span className="text-[var(--cyan)]">.</span></a><nav className="hidden gap-7 text-[11px] uppercase tracking-[.12em] text-[#aab3bd] md:flex"><a href="#about">À propos</a><a href="#skills">Compétences</a><a href="#services">Services</a><a href="#projects">Projets</a><a href="#contact">Contact</a></nav><a href="mailto:excellencekisengo000@gmail.com" className="border border-[var(--cyan)] px-4 py-2 text-xs text-[var(--cyan)] transition-colors hover:bg-[var(--cyan)] hover:text-[#0d1117]">Me contacter ↗</a></div></header>

    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-[#0d1117] px-5 pb-20 pt-32 text-white md:px-12"><div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(#243746 1px, transparent 1px), linear-gradient(90deg, #243746 1px, transparent 1px)", backgroundSize: "56px 56px" }} /><div className="relative max-w-6xl reveal"><p className="mono mb-7 text-xs uppercase tracking-[.2em] text-[var(--cyan)]">Développeur freelance · Kinshasa, RDC</p><h1 className="max-w-5xl text-[clamp(3.4rem,8vw,8.5rem)] font-semibold leading-[.9] tracking-[-.06em]">Excellence<br /><span className="text-[var(--cyan)]">Kisengo</span></h1><div className="mt-10 grid max-w-2xl gap-6 border-l border-[var(--cyan)] pl-5 text-sm leading-7 text-[#aab3bd] md:ml-[26%] md:grid-cols-[1fr_auto]"><p>Je développe des solutions dans les domaines de la Data Science, du Machine Learning, de l'Intelligence Artificielle et du web.</p><span className="mono text-xs text-white">01<br />→</span></div></div><div className="absolute bottom-7 right-7 hidden text-right md:block"><span className="mono text-[10px] text-[#607080]">DATA / CODE / IMPACT</span></div></section>

    <section id="about" className="bg-[#f5f7f9] px-5 py-24 md:px-12 md:py-32"><div className="grid gap-12 md:grid-cols-[.8fr_1.2fr]"><div><p className="mono mb-5 text-xs text-[var(--blue)]">01 / À propos</p><h2 className="text-5xl font-semibold leading-[.95] tracking-[-.04em] text-[#0d1117] md:text-7xl">Des idées<br /><span className="text-[var(--blue)]">aux systèmes.</span></h2></div><div className="max-w-xl text-base leading-8 text-[#52606d]"><p>Je suis Excellence Kisengo, développeur freelance. J'aime comprendre les problèmes complexes, structurer les données et livrer des outils qui apportent une vraie valeur.</p><p className="mt-6">Chaque mission commence par le besoin réel : cadrer, expérimenter, construire et améliorer.</p></div></div></section>

    <section id="skills" className="bg-[#152331] px-5 py-24 text-white md:px-12 md:py-32"><div className="grid gap-12 md:grid-cols-[.8fr_1.2fr]"><div><p className="mono mb-5 text-xs text-[var(--cyan)]">02 / Compétences</p><h2 className="text-5xl font-semibold leading-[.95] tracking-[-.04em] md:text-7xl">Stack<br /><span className="text-[var(--cyan)]">technique.</span></h2></div><div className="grid grid-cols-2 gap-x-8 border-t border-[#405363] pt-4 text-sm sm:grid-cols-3">{skills.map((skill) => <span key={skill} className="border-b border-[#405363] py-4 text-[#d5dde4]">{skill}</span>)}</div></div></section>

    <section id="services" className="px-5 py-24 md:px-12 md:py-32"><div className="mb-12 flex items-end justify-between border-b border-[var(--line)] pb-5"><div><p className="mono mb-4 text-xs text-[var(--blue)]">03 / Services</p><h2 className="text-5xl font-semibold leading-none tracking-[-.04em] md:text-7xl">Comment je peux<br />vous aider.</h2></div></div><div className="grid md:grid-cols-4">{services.map(([number, title, text]) => <article key={number} className="border-b border-[var(--line)] py-6 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0"><span className="mono text-xs text-[var(--blue)]">{number}</span><h3 className="mt-14 text-xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-6 text-[#66727d]">{text}</p></article>)}</div></section>

    <section id="projects" className="bg-[#e8eef3] px-5 py-24 md:px-12 md:py-32"><div className="grid gap-12 md:grid-cols-[.8fr_1.2fr] md:items-end"><div><p className="mono mb-5 text-xs text-[var(--blue)]">04 / Projets</p><h2 className="text-5xl font-semibold leading-[.95] tracking-[-.04em] md:text-7xl">Vos projets<br />ici.</h2></div><div className="border-l-2 border-[var(--blue)] pl-6 text-sm leading-7 text-[#52606d]"><p>Cette section sera alimentée depuis votre espace administrateur. Ajoutez vos études de cas, technologies et résultats dans le dashboard.</p><p className="mono mt-5 text-xs text-[var(--blue)]">CONTENU GÉRÉ DANS /ADMIN</p></div></div></section>

    <section id="blog" className="px-5 py-24 md:px-12 md:py-32"><div className="mb-12 border-b border-[var(--line)] pb-5"><p className="mono mb-4 text-xs text-[var(--blue)]">05 / Blog</p><h2 className="text-5xl font-semibold tracking-[-.04em] md:text-7xl">Articles à venir.</h2></div><p className="max-w-xl text-sm leading-7 text-[#66727d]">Publiez vos réflexions sur la data, l'IA et le développement web depuis le dashboard administrateur.</p></section>

    <section id="contact" className="bg-[#0d1117] px-5 py-24 text-white md:px-12 md:py-32"><div className="grid gap-14 md:grid-cols-[1fr_1fr]"><div><p className="mono mb-5 text-xs text-[var(--cyan)]">06 / Contact</p><h2 className="text-6xl font-semibold leading-[.9] tracking-[-.06em] md:text-8xl">Construisons<br /><span className="text-[var(--cyan)]">quelque chose.</span></h2><div className="mt-12 space-y-3 text-sm text-[#aab3bd]"><a className="block hover:text-white" href="mailto:excellencekisengo000@gmail.com">excellencekisengo000@gmail.com ↗</a><a className="block hover:text-white" href="https://github.com/Exkis" target="_blank" rel="noreferrer">GitHub ↗</a><a className="block hover:text-white" href="https://www.linkedin.com/in/excellence-kisengo-5a9a1935a" target="_blank" rel="noreferrer">LinkedIn ↗</a><a className="block hover:text-white" href="https://wa.me/243822074574" target="_blank" rel="noreferrer">WhatsApp · +243 822 074 574 ↗</a></div></div><form className="space-y-5" onSubmit={submitContact}><label className="block text-xs uppercase tracking-[.12em] text-[#aab3bd]">Nom<input name="name" required className="mt-2 w-full border-b border-[#405363] bg-transparent py-3 outline-none focus:border-[var(--cyan)]" /></label><label className="block text-xs uppercase tracking-[.12em] text-[#aab3bd]">Email<input name="email" required type="email" className="mt-2 w-full border-b border-[#405363] bg-transparent py-3 outline-none focus:border-[var(--cyan)]" /></label><label className="block text-xs uppercase tracking-[.12em] text-[#aab3bd]">Message<textarea name="message" required rows={4} className="mt-2 w-full resize-none border-b border-[#405363] bg-transparent py-3 outline-none focus:border-[var(--cyan)]" /></label>{error && <p className="text-sm text-[#ff907a]">{error}</p>}<button className="bg-[var(--cyan)] px-6 py-4 text-sm font-semibold text-[#0d1117]">{sent ? "Message envoyé ✓" : "Envoyer ↗"}</button></form></div></section>
    <footer className="flex justify-between bg-[#0d1117] px-5 py-7 text-xs text-[#71808d] md:px-12"><span>© 2026 Excellence Kisengo</span><a href="#home">Retour en haut ↑</a></footer>
  </main>;
}
