import Hero from "./components/Hero";
import { Benefits, Bestsellers, Features, Foliage, Footer, Why } from "./components/Sections";
import { useReveal } from "./hooks/useReveal";

export default function App() {
  useReveal();
  return (
    <>
      <Hero />
      <main className="rise-over relative z-10 overflow-hidden bg-forest-900 bg-[radial-gradient(900px_600px_at_100%_0%,#12281b_0%,transparent_60%),radial-gradient(800px_700px_at_0%_45%,#0f2318_0%,transparent_60%)]">
        <Foliage className="-left-6 top-24 hidden w-40 opacity-70 md:block lg:w-52" />
        <Foliage className="-right-6 top-[38%] w-32 opacity-50 md:w-44" flip />
        <Foliage className="-left-8 bottom-40 w-36 opacity-50 md:w-48" />
        <Why />
        <Benefits />
        <Bestsellers />
        <Features />
        <Footer />
      </main>
    </>
  );
}
