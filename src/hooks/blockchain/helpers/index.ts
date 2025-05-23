import { getKoopaProgramId } from "@/lib/solana/koopa-exports";
import { PublicKey } from "@solana/web3.js";

const programId = getKoopaProgramId();

export const findAjoGroupPDA = (name: string) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("ajo-group"), Buffer.from(name)],
    programId
  );
};
