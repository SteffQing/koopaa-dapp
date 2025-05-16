import { PublicKey } from '@solana/web3.js'

// Custom types
export type AjoParticipant = {
  pubkey: PublicKey
  contributionRound: number // u16
  refundAmount: bigint // u64
}

export type AjoGroup = {
  name: string
  securityDeposit: bigint // u64
  contributionAmount: bigint // u64
  contributionInterval: number // u8
  payoutInterval: number // u8
  numParticipants: number // u8
  participants: AjoParticipant[]
  startTimestamp: number | null // i64 | null
  payoutRound: number // u16
  closeVotes: PublicKey[]
  isClosed: boolean
  vaultBump: number // u8
  bumps: number // u8
}

export type GlobalState = {
  totalGroups: bigint // u64
  activeGroups: bigint // u64
  bumps: number // u8
}

// Events
export type AjoGroupCreatedEvent = {
  groupName: string
  securityDeposit: bigint
  contributionAmount: bigint
  numParticipants: number
  contributionInterval: number
  payoutInterval: number
}

export type ParticipantJoinedEvent = {
  groupName: string
  participant: PublicKey
  joinTimestamp: number
}

export type ContributionMadeEvent = {
  groupName: string
  contributor: PublicKey
  contributionAmount: bigint
  currentRound: number
}

export type PayoutMadeEvent = {
  groupName: string
  recipient: PublicKey
  payoutAmount: bigint
  payoutRound: number
}

export type AjoGroupClosedEvent = {
  groupName: string
  totalVotes: number
  groupSize: number
}

export type RefundClaimedEvent = {
  groupName: string
  participant: PublicKey
  amount: bigint
}

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

export type CreateAjoGroupParams = {
  name: string
  securityDeposit: number // bigint
  contributionAmount: number // bigint
  contributionInterval: number // u8
  payoutInterval: number // u8
  numParticipants: number // u8
}

export interface ContributeParams {
  ajoGroup: PublicKey
  tokenMint: PublicKey
}

export interface ClaimRoundParams {
  ajoGroup: PublicKey
}

export interface NextRoundParams {
  ajoGroup: PublicKey
}

export interface JoinAjoGroupParams {
  ajoGroup: PublicKey
}

export interface StartAjoGroupParams {
  ajoGroup: PublicKey
}
