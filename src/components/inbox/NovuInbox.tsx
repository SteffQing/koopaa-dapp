"use client";
import { Inbox } from "@novu/nextjs";

export default function NovuInbox({ subscriberId }: { subscriberId: string }) {
  const tabs = [
    {
      label: "All",
      filter: { tags: [] },
    },

    // Filter by tags - shows notifications from workflows tagged "promotions"
    // {
    //   label: "Promotions",
    //   filter: { tags: ["promotions"] },
    // },

    // // Filter by multiple tags - shows notifications with either "security" OR "alert" tags
    // {
    //   label: "Security",
    //   filter: { tags: ["security", "alert"] },
    // },

    // // Filter by data attributes - shows notifications with priority="high" in payload
    // {
    //   label: "High Priority",
    //   filter: { data: { priority: "high" } },
    // },

    // // Combined filtering - shows notifications that:
    // // 1. Come from workflows tagged "alert" AND
    // // 2. Have priority="high" in their data payload
    // {
    //   label: "Critical Alerts",
    //   filter: { tags: ["alert"], data: { priority: "high" } },
    // },
  ];

  return (
    <Inbox
      applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_ID as string}
      subscriberId={subscriberId}
      tabs={tabs}
      appearance={{
        variables: {
          colorPrimary: "#ff6600",
          colorForeground: "#0E121B",
        },
      }}
    />
  );
}
