import query from "@/lib/fetch";
import { Group, Tag, User } from "../../../../prisma-client";
import { AjoParticipant } from "../types";
import { OnChainAjoGroupData } from "./types";
import { BN } from "@coral-xyz/anchor";

function formatNumber(bn: BN, decimals: number = 6): number {
  const base = new BN(10).pow(new BN(decimals));
  const whole = bn.div(base).toString();
  const fractional = bn.mod(base).toString().padStart(decimals, "0");

  // Trim trailing zeros
  const trimmed = fractional.replace(/0+$/, "");
  const amount = `${whole}${trimmed ? "." + trimmed : ""}`;

  return Number(amount);
}

export class AjoGroupData {
  name: string;
  created_at: Date;
  description: string;
  tag: Tag;
  cover_photo: number;
  pda: string;
  securityDeposit: number;
  contributionAmount: number;
  contributionInterval: number;
  payoutInterval: number;
  numParticipants: number;
  participants: AjoGroupParticipantData[];
  startTimestamp: unknown;
  payoutRound: number;
  closeVotes: string[];
  isClosed: boolean;
  //   vaultBump: number;
  //   bumps: number;
  constructor(onchain_data: OnChainAjoGroupData, offchain_data: Group) {
    this.name = offchain_data.name;
    this.created_at = new Date(offchain_data.created_at);
    this.description = offchain_data.description;
    this.tag = offchain_data.tag;
    this.cover_photo = offchain_data.cover_photo;
    this.pda = offchain_data.pda;
    this.securityDeposit = formatNumber(onchain_data.securityDeposit);
    this.contributionAmount = formatNumber(onchain_data.contributionAmount);
    this.contributionInterval = onchain_data.contributionInterval;
    this.payoutInterval = onchain_data.payoutInterval;
    this.numParticipants = onchain_data.numParticipants;
    this.participants = onchain_data.participants.map(
      (participant) => new AjoGroupParticipantData(participant)
    );
    this.startTimestamp = onchain_data.startTimestamp;
    this.payoutRound = onchain_data.payoutRound;
    this.closeVotes = onchain_data.closeVotes.map((voter) => voter.toBase58());
    this.isClosed = onchain_data.isClosed;
    // this.vaultBump = onchain_data.vaultBump;
    // this.bumps = onchain_data.bumps;
  }
}

export class AjoGroupParticipantData {
  participant: string;
  contributionRound: number;
  refundAmount: number;
  constructor(data: AjoParticipant) {
    this.participant = data.pubkey.toBase58();
    this.contributionRound = data.contributionRound;
    this.refundAmount = formatNumber(data.refundAmount);
  }
  public async getUser() {
    const { data } = await query.get<User>("participant", {
      params: { address: this.participant },
    });
    return data;
  }
}
