import { Code2, Layers3, Sparkles, Target } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const points = [
  ["Curated", "The interface keeps the catalog focused and easy to scan.", Sparkles],
  ["Practical", "Every important shopping action stays close to the product.", Target],
  ["Responsive", "The experience adapts from desktop screens to compact phones.", Layers3],
  ["Built with React", "Reusable components keep the storefront maintainable and consistent.", Code2],
];

export default function About() {
  return (
    <div className="veyro-page">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#A3E635]">About Veyro</p>
            <h1 className="mt-3 text-5xl font-black tracking-tight text-white sm:text-6xl">Built around better technology.</h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#8B95A7] sm:text-base">
              VEYRO is a frontend e-commerce concept focused on making product discovery feel modern without making shopping complicated.
            </p>
          </div>
          <div className="rounded-3xl border border-[#202833] bg-[#11161D] p-7">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#22D3EE]">Technology</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["React", "React Router", "Tailwind CSS", "Axios", "DummyJSON API", "Lucide"].map((item) => (
                <span key={item} className="rounded-full border border-[#26303C] bg-[#0D1117] px-3 py-2 text-xs font-semibold text-[#AAB4C3]">{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {points.map(([title, text, Icon]) => (
            <div key={title} className="veyro-card rounded-2xl p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#A3E635]/10 text-[#A3E635]"><Icon size={20} /></div>
              <h2 className="mt-5 text-lg font-bold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#8B95A7]">{text}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
