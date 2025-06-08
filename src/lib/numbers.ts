export function trimWhole(amount: number) {
  if (amount >= 1e9) return amount / 1e9 + "B";
  else if (amount >= 1e6) return amount / 1e6 + "M";
  else return amount;
}
