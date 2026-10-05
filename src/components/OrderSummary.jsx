import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { formatINR } from "../utils/format";

export default function OrderSummary({
  subtotal = 0,
  discount = 0,
  shipping = 0,
  buttonText = "Proceed to Checkout",
  onButtonClick,
  disabled = false,
}) {
  const total = subtotal - discount + shipping;

  return (
    <div className="rounded-2xl border border-[#202833] bg-[#11161D] p-5">
      <h2 className="text-lg font-bold text-white">Order summary</h2>
      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between text-[#8B95A7]"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
        <div className="flex justify-between text-[#8B95A7]"><span>Discount</span><span className="text-[#34D399]">− {formatINR(discount)}</span></div>
        <div className="flex justify-between text-[#8B95A7]"><span>Shipping</span><span>{shipping === 0 ? "FREE" : formatINR(shipping)}</span></div>
      </div>
      <div className="my-5 border-t border-[#202833]" />
      <div className="flex items-end justify-between">
        <span className="text-sm font-semibold text-[#AAB4C3]">Total</span>
        <span className="text-2xl font-black text-white">{formatINR(total)}</span>
      </div>
      <button
        disabled={disabled}
        onClick={onButtonClick}
        className="veyro-button mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#A3E635] px-4 py-3.5 text-sm font-black text-[#080B10] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {buttonText} <ArrowRight size={16} />
      </button>
      <div className="mt-4 grid gap-2 text-[11px] text-[#697586]">
        <span className="flex items-center gap-2"><ShieldCheck size={13} className="text-[#34D399]" /> Secure checkout experience</span>
        <span className="flex items-center gap-2"><Truck size={13} className="text-[#22D3EE]" /> Free shipping above ₹5,000</span>
      </div>
    </div>
  );
}
