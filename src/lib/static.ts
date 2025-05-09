import { Activity } from '../../prisma-client'

const userId = 'user-123'

export const staticActivities: Activity[] = [
  {
    id: '1',
    title: 'Funded wallet',
    type: 'credit',
    amount: 5000,
    created_at: new Date('2025-05-07T20:10:00'), // 5 minutes ago
    userId,
  },
  {
    id: '2',
    title: 'Withdrew from savings',
    type: 'debit',
    amount: 2500,
    created_at: new Date('2025-05-07T07:00:00'), // today 7am
    userId,
  },
  {
    id: '3',
    title: 'Created new Ajo group',
    type: 'create',
    created_at: new Date('2025-05-07T14:20:00'), // today
    userId,
    amount: null,
  },
  {
    id: '4',
    title: 'Sent money to group',
    type: 'transfer',
    amount: 1500,
    created_at: new Date('2025-05-07T15:00:00'), // today 3pm
    userId,
  },
  {
    id: '5',
    title: 'Received contribution',
    type: 'credit',
    amount: 3000,
    created_at: new Date('2025-05-06T19:45:00'), // yesterday evening
    userId,
  },
  {
    id: '6',
    title: 'Paid loan installment',
    type: 'debit',
    amount: 1200,
    created_at: new Date('2025-05-06T10:15:00'), // yesterday morning
    userId,
  },
]

export const staticJoinedGroups = [
  {
    name: 'Weekend Savings',
    id: 'grp_001',
    period_amount: 5000,
    member_ids: ['user_001', 'user_002', 'user_003'],
    created_at: new Date('2025-05-01T10:00:00Z'),
    duration: 12,
    minimum_members: 3,
    group_cover: 1,
  },
  {
    name: 'Tech Buddies Pool',
    id: 'grp_002',
    period_amount: 10000,
    member_ids: ['user_004', 'user_005'],
    created_at: new Date('2025-04-15T15:30:00Z'),
    duration: 6,
    minimum_members: 4,
    group_cover: 4,
  },
  {
    name: 'Wedding Fund',
    id: 'grp_003',
    period_amount: 20000,
    member_ids: ['user_008', 'user_009'],
    created_at: new Date('2025-03-20T08:15:00Z'),
    duration: 9,
    minimum_members: 2,
    group_cover: 4,
  },
]
