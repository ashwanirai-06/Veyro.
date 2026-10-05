import { Check, Copy, Home, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { formatINR } from "../utils/format";

export default function OrderSuccess() {
  const { state } = useLocation();
  const orderId = state?.orderId || "VYR-DEMO";
  const total = state?.total || 0;

  return (
    <div className="veyro-page">
      <Navbar />
      <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:py-24">
        <div className="grid h-20 w-20 place-items-center rounded-3xl border border-[#34D399]/25 bg-[#34D399]/10 text-[#34D399] shadow-[0_0_60px_rgba(52,211,153,.08)]">
          <Check size={36} />
        </div>
        <p className="mt-7 text-xs font-black uppercase tracking-[.2em] text-[#34D399]">Order confirmed</p>
        <h1 className="mt-2 text-4xl font-black text-white sm:text-5xl">Your Veyro order is in.</h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-[#8B95A7]">
          This is a frontend demo, so no real payment or shipment was created. The flow is ready for backend integration.
        </p>

        <div className="mt-8 w-full rounded-2xl border border-[#202833] bg-[#11161D] p-5 text-left">
          <div className="flex items-center justify-between border-b border-[#202833] pb-4">
            <span className="text-xs uppercase tracking-wider text-[#697586]">Order ID</span>
            <span className="flex items-center gap-2 font-bold text-white">{orderId}<Copy size={13} className="text-[#697586]" /></span>
          </div>
          <div className="grid gap-4 pt-4 sm:grid-cols-2">
            <div><span className="text-xs text-[#697586]">Order total</span><p className="mt-1 text-lg font-black text-[#A3E635]">{formatINR(total)}</p></div>
            <div><span className="text-xs text-[#697586]">Estimated delivery</span><p className="mt-1 font-bold text-white">3–5 business days</p></div>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="veyro-button inline-flex items-center gap-2 rounded-xl bg-[#A3E635] px-5 py-3.5 text-sm font-black text-[#080B10]"><ShoppingBag size={16} /> Continue Shopping</Link>
          <Link to="/" className="inline-flex items-center gap-2 rounded-xl border border-[#2A3440] bg-[#11161D] px-5 py-3.5 text-sm font-bold text-white"><Home size={16} /> Back Home</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
