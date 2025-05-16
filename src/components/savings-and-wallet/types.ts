export type Tab = "Savings" | "Wallet";
export type Currency = "USDC" | "NGN";
export type SavingsType = "total" | "individual" | "ajo";
export type SavingsData = {
  type: SavingsType;
  amount: number;
};
