import { useRef, type CSSProperties } from "react";
import {
  ArrowLeft, ArrowRight, Bug, Cart, Check, CircleArrow, Grid, Headset, Leaf, Mail, Phone, Pin,
  Refresh, Shield, Social, Sparkle, Sun, Truck, NoSpray,
} from "./Icons";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-2 text-sm font-medium text-moss-300">
      <Leaf className="h-4 w-4" /> {children}
    </p>
  );
}

/* Decorative leaf cluster (SVG, no extra images) */
export function Foliage({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 200 320" className={`pointer-events-none absolute ${className}`} style={{ transform: flip ? "scaleX(-1)" : undefined }} aria-hidden="true">
      <defs>
        <linearGradient id="lf" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#2f5a36" />
          <stop offset="1" stopColor="#0f2416" />
        </linearGradient>
      </defs>
      {[
        "M0 60 C60 40 120 70 150 120 C100 125 40 110 0 90Z",
        "M0 140 C70 120 150 150 190 200 C120 210 50 190 0 175Z",
        "M0 220 C50 210 110 240 140 290 C80 290 30 270 0 255Z",
        "M0 10 C40 0 90 20 110 50 C70 55 30 45 0 35Z",
      ].map((p, i) => (
        <path key={i} d={p} fill="url(#lf)" opacity={0.85 - i * 0.12} />
      ))}
    </svg>
  );
}

