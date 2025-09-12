// src/utils/formatPrice.js
const formatPrice = (price, locale = "es-AR", currency = "ARS") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price);
};

export default formatPrice;
