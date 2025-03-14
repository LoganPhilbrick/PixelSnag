export function formatCurrency(pennies) {
  if (typeof pennies !== "number" || pennies < 0) {
    throw new Error("Input must be a non-negative number");
  }

  let dollars = (pennies / 100).toFixed(2); // Convert to dollars and format to 2 decimal places
  return `$${dollars}`;
}
