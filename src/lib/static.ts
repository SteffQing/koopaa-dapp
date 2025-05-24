// Tag options
const tagOptions = [
  { value: "real_estate", label: "Real Estate", icon: "🏠" },
  { value: "birthday", label: "Birthday", icon: "🎂" },
  { value: "finance", label: "Finance", icon: "💰" },
  { value: "lifestyle", label: "Lifestyle", icon: "🌴" },
  { value: "education", label: "Education", icon: "📚" },
  { value: "travel", label: "Travel", icon: "✈️" },
];

// Interval options
const contributionIntervals = [
  { value: "1", label: "Daily" },
  { value: "7", label: "Weekly" },
  { value: "30", label: "Monthly" },
];

const payoutIntervals = [
  { value: "7", label: "Weekly" },
  { value: "14", label: "Bi-weekly" },
  { value: "30", label: "Monthly" },
];

export { payoutIntervals, contributionIntervals, tagOptions };

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
