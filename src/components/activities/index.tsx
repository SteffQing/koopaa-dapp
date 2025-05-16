"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import StackedCoins from "@/assets/svgs/activities/stacked-coins.svg";
import Target from "@/assets/svgs/activities/target.svg";
import Transfer from "@/assets/svgs/activities/transfer.svg";

import { Activity, ActivityType } from "../../../prisma-client";
import { groupActivitiesByTimeframe } from "./utils";
import { Fragment, JSX } from "react";
import { formatActivityTime } from "@/lib/date";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SkeletonActivity } from "../skeletons/activities";

const IconByType: Record<ActivityType, JSX.Element> = {
  create: <Target />,
  credit: <StackedCoins />,
  debit: <StackedCoins />,
  transfer: <Transfer />,
};

const IconBG: Record<ActivityType, string> = {
  create: "#CFECFE",
  credit: "#D4FFAB",
  debit: "#FFD1D1",
  transfer: "#FFF0E0",
};

const labelMap: Record<string, string> = {
  today: "Today",
  yesterday: "Yesterday",
  lastWeek: "This Week",
  lastMonth: "This Month",
  older: "Older",
};

export default function RecentActivities({
  data,
  loading,
}: ComponentProps<Activity>) {
  return (
    <motion.div
      className="bg-[#FCFCFC] rounded-[8px] px-3 py-4 flex flex-col gap-3"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Recent Activities</h2>
        <button className="text-[#ff6600] text-xs font-medium flex items-center">
          {data && data.length > 0 && (
            <Link href="/">
              See all <ChevronRight size={16} />
            </Link>
          )}
        </button>
      </div>

      {loading || !data ? (
        <SkeletonActivity />
      ) : data.length > 0 ? (
        Object.entries(groupActivitiesByTimeframe(data)).map(
          ([label, group]) =>
            group.length > 0 ? (
              <GroupedActivity
                key={label}
                label={labelMap[label]}
                group={group}
              />
            ) : null
        )
      ) : (
        <p className="text-[#767676] text-sm font-normal text-center">
          No recent activities
        </p>
      )}
    </motion.div>
  );
}

interface GroupProp {
  group: Activity[];
  label: string;
}
function GroupedActivity({ group, label }: GroupProp) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-[10px] font-normal text-[#767676] mb-2">{label}</h4>
      {group.map((activity, index) => (
        <Fragment key={index}>
          <motion.div
            key={activity.id}
            className="flex items-center justify-between"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index + 0.6 }}
            whileHover={{ x: 5 }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: IconBG[activity.type] }}
              >
                <span className="text-lg">{IconByType[activity.type]}</span>
              </div>
              <div>
                <p className="text-xs text-[#2E2E2E] font-medium">
                  {activity.title}
                </p>
                <p className="text-[10px] font-light text-[#767676]">
                  {formatActivityTime(activity.created_at)}
                </p>
              </div>
            </div>
            {activity.amount && (
              <p
                className={cn(
                  "text-xs font-medium",
                  activity.type === "debit"
                    ? "text-[#FF0000]"
                    : "text-[#121212]"
                )}
              >
                {activity.type === "debit" && "-"}$
                {activity.amount.toLocaleString()}
              </p>
            )}
          </motion.div>
          {index !== group.length - 1 ? (
            <span className="w-full h-[1px] bg-[#E6E6E6] my-1" />
          ) : (
            <span className="mb-1" />
          )}
        </Fragment>
      ))}
    </div>
  );
}
