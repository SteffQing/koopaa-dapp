import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";

// Custom types
export type AjoParticipant = {
  pubkey: PublicKey;
  contributionRound: number; // u16
  refundAmount: BN; // u64
};

export type AjoGroup = {
  name: string;
  securityDeposit: BN; // u64
  contributionAmount: BN; // u64
  contributionInterval: number; // u8
  payoutInterval: number; // u8
  numParticipants: number; // u8
  participants: AjoParticipant[];
  startTimestamp: BN | null; // i64 | null
  payoutRound: number; // u16
  closeVotes: PublicKey[];
  isClosed: boolean;
  vaultBump: number; // u8
  bumps: number; // u8
};

export type GlobalState = {
  totalGroups: bigint; // u64
  activeGroups: bigint; // u64
  bumps: number; // u8
};

// Errors
export enum KoopaErrors {
  AlreadyClaimed = 6000,
  NotAllContributed = 6001,
  InvalidContributionAmount = 6002,
  InvalidInterval = 6003,
  InvalidParticipantCount = 6004,
  NameTooLong = 6005,
  GroupAlreadyStarted = 6006,
  GroupAlreadyClosed = 6007,
  AlreadyJoined = 6008,
  InvalidSecurityDeposit = 6009,
  OnlyAdminCanUpdate = 6010,
  AlreadyVotedToClose = 6011,
  NotParticipant = 6012,
  GroupNotStarted = 6013,
  GroupNotClosed = 6014,
  GroupCompleted = 6015,
  NotAParticipant = 6016,
  CannotContributeToThisRound = 6017,
  IntervalNotPassed = 6018,
  InsufficientFunds = 6019,
  InvalidFeePercentage = 6020,
}
