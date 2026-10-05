export const INR_RATE = 83;

export function getINRPrice(price = 0) {
  return Math.round(Number(price) * INR_RATE);
}

export function formatINR(value = 0) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getDiscountedINRPrice(product) {
  const price = getINRPrice(product?.price);
  const discount = Number(product?.discountPercentage || 0);
  return Math.max(0, Math.round(price * (1 - discount / 100)));
}

export function slugToTitle(slug = "") {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
