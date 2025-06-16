import { Tag, Group } from "../../../../prisma-client";
import { AjoParticipant, AjoGroup } from "../types";
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
  startTimestamp: null | number;
  payoutRound: number;
  closeVotes: string[];
  isClosed: boolean;
  //   vaultBump: number;
  //   bumps: number;

  private DAYSINSECONDS = 86400;
  private actualPayoutInterval(): number {
    return Math.ceil(this.payoutInterval / this.contributionInterval);
  }
  private contributionPayout() {
    return this.contributionAmount * this.numParticipants;
  }
  public payout(): number {
    const actualPayoutInterval = this.actualPayoutInterval();
    const contributionPayout = this.contributionPayout();
    const payout = contributionPayout * actualPayoutInterval;
    return payout;
  }

  // private minimum_contribution_round(): number {
  //   const rounds = this.participants.map((p) => p.contributionRound);
  //   return Math.min(...rounds);
  // }
  private total_collected_contributions(): number {
    return this.participants.reduce(
      (total, participant) =>
        total + participant.contributionRound * this.contributionAmount,
      0
    );
  }
  private already_disbursed(): number {
    return (
      this.payoutRound * this.contributionPayout() * this.actualPayoutInterval()
    );
  }

  private available_payout() {
    return this.total_collected_contributions() - this.already_disbursed();
  }

  public goal() {
    const requiredForNextPayout =
      this.contributionPayout() * this.actualPayoutInterval();
    const available = this.available_payout();
    return Math.min((available / requiredForNextPayout) * 100, 100);
  }

  public next_contribution_date() {
    if (this.startTimestamp === null) return null;
    const now = Math.floor(Date.now() / 1000);
    const elapsed = now - this.startTimestamp;

    const intervalInSeconds = this.contributionInterval * this.DAYSINSECONDS;

    const intervalsPassed = Math.floor(elapsed / intervalInSeconds);
    const nextTimestamp =
      this.startTimestamp + (intervalsPassed + 1) * intervalInSeconds;

    return new Date(nextTimestamp * 1000);
  }
  public next_payout_date() {
    if (this.startTimestamp === null) return null;
    const intervalInSeconds = this.payoutInterval * this.DAYSINSECONDS;

    const nextTimestamp =
      this.startTimestamp + (this.payoutRound + 1) * intervalInSeconds;

    return new Date(nextTimestamp * 1000);
  }

  private get_missing_rounds(userContributionRound: number): number {
    const currentContributionRound = this.get_current_contribution_round();

    const missingRounds = currentContributionRound - userContributionRound;
    return Math.max(missingRounds, 0);
  }

  public get_current_contribution_round() {
    if (this.startTimestamp === null) return 0;
    const now = Math.floor(Date.now() / 1000);
    const elapsed = now - this.startTimestamp;
    const intervalInSeconds = this.contributionInterval * this.DAYSINSECONDS;
    return Math.floor(elapsed / intervalInSeconds);
  }

  public youParticipant(you: string | undefined) {
    if (!you) return null;
    const participant = this.participants.find(
      (p) => p.participant.toLowerCase() === you.toLowerCase()
    );
    if (!participant) return null;

    const amountSaved = participant.contributionRound * this.contributionAmount;
    const index = this.payoutRound % this.numParticipants;
    const youNext = this.participants[index].participant === you;
    return {
      amountSaved,
      missingRounds: this.get_missing_rounds(participant.contributionRound),
      nextPayout: youNext && Boolean(this.startTimestamp),
      ...participant,
    };
  }

  constructor(onchain_data: AjoGroup, offchain_data: Group) {
    this.name = onchain_data.name;
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
    this.startTimestamp = onchain_data.startTimestamp
      ? formatNumber(onchain_data.startTimestamp, 0)
      : null;
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
}
