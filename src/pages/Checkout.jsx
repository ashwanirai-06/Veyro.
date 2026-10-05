import { useMemo, useState } from "react";
import { CreditCard, LockKeyhole, MapPin, Smartphone, WalletCards } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { formatINR } from "../utils/format";
import upiQR from "../assets/images/upi-qr.jpeg";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, clearCart } = useCart();
  const [method, setMethod] = useState("card");
  const [submitted, setSubmitted] = useState(false);
  const [upiPaid, setUpiPaid] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "", pin: "",
    card: "", expiry: "", cvv: "", upi: "",
  });

  const shipping = subtotal >= 5000 ? 0 : 99;
  const discount = subtotal >= 10000 ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount + shipping;

  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const canSubmit = useMemo(() => {
    const base = form.name && form.email && form.phone && form.address && form.city && /^\d{6}$/.test(form.pin);
    if (!base) return false;
    if (method === "card") return form.card.replace(/\s/g, "").length >= 12 && form.expiry && form.cvv.length >= 3;
    if (method === "upi") return upiPaid;
    return true;
  }, [form, method]);

  const submit = (event) => {
    event.preventDefault();
    if (!canSubmit) {
      setSubmitted(true);
      return;
    }
    const orderId = `VYR-${Math.floor(100000 + Math.random() * 900000)}`;
    clearCart();
    navigate("/order-success", { state: { orderId, total } });
  };

  if (!cartItems.length) {
    return (
      <div className="veyro-page">
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="text-3xl font-black text-white">Nothing to checkout</h1>
          <p className="mt-3 text-sm text-[#8B95A7]">Add a product to your cart before opening checkout.</p>
          <button onClick={() => navigate("/shop")} className="veyro-button mt-6 rounded-xl bg-[#A3E635] px-5 py-3 text-sm font-black text-[#080B10]">Browse collection</button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="veyro-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#A3E635]">Final step</p>
          <h1 className="mt-2 text-4xl font-black text-white">Secure Checkout</h1>
          <p className="mt-3 text-sm leading-6 text-[#8B95A7]">A clean frontend checkout flow. No real payment is processed.</p>
        </div>

        <form onSubmit={submit} className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <section className="rounded-2xl border border-[#202833] bg-[#11161D] p-5 sm:p-6">
              <div className="flex items-center gap-2"><MapPin size={17} className="text-[#A3E635]" /><h2 className="font-bold text-white">Contact & delivery</h2></div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["name", "Full name", "text"], ["email", "Email address", "email"],
                  ["phone", "Phone number", "tel"], ["city", "City", "text"],
                  ["pin", "PIN code", "text"], ["address", "Address", "text"],
                ].map(([key, label, type]) => (
                  <label key={key} className={key === "address" ? "sm:col-span-2" : ""}>
                    <span className="mb-1.5 block text-xs font-semibold text-[#8B95A7]">{label}</span>
                    <input value={form[key]} onChange={update(key)} type={type} className={`veyro-input rounded-xl px-3.5 py-3 text-sm ${submitted && !form[key] ? "border-[#FB7185]" : ""}`} />
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[#202833] bg-[#11161D] p-5 sm:p-6">
              <div className="flex items-center gap-2"><WalletCards size={17} className="text-[#22D3EE]" /><h2 className="font-bold text-white">Payment method</h2></div>
              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {[
                  ["card", "Card", CreditCard],
                  ["upi", "UPI", Smartphone],
                  ["cod", "Cash on Delivery", WalletCards],
                ].map(([value, label, Icon]) => (
                  <button type="button" key={value} onClick={() => setMethod(value)} className={`rounded-xl border p-3 text-left ${method === value ? "border-[#A3E635]/50 bg-[#A3E635]/5" : "border-[#202833] bg-[#0D1117]"}`}>
                    <Icon size={17} className={method === value ? "text-[#A3E635]" : "text-[#697586]"} />
                    <div className="mt-2 text-xs font-bold text-white">{label}</div>
                  </button>
                ))}
              </div>

              {method === "card" && (
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <label className="sm:col-span-3"><span className="mb-1.5 block text-xs text-[#8B95A7]">Card number</span><input value={form.card} onChange={update("card")} className="veyro-input rounded-xl px-3.5 py-3 text-sm" placeholder="1234 5678 9012" /></label>
                  <label><span className="mb-1.5 block text-xs text-[#8B95A7]">Expiry</span><input value={form.expiry} onChange={update("expiry")} className="veyro-input rounded-xl px-3.5 py-3 text-sm" placeholder="MM/YY" /></label>
                  <label><span className="mb-1.5 block text-xs text-[#8B95A7]">CVV</span><input value={form.cvv} onChange={update("cvv")} className="veyro-input rounded-xl px-3.5 py-3 text-sm" placeholder="123" /></label>
                </div>
              )}
              {method === "upi" && (
                <div className="mt-4 rounded-2xl border border-[#202833] bg-[#0D1117] p-4 sm:p-5">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A3E635]/10 text-[#A3E635]">
                      <Smartphone size={20} />
                    </div>
                    <h3 className="mt-3 text-sm font-black text-white">Scan & Pay with UPI</h3>
                    <p className="mt-1 max-w-sm text-xs leading-5 text-[#8B95A7]">
                      Scan the QR code with any UPI app and pay the exact order amount.
                    </p>

                    <div className="mt-4 rounded-2xl bg-white p-3 shadow-[0_0_35px_rgba(163,230,53,0.08)]">
                      <img
                        src={upiQR}
                        alt="VEYRO UPI payment QR code"
                        className="h-52 w-52 object-contain sm:h-60 sm:w-60"
                      />
                    </div>

                    <div className="mt-4 rounded-xl border border-[#202833] bg-[#11161D] px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-[#697586]">Amount to pay</p>
                      <p className="mt-1 text-xl font-black text-white">{formatINR(total)}</p>
                    </div>

                    <label className="mt-4 flex w-full max-w-sm cursor-pointer items-start gap-3 rounded-xl border border-[#202833] bg-[#11161D] p-3 text-left">
                      <input
                        type="checkbox"
                        checked={upiPaid}
                        onChange={(event) => setUpiPaid(event.target.checked)}
                        className="mt-0.5 h-4 w-4 accent-[#A3E635]"
                      />
                      <span className="text-xs leading-5 text-[#AAB4C3]">
                        I have completed the UPI payment for the amount shown above.
                      </span>
                    </label>

                    {submitted && !upiPaid && (
                      <p className="mt-2 text-xs font-semibold text-[#FB7185]">
                        Please complete the payment and confirm it before placing the order.
                      </p>
                    )}
                  </div>
                </div>
              )}
              {method === "cod" && <p className="mt-4 rounded-xl border border-[#202833] bg-[#0D1117] p-3 text-xs text-[#8B95A7]">Cash on Delivery selected. You can place the demo order without payment details.</p>}
            </section>

            <div className="flex items-center gap-2 text-xs text-[#697586]"><LockKeyhole size={14} className="text-[#34D399]" /> Your payment details are used only for this frontend demo.</div>
          </div>

          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-[#202833] bg-[#11161D] p-5">
              <h2 className="font-bold text-white">Order summary</h2>
              <div className="mt-4 space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between gap-3 text-xs">
                    <span className="line-clamp-1 text-[#8B95A7]">{item.title} × {item.quantity}</span>
                    <span className="shrink-0 font-semibold text-white">{formatINR(Math.round(item.price * 83) * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="my-5 border-t border-[#202833]" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#8B95A7]"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
                <div className="flex justify-between text-[#8B95A7]"><span>Discount</span><span className="text-[#34D399]">− {formatINR(discount)}</span></div>
                <div className="flex justify-between text-[#8B95A7]"><span>Shipping</span><span>{shipping ? formatINR(shipping) : "FREE"}</span></div>
              </div>
              <div className="my-5 border-t border-[#202833]" />
              <div className="flex justify-between"><span className="font-semibold text-[#AAB4C3]">Total</span><span className="text-2xl font-black text-white">{formatINR(total)}</span></div>
              <button
                type="submit"
                disabled={method === "upi" && !upiPaid}
                className="veyro-button mt-5 w-full rounded-xl bg-[#A3E635] py-3.5 text-sm font-black text-[#080B10] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {method === "upi" ? "Confirm & Place Order" : "Place Demo Order"}
              </button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