/* ---------------- WHY ---------------- */
export function Why() {
  const items = ["Captura moscas, mosquitinhos e pernilongos", "Zero químicos, sprays ou armadilhas", "Segura para crianças e pets", "Decoração viva para qualquer ambiente"];
  return (
    <section id="why" className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28 lg:gap-20 lg:px-12">
      <div className="reveal relative mx-auto w-full max-w-[520px]">
        <div className="absolute inset-[12%] rounded-full bg-moss-500/20 blur-3xl" aria-hidden="true" />
        <img
          src="/images/why-flytrap.jpg"
          alt="Dioneias em vaso verde-escuro sobre um pedestal, ao ar livre"
          width={1024}
          height={1024}
          loading="lazy"
          className="animate-float-soft relative aspect-square w-full rounded-[28px] object-cover [mask-image:radial-gradient(circle_at_center,#000_62%,transparent_78%)]"
        />
      </div>
      <div>
        <div className="reveal"><Eyebrow>Por que Escolher Carnívoras</Eyebrow></div>
        <h2 className="reveal font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05]" style={d(80)}>
          Lindas por Natureza
          <span className="block text-moss-300">Fatais para as Pragas</span>
        </h2>
        <span className="reveal mt-6 block h-px w-10 bg-moss-400/60" style={d(120)} />
        <p className="reveal mt-6 max-w-md leading-relaxed text-sage" style={d(160)}>
          Cada planta é uma armadilha silenciosa e autossuficiente. Elas atraem, capturam e digerem os insetos que invadem sua cozinha, janela e varanda — e ainda deixam o ambiente espetacular.
        </p>
        <ul className="mt-7 space-y-4">
          {items.map((t, i) => (
            <li key={t} className="reveal flex items-center gap-3 text-[15px] text-cream/90" style={d(200 + i * 70)}>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-moss-500/20 text-moss-300 ring-1 ring-moss-400/40">
                <Check className="h-3.5 w-3.5" />
              </span>
              {t}
            </li>
          ))}
        </ul>
        <a href="#benefits" className="reveal group mt-10 inline-flex items-center gap-3 rounded-full bg-moss-500 px-7 py-3.5 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-moss-400" style={d(500)}>
          Saiba Mais <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}

/* ---------------- BENEFITS ---------------- */
export function Benefits() {
  const stats = [
    { icon: Bug, value: "100+", label: "Insetos por estação", text: "Uma planta-jarro adulta e saudável pode capturar centenas de pequenos insetos voadores a cada estação." },
    { icon: NoSpray, value: "0", label: "Químicos tóxicos", text: "Sem aerossóis nem resíduos nas superfícies da cozinha — apenas ar limpo e um lar seguro para sua família." },
    { icon: Sparkle, value: "24/7", label: "Proteção silenciosa", text: "Sem raquetes elétricas, sem fitas adesivas. Suas plantas trabalham dia e noite, sem energia e sem ruído." },
    { icon: Sun, value: "5 min", label: "De cuidado por semana", text: "Uma janela ensolarada e água da chuva é tudo de que precisam. Cada pedido acompanha um guia de cuidados." },
  ];
  return (
    <section id="benefits" className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24 lg:px-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="reveal flex justify-center"><Eyebrow>Controle Natural de Pragas</Eyebrow></div>
        <h2 className="reveal font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05]" style={d(80)}>
          Proteja Sua Casa
          <span className="block text-moss-300">do Jeito da Natureza</span>
        </h2>
        <p className="reveal mx-auto mt-6 max-w-lg leading-relaxed text-sage" style={d(140)}>
          Menos mosquinhas na fruteira, menos fungus gnats nos vasos, menos pernilongos à noite — e uma peça que rende conversa em cada prateleira.
        </p>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ icon: I, value, label, text }, i) => (
          <article
            key={label}
            className="reveal glass-card group rounded-3xl p-7 transition duration-500 hover:-translate-y-1.5 hover:border-moss-400/40 hover:shadow-[0_25px_50px_-25px_rgba(110,154,71,0.45)]"
            style={d(i * 90)}
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-moss-500/15 text-moss-300 ring-1 ring-moss-400/25 transition duration-500 group-hover:bg-moss-500 group-hover:text-white">
              <I className="h-5 w-5" />
            </span>
            <p className="mt-6 font-serif text-4xl text-cream">{value}</p>
            <h3 className="mt-1 text-sm font-medium uppercase tracking-[0.14em] text-moss-300">{label}</h3>
            <p className="mt-3 text-sm leading-relaxed text-sage">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- BESTSELLERS ---------------- */
const products = [
  { name: "Dioneia", meta: "Captura moscas · vaso 9 cm", price: "89,90", img: "/images/p-flytrap.jpg" },
  { name: "Nepenthes", meta: "Captura mosquitinhos · vaso 12 cm", price: "139,90", img: "/images/p-nepenthes.jpg" },
  { name: "Drosera", meta: "Captura mosquinhas · vaso 9 cm", price: "69,90", img: "/images/p-sundew.jpg" },
  { name: "Sarracenia", meta: "Captura vespas · vaso 12 cm", price: "119,90", img: "/images/p-sarracenia.jpg" },
  { name: "Kit Dioneia com Cúpula", meta: "Cúpula de vidro · pronto p/ presente", price: "229,90", img: "/images/cloche-flytrap.jpg" },
];

export function Bestsellers() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const t = track.current;
    if (!t) return;
    const card = t.querySelector("article");
    t.scrollBy({ left: dir * ((card?.clientWidth ?? 280) + 16), behavior: "smooth" });
  };
  return (
    <section id="bestsellers" className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24 lg:px-12">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="reveal"><Eyebrow>Mais Vendidas</Eyebrow></div>
          <h2 className="reveal font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05]" style={d(80)}>
            Plantas Carnívoras
            <span className="block text-moss-300">Escolhidas para Você</span>
          </h2>
        </div>
        <div className="reveal hidden gap-3 sm:flex" style={d(160)}>
          {[{ I: ArrowLeft, dir: -1, l: "Anterior" }, { I: ArrowRight, dir: 1, l: "Próximo" }].map(({ I, dir, l }) => (
            <button
              key={l}
              onClick={() => scroll(dir)}
              aria-label={l}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-cream transition duration-300 hover:border-moss-400 hover:bg-moss-500 hover:text-white"
            >
              <I className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      <div ref={track} className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
        {products.map((p, i) => (
          <article
            key={p.name}
            className="reveal glass-card group w-[72%] shrink-0 snap-start overflow-hidden rounded-2xl p-3 transition duration-500 hover:-translate-y-1.5 hover:border-moss-400/40 sm:w-[44%] md:w-[31%] lg:w-[calc(25%-12px)]"
            style={d(i * 80)}
          >
            <div className="overflow-hidden rounded-xl bg-forest-800">
              <img src={p.img} alt={p.name} width={512} height={512} loading="lazy" className="aspect-square w-full object-cover transition duration-700 group-hover:scale-110" />
            </div>
            <div className="px-2 pb-2 pt-4">
              <h3 className="text-[15px] font-medium text-cream">{p.name}</h3>
              <p className="mt-0.5 text-xs text-sage">{p.meta}</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-lg text-cream">R$ {p.price}</p>
                <button aria-label={`Adicionar ${p.name} ao carrinho`} className="grid h-9 w-9 place-items-center rounded-full border border-moss-400/40 text-moss-300 transition duration-300 hover:scale-110 hover:bg-moss-500 hover:text-white">
                  <Cart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="reveal mt-10 flex justify-center">
        <a href="#" className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-forest-800/60 px-6 py-3 text-sm text-cream transition duration-300 hover:border-moss-400 hover:text-moss-300">
          <Grid className="h-4 w-4 text-moss-300" /> Ver Todas as Plantas
          <CircleArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}

/* ---------------- FEATURES ---------------- */
export function Features() {
  const f = [
    { I: Truck, t: "Frete Grátis", s: "Em pedidos acima de R$ 199" },
    { I: Shield, t: "Chegada Garantida", s: "Plantas saudáveis na sua porta" },
    { I: Refresh, t: "Troca Fácil", s: "Garantia de 30 dias" },
    { I: Headset, t: "Suporte de Cultivo", s: "Botânicos prontos para ajudar" },
  ];
  return (
    <section aria-label="Vantagens da loja" className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
      <ul className="grid grid-cols-2 gap-y-8 border-y border-white/10 py-8 lg:grid-cols-4">
        {f.map(({ I, t, s }, i) => (
          <li key={t} className={`reveal group flex items-center gap-4 px-2 lg:px-6 ${i > 0 ? "lg:border-l lg:border-white/10" : ""}`} style={d(i * 80)}>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-moss-400/30 text-moss-300 transition duration-300 group-hover:bg-moss-500 group-hover:text-white">
              <I className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-cream">{t}</p>
              <p className="text-xs text-sage">{s}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
export function Footer() {
  const cols = [
    { h: "Links Rápidos", l: ["Início", "Loja", "Sobre Nós", "Benefícios"] },
    { h: "Atendimento", l: ["Meus Pedidos", "Trocas e Devoluções", "Política de Envio", "Guias de Cultivo"] },
  ];
  return (
    <footer id="contact" className="relative mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-8 lg:px-12">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div className="reveal glass-card rounded-2xl p-6">
          <h2 className="text-base font-medium text-cream">Fique por Dentro</h2>
          <p className="mt-2 text-sm leading-relaxed text-sage">Receba dicas de cultivo, lançamentos raros e ofertas direto no seu e-mail.</p>
          <form className="mt-5 flex items-center rounded-full bg-forest-700/80 p-1 pl-5 ring-1 ring-white/10 focus-within:ring-moss-400/60" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email" className="sr-only">Endereço de e-mail</label>
            <input id="email" type="email" required placeholder="Digite seu e-mail" className="min-w-0 flex-1 bg-transparent text-sm text-cream placeholder:text-sage/70 focus:outline-none" />
            <button aria-label="Inscrever-se" className="grid h-9 w-9 place-items-center rounded-full bg-moss-500 text-white transition hover:bg-moss-400">
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-6 flex items-center gap-3 text-sm text-sage">
            Siga-nos
            {Object.entries(Social).map(([k, I]) => (
              <a key={k} href="#" aria-label={k} className="grid h-8 w-8 place-items-center rounded-full text-cream/80 transition hover:bg-moss-500 hover:text-white">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c, i) => (
          <nav key={c.h} className="reveal lg:border-l lg:border-white/10 lg:pl-8" style={d(80 + i * 80)} aria-label={c.h}>
            <h2 className="font-serif text-xl text-moss-300">{c.h}</h2>
            <ul className="mt-5 space-y-3 text-sm text-sage">
              {c.l.map((l) => (
                <li key={l}><a href="#" className="transition hover:pl-1 hover:text-cream">{l}</a></li>
              ))}
            </ul>
          </nav>
        ))}
        <address className="reveal not-italic lg:border-l lg:border-white/10 lg:pl-8" style={d(240)}>
          <h2 className="font-serif text-xl text-moss-300">Fale Conosco</h2>
          <ul className="mt-5 space-y-4 text-sm text-sage">
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-moss-300" /><a href="tel:+5511987654321" className="hover:text-cream">(11) 98765-4321</a></li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-moss-300" /><a href="mailto:ola@verdanttrap.com.br" className="hover:text-cream">ola@verdanttrap.com.br</a></li>
            <li className="flex items-start gap-3"><Pin className="mt-0.5 h-4 w-4 shrink-0 text-moss-300" />Rua das Estufas, 48<br />São Paulo, SP · 01310-000</li>
          </ul>
        </address>
      </div>
      <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-sage/80 sm:flex-row">
        <p>© {new Date().getFullYear()} Verdant Trap. Cultivado com carinho.</p>
        <p className="flex items-center gap-2"><Leaf className="h-3.5 w-3.5 text-moss-400" /> Controle de pragas sem química para todo lar</p>
      </div>
    </footer>
  );
}
