// Formats ETB currency (e.g., "ETB 450.00" or "450.00 ETB")
export const formatETB = (amount) => {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    minimumFractionDigits: 2,
  }).format(amount);
};

// Formats timestamp in Addis Ababa timezone (EAT - UTC+3)
export const formatAddisDateTime = (dateString) => {
  const date = new Date(dateString || Date.now());
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Addis_Ababa",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};
