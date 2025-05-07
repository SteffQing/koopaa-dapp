import { Activity } from '../../../prisma-client'

type GroupedActivities = {
  today: Activity[]
  yesterday: Activity[]
  lastWeek: Activity[]
  lastMonth: Activity[]
  older: Activity[]
}

export function groupActivitiesByTimeframe(activities: Activity[]): GroupedActivities {
  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const startOfYesterday = new Date(startOfToday)
  startOfYesterday.setDate(startOfYesterday.getDate() - 1)

  const startOfLastWeek = new Date(startOfToday)
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7)

  const startOfLastMonth = new Date(startOfToday)
  startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1)

  const result: GroupedActivities = {
    today: [],
    yesterday: [],
    lastWeek: [],
    lastMonth: [],
    older: [],
  }

  for (const activity of activities) {
    const date = activity.created_at

    if (date >= startOfToday) {
      result.today.push(activity)
    } else if (date >= startOfYesterday) {
      result.yesterday.push(activity)
    } else if (date >= startOfLastWeek) {
      result.lastWeek.push(activity)
    } else if (date >= startOfLastMonth) {
      result.lastMonth.push(activity)
    } else {
      result.older.push(activity)
    }
  }

  return result
}
