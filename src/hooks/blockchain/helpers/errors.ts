import { AnchorError } from "@coral-xyz/anchor";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { toast } from "sonner";

export function handleOnchainError(error: unknown) {
  if (error instanceof AnchorError) {
    toast.error(error.error.errorMessage);
  } else if (error instanceof WalletSignTransactionError) {
    toast.error(error.message);
    toast.error("You cancelled the transaction signing flow 👀");
  } else {
    toast.error("An error occured while trying to complete this action 😕");
    console.error("Unknown error", error);
  }
}
