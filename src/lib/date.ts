export function formatActivityTime(dateArg: Date | string): string {
  const now = new Date();
  const date = typeof dateArg === "string" ? new Date(dateArg) : dateArg;
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  if (hours < 12)
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")} ${date.getHours() >= 12 ? "PM" : "AM"}`;

  // Else: full date fallback (optional)
  return date.toLocaleString();
}

export const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  // Handle special cases 11th, 12th, 13th
  const suffix =
    day >= 11 && day <= 13 ? "th" : ["th", "st", "nd", "rd"][day % 10] || "th";

  return `${day}${suffix} ${month}, ${year}`;
};

export const formatDateTS = (ts: number) => {
  const date = new Date(ts * 1000);
  return formatDate(date);
};

export function getDateHumanReadable(date: Date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`; // 10-May-2025
}
