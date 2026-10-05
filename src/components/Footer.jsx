import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, ShieldCheck, Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#202833] bg-[#070A0E]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="text-xl font-black tracking-[0.2em]">VEYRO</div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#8B95A7]">
              Technology, curated better. A focused storefront experience built
              around clarity, discovery and trust.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-[#697586]">
              <span className="rounded-full border border-[#202833] px-3 py-1.5">API powered</span>
              <span className="rounded-full border border-[#202833] px-3 py-1.5">Responsive</span>
              <span className="rounded-full border border-[#202833] px-3 py-1.5">React + Tailwind</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A3E635]">Explore</p>
            <div className="mt-4 grid gap-3 text-sm text-[#8B95A7]">
              <Link className="hover:text-white" to="/shop">Shop</Link>
              <Link className="hover:text-white" to="/categories">Categories</Link>
              <Link className="hover:text-white" to="/wishlist">Wishlist</Link>
              <Link className="hover:text-white" to="/cart">Cart</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A3E635]">Veyro</p>
            <div className="mt-4 grid gap-3 text-sm text-[#8B95A7]">
              <Link className="hover:text-white" to="/why-veyro">Why Veyro</Link>
              <Link className="hover:text-white" to="/about">About</Link>
              <span>Secure checkout demo</span>
              <span>Frontend-only prototype</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-3 border-t border-[#202833] pt-6 text-xs text-[#697586] sm:grid-cols-3">
          <span className="flex items-center gap-2"><Truck size={14} /> Fast delivery experience</span>
          <span className="flex items-center gap-2"><ShieldCheck size={14} /> Secure-by-design UI</span>
          <span className="flex items-center gap-2"><Heart size={14} /> Made with care for better shopping</span>
        </div>

        <div className="mt-7 flex flex-col justify-between gap-3 border-t border-[#202833] pt-5 text-xs text-[#596474] sm:flex-row">
          <span>© {new Date().getFullYear()} VEYRO. Demo e-commerce project.</span>
          <Link to="/shop" className="flex items-center gap-1 text-[#8B95A7] hover:text-[#A3E635]">
            Explore collection <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
