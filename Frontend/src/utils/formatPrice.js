// src/utils/formatPrice.js

export function formatPrice(value) {
  if (typeof value !== "number") return value;

  return value.toLocaleString("en-IN");
}
