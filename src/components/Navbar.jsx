import { Link, NavLink } from "react-router-dom";
import { Heart, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/why-veyro", label: "Why Veyro" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const linkClass = ({ isActive }) =>
    `relative py-2 text-sm font-medium transition ${
      isActive ? "text-[#A3E635]" : "text-[#AAB4C3] hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#202833]/90 bg-[#080B10]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group shrink-0" onClick={() => setOpen(false)}>
          <div className="text-xl font-black tracking-[0.22em] text-white">VEYRO</div>
          <div className="mt-0.5 text-[8px] font-semibold tracking-[0.25em] text-[#738093]">
            TECHNOLOGY, CURATED BETTER
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative rounded-xl p-2.5 text-[#AAB4C3] transition hover:bg-[#11161D] hover:text-white"
          >
            <Heart size={19} />
            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-[#FB7185] px-1 text-[9px] font-bold text-[#080B10]">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            aria-label="Cart"
            className="relative rounded-xl p-2.5 text-[#AAB4C3] transition hover:bg-[#11161D] hover:text-white"
          >
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-[#A3E635] px-1 text-[9px] font-bold text-[#080B10]">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="ml-1 rounded-xl border border-[#202833] p-2.5 text-[#AAB4C3] lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[#202833] bg-[#0D1117] px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 sm:grid-cols-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-[#A3E635]/10 text-[#A3E635]"
                      : "text-[#AAB4C3] hover:bg-[#11161D] hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
