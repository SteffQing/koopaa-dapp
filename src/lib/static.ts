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
