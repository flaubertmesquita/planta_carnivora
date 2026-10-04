import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CircleArrow, Drop, Leaf, Menu, NoSpray, Paw, Cart } from "./Icons";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const DESKTOP = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const MOBILE = "(max-width: 767px) and (prefers-reduced-motion: no-preference)";

const badges = [
  { icon: NoSpray, label: "Sem Químicos" },
  { icon: Paw, label: "Seguro para Pets" },
  { icon: Drop, label: "Baixa Manutenção" },
];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const hero = el.querySelector<HTMLElement>("#hero-section")!;
    const q = gsap.utils.selector(el);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ---------------- Desktop / tablet: pinned cinematic sequence ---------------- */
      mm.add(DESKTOP, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: () => "+=" + window.innerHeight,
            pin: true,
            pinSpacing: false, // spacer below handles overlap → next section rises over hero
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // PHASE 2 — scroll (0 → 0.55)
        tl.fromTo(q(".hero-img"), { scale: 1.08, yPercent: 0 }, { scale: 1.22, yPercent: 6, duration: 1 }, 0)
          .fromTo(q(".hero-title"), { y: 0 }, { y: () => -window.innerHeight * 0.06, duration: 0.55 }, 0)
          .fromTo(q(".hero-sub"), { autoAlpha: 1 }, { autoAlpha: 0.15, duration: 0.5 }, 0.05)
          .fromTo(q(".hero-cta"), { scale: 1 }, { scale: 0.93, duration: 0.55, transformOrigin: "left center" }, 0)
          .fromTo(q(".hero-overlay"), { opacity: 0 }, { opacity: 0.45, duration: 0.55 }, 0)
          // PHASE 3 — transition (0.55 → 1)
          .to(q(".hero-content"), { y: () => -window.innerHeight * 0.22, autoAlpha: 0, duration: 0.45, ease: "power1.in" }, 0.55)
          .to(q(".hero-nav, .hero-scroll"), { autoAlpha: 0, duration: 0.25 }, 0.5)
          .to(q(".hero-overlay"), { opacity: 0.7, duration: 0.45 }, 0.55)
          .fromTo(
            q(".hero-media"),
            { clipPath: "inset(0% 0% 0% 0% round 0px)" },
            { clipPath: "inset(3% 2.5% 6% 2.5% round 36px)", duration: 0.45 },
            0.55
          );
      });

      /* ---------------- Mobile: light parallax, no pin ---------------- */
      mm.add(MOBILE, () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(q(".hero-img"), { scale: 1.08, yPercent: 0 }, { scale: 1.13, yPercent: 4 }, 0)
          .fromTo(q(".hero-title"), { y: 0 }, { y: -24 }, 0)
          .fromTo(q(".hero-sub"), { autoAlpha: 1 }, { autoAlpha: 0.4 }, 0)
          .fromTo(q(".hero-overlay"), { opacity: 0 }, { opacity: 0.35 }, 0);
      });
      // Reduced motion: no handler → hero stays static, content fully visible.
    }, el);

    /* Refresh only when layout actually changed (fonts / late image decode). */
    let lastHeight = document.documentElement.scrollHeight;
    const maybeRefresh = () => {
      const h = document.documentElement.scrollHeight;
      if (h !== lastHeight) {
        lastHeight = h;
        ScrollTrigger.refresh();
      }
    };
    const video = videoRef.current;
    const videoStatus = el.querySelector<HTMLElement>(".hero-video-hint");
    const progressBar = el.querySelector<HTMLElement>(".hero-video-progress span");
    const gazeAtStart = hero.dataset.gazeStart === "left" ? "left" : "right";
    let targetTime = 0;
    let seekInFlight = false;
    let videoReady = false;

    const updateProgress = () => {
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
      const percent = Math.min(100, Math.max(0, (video.currentTime / video.duration) * 100));
      if (progressBar) progressBar.style.width = `${percent}%`;
    };

    const seekToLatestTarget = () => {
      if (!video || !videoReady || seekInFlight || !Number.isFinite(video.duration) || video.duration <= 0) return;
      const maxTime = Math.max(0, video.duration - 0.04);
      const nextTime = Math.max(0, Math.min(maxTime, targetTime));
      if (Math.abs(video.currentTime - nextTime) < 0.025) return;

      seekInFlight = true;
      try {
        video.currentTime = nextTime;
      } catch {
        seekInFlight = false;
      }
    };

    const updateTargetFromPosition = (clientX: number) => {
      if (!video || !videoReady || !Number.isFinite(video.duration) || video.duration <= 0) return;
      const bounds = hero.getBoundingClientRect();
      if (bounds.width <= 0) return;

      const position = Math.max(0, Math.min(1, (clientX - bounds.left) / bounds.width));
      const timelineProgress = gazeAtStart === "right" ? 1 - position : position;
      targetTime = timelineProgress * video.duration;
      seekToLatestTarget();
    };

    const handlePointerMove = (event: PointerEvent) => updateTargetFromPosition(event.clientX);
    const handleMetadata = () => {
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
        if (videoStatus) videoStatus.textContent = "A duração do vídeo não pôde ser lida.";
        return;
      }
      video.pause();
      videoReady = true;
      if (videoStatus) videoStatus.textContent = "Mova o cursor na horizontal para explorar o vídeo.";
      const bounds = hero.getBoundingClientRect();
      updateTargetFromPosition(bounds.left + bounds.width / 2);
    };
    const handleVideoData = () => {
      hero.classList.add("is-video-ready");
      maybeRefresh();
    };
    const handleSeeked = () => {
      if (!video) return;
      seekInFlight = false;
      updateProgress();
      if (Math.abs(video.currentTime - targetTime) > 0.08) seekToLatestTarget();
    };
    const handleVideoError = () => {
      videoReady = false;
      if (videoStatus) videoStatus.textContent = "Não foi possível carregar o vídeo da hero.";
    };

    video?.addEventListener("loadedmetadata", handleMetadata);
    video?.addEventListener("loadeddata", handleVideoData);
    video?.addEventListener("timeupdate", updateProgress);
    video?.addEventListener("seeked", handleSeeked);
    video?.addEventListener("error", handleVideoError);
    hero.addEventListener("pointermove", handlePointerMove, { passive: true });
    if (video && video.readyState >= HTMLMediaElement.HAVE_METADATA) handleMetadata();
    if (video && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) handleVideoData();
    document.fonts?.ready.then(maybeRefresh);
    window.addEventListener("load", maybeRefresh, { once: true });

    return () => {
      video?.removeEventListener("loadedmetadata", handleMetadata);
      video?.removeEventListener("loadeddata", handleVideoData);
      video?.removeEventListener("timeupdate", updateProgress);
      video?.removeEventListener("seeked", handleSeeked);
      video?.removeEventListener("error", handleVideoError);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.classList.remove("is-video-ready");
      window.removeEventListener("load", maybeRefresh);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="relative">
      <section id="hero-section" className="hero" data-gaze-start="right" aria-labelledby="hero-heading">
        {/* Media layer */}
        <div className="hero-media" aria-hidden="true">
          <video
            ref={videoRef}
            src="/videos/planta.mp4"
            poster="/images/hero.jpg"
            width={1600}
            height={900}
            muted
            playsInline
            preload="auto"
            className="hero-img"
          />
          <div className="hero-gradient" />
          <div className="hero-overlay" />
        </div>

        <p className="hero-video-hint" role="status" aria-live="polite">Carregando vídeo...</p>
        <div className="hero-video-progress" aria-hidden="true"><span /></div>

        {/* Navigation */}
        <header className="hero-nav absolute inset-x-0 top-0 z-20">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12" aria-label="Principal">
            <a href="#" className="flex items-center gap-2 font-serif text-xl tracking-wide text-cream">
              <Leaf className="h-5 w-5 text-moss-400" /> Verdant Trap
            </a>
            <ul className="hidden items-center gap-9 text-sm text-sage md:flex">
              {[
                ["Loja", "#bestsellers"],
                ["Por que Carnívoras", "#why"],
                ["Benefícios", "#benefits"],
                ["Contato", "#contact"],
              ].map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="relative transition-colors duration-300 hover:text-cream after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-moss-400 after:transition-all after:duration-300 hover:after:w-full">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <a href="#bestsellers" aria-label="Carrinho" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cream transition hover:border-moss-400 hover:text-moss-300">
                <Cart />
              </a>
              <button aria-label="Abrir menu" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cream md:hidden">
                <Menu />
              </button>
            </div>
          </nav>
        </header>

        {/* Content */}
        <div className="hero-content relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 md:justify-center md:pb-0 lg:px-12">
          <div className="max-w-xl">
            <p className="mb-5 flex items-center gap-2 text-sm font-medium text-moss-300">
              <Leaf className="h-4 w-4" /> Controle Natural de Pragas
            </p>
            <h1 id="hero-heading" className="hero-title font-serif leading-[0.98] tracking-tight">
              <span className="block text-[clamp(2.75rem,7vw,5.5rem)] text-cream">Plantas</span>
              <span className="block text-[clamp(2.75rem,7vw,5.5rem)] text-cream">Carnívoras</span>
              <span className="mt-2 block text-[clamp(1.9rem,4.4vw,3.4rem)] text-moss-300">Caçadoras de Insetos</span>
            </h1>
            <div className="hero-sub">
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-sage sm:text-base">
                Uma decoração viva e marcante que captura moscas, mosquitinhos e pernilongos em silêncio — protegendo sua casa sem uma gota de inseticida.
              </p>
              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-cream/85 sm:text-[13px]">
                {badges.map(({ icon: I, label }) => (
                  <li key={label} className="flex items-center gap-2">
                    <I className="h-5 w-5 text-moss-300" /> {label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hero-cta mt-9 flex flex-wrap gap-3">
              <a href="#bestsellers" className="group inline-flex items-center gap-3 rounded-full bg-moss-500 px-7 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(110,154,71,0.7)] transition duration-300 hover:-translate-y-0.5 hover:bg-moss-400">
                Comprar Agora <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#why" className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-cream backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-moss-400 hover:text-moss-300">
                Explorar <CircleArrow className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero-scroll pointer-events-none absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-sage/70 md:flex">
          Role
          <span className="relative block h-10 w-px overflow-hidden bg-white/10">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[float-soft_2.4s_ease-in-out_infinite] bg-moss-300" />
          </span>
        </div>
      </section>
      {/* Overlap spacer: next section starts rising over the pinned hero in phase 3 */}
      <div className="hero-spacer" aria-hidden="true" />
    </div>
  );
}
