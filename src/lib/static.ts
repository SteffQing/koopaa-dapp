import { Activity } from "../../prisma-client";

const userId = "user-123";

export const staticActivities: Activity[] = [
  {
    id: "1",
    title: "Funded wallet",
    type: "credit",
    amount: 1355,
    created_at: new Date("2025-04-07T20:10:00"), // 5 minutes ago
    userId,
  },
  {
    id: "2",
    title: "Joined new Ajo group",
    type: "create",
    created_at: new Date("2025-04-21T14:20:00"), // today
    userId,
    amount: null,
  },
  {
    id: "3",
    title: "Paid Security Deposit",
    type: "debit",
    created_at: new Date("2025-04-21T14:20:00"), // today
    userId,
    amount: 100,
  },
  {
    id: "4",
    title: "Sent money to group",
    type: "transfer",
    amount: 50,
    created_at: new Date("2025-04-28T01:00:00"), // today 3pm
    userId,
  },
  {
    id: "5",
    title: "Sent money to group",
    type: "transfer",
    amount: 100,
    created_at: new Date("2025-05-07T15:00:00"), // today 3pm
    userId,
  },
  {
    id: "6",
    title: "Received contribution",
    type: "credit",
    amount: 2000,
    created_at: new Date("2025-05-16T19:55:00"), // yesterday evening
    userId,
  },
  // {
  //   id: "6",
  //   title: "Paid loan installment",
  //   type: "debit",
  //   amount: 1200,
  //   created_at: new Date("2025-05-06T10:15:00"), // yesterday morning
  //   userId,
  // },
];

export const staticJoinedGroups = [
  {
    name: "Weekend Savings",
    id: "grp_001",
    period_amount: 50,
    member_ids: [1, 2, 3, 4, 1, 3],
    created_at: new Date("2025-04-21T10:00:00Z"),
    duration: 30,
    minimum_members: 6,
    group_cover: 1,
  },
  {
    name: "Tech Buddies Pool",
    id: "grp_002",
    period_amount: 10000,
    member_ids: [4, 1],
    created_at: new Date("2025-04-15T15:30:00Z"),
    duration: 6,
    minimum_members: 4,
    group_cover: 4,
  },
  {
    name: "Wedding Fund",
    id: "grp_003",
    period_amount: 20000,
    member_ids: [8, 1],
    created_at: new Date("2025-03-20T08:15:00Z"),
    duration: 9,
    minimum_members: 2,
    group_cover: 3,
  },
];

export const availableSquads = [
  // { name: 'Dubai Tech Trip', members: [1, 3, 5], goal: 3000, tag: 'lifestyle' },
  { name: "Business 2025", members: [1, 3, 5, 4], goal: 1000, tag: "finance" },
  {
    name: "House Project",
    members: [3, 4, 2, 6, 1, 5, 8, 9],
    goal: 2000,
    tag: "real estate",
  },
  {
    name: "Zainab's Birthday",
    members: [3, 4, 2, 6, 1, 5, 8],
    goal: 1000,
    tag: "friends",
  },
];

export const staticCardData = {
  contributionAmount: 50,
  contributionRounds: 3,
  contributionInterval: 7,
  numParticipants: 6,
  mccr: 2,
  payoutRound: 3,
  payoutInterval: 30,
  currentRound: 1,
};

export const staticGroupData = {
  id: "grp_001",
  name: "Funmi asoebi",
  openSlots: 4,
  nextContribution: "1st",
  collectionDate: "22nd May, 2025",
  startDate: "21 April, 2025",
  savingFrequency: "$50.00 weekly",
  daysLeft: 30,
  groupType: "Public group",
  memberCount: 3,
  hasTransactions: false,
  amountSaved: 50,
  savingsDuration: "5 Months",
  progress: 1,
  coverImage: 1,
};

export const staticMembers = [
  {
    id: 1,
    name: "Emola Shola",
    isAdmin: true,
    position: "1st",
    collectionDate: "21 May 2025",
    status: "next",
  },
  {
    id: 2,
    name: "Khalid Momoh",
    position: "2nd",
    collectionDate: "18 June 2025",
    status: "outstanding",
  },
  {
    id: 3,
    name: "Fathia Balogun",
    position: "3rd",
    collectionDate: "18 July 2025",
    status: "outstanding",
  },
  {
    id: 4,
    name: "Adeleke David",
    position: "4th",
    collectionDate: "17 August 2025",
    status: "outstanding",
  },
  {
    id: 1,
    name: "You",
    position: "5th",
    collectionDate: "16 September 2025",
    status: "outstanding",
  },
  {
    id: 6,
    name: "Simon Kingsley",
    position: "6th",
    collectionDate: "16 October 2025",
    status: "outstanding",
  },
];
