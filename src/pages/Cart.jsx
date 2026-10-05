import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import EmptyState from "../components/EmptyState";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, subtotal } = useCart();

  const shipping = subtotal === 0 || subtotal >= 5000 ? 0 : 99;
  const discount = subtotal >= 10000 ? Math.round(subtotal * 0.1) : 0;

  return (
    <div className="veyro-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div>
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#A3E635]">Your selection</p>
          <h1 className="mt-2 text-4xl font-black text-white">Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="mt-8">
            <EmptyState title="Your cart is empty" text="Looks like you haven't added anything yet. Let's fix that." />
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-3">
              {cartItems.map((item) => <CartItem key={item.id} item={item} />)}
              <Link to="/shop" className="inline-flex items-center gap-2 pt-3 text-sm font-bold text-[#AAB4C3] hover:text-[#A3E635]">
                <ArrowLeft size={15} /> Continue shopping
              </Link>
            </div>
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <OrderSummary
                subtotal={subtotal}
                discount={discount}
                shipping={shipping}
                buttonText="Continue to Checkout"
                onButtonClick={() => navigate("/checkout")}
              />
              <div className="mt-3 rounded-2xl border border-[#202833] bg-[#0D1117] p-4 text-xs leading-5 text-[#697586]">
                <ShoppingBag size={15} className="mb-2 text-[#A3E635]" />
                Orders above ₹10,000 automatically receive a demo 10% cart discount.
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
