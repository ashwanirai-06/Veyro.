import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";

const features = [
  {
    icon: "Gauge",
    title: "Fast Loading Speed",
    text: "Customers shouldn't have to wait for products to load.",
    support: "Faster experiences = happier customers.",
  },
  {
    icon: "Smartphone",
    title: "Mobile-Friendly Design",
    text: "Your store should work smoothly on every screen.",
    support: "Responsive design = more opportunities to sell.",
  },
  {
    icon: "Search",
    title: "Simple Navigation",
    text: "Help customers quickly find the right products.",
    support: "Easy to browse = easier to buy.",
  },
  {
    icon: "FileCheck2",
    title: "Clear Product Pages",
    text: "Good images, useful information, and clear calls to action.",
    support: "Show details = build confidence.",
  },
  {
    icon: "LockKeyhole",
    title: "Easy and Secure Checkout",
    text: "The buying process should feel simple and trustworthy.",
    support: "Secure checkout = more conversions.",
  },
  {
    icon: "SlidersHorizontal",
    title: "Search & Filters",
    text: "Make it easier for customers to discover exactly what they need.",
    support: "Better search = better shopping.",
  },
  {
    icon: "BadgeCheck",
    title: "Trust Signals",
    text: "Reviews, clear policies, and transparent information help customers shop with confidence.",
    support: "Trust builds long-term customers.",
  },
];

export default function WhyVeyro() {
  return (
    <div className="veyro-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#A3E635]">The Veyro standard</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-6xl">Why Veyro?</h1>
          <p className="mt-5 text-sm leading-7 text-[#8B95A7] sm:text-base">
            A good storefront isn't just about products. It's about making every step from discovery to checkout feel clear, fast and trustworthy.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => <FeatureCard key={feature.title} {...feature} index={index} />)}
        </div>

        <div className="mt-10 rounded-3xl border border-[#202833] bg-[#0D1117] p-7 text-center sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#22D3EE]">The idea</p>
          <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">Less friction. More confidence.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#8B95A7]">
            Veyro brings discovery, product information, filtering, trust signals and checkout into one consistent experience.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
