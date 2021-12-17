export function formatPrice(rawPrice) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(rawPrice);
}