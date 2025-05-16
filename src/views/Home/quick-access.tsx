"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import MyGroups from "@/assets/quick-access/my-groups.png";
import Solo from "@/assets/quick-access/solo.png";
import PublicGroup from "@/assets/quick-access/public-group.png";
import PrivateGroup from "@/assets/quick-access/private-group.png";

import Bolt from "@/assets/svgs/bolt.svg";
import Link from "next/link";
const items = [
  {
    title: "My Groups",
    image: MyGroups,
    color: "#D3D0FF",
    href: "/squads",
  },
  {
    title: "Create Solo Savings",
    image: Solo,
    color: "#B6DEC6",
    href: "/savings",
  },
  {
    title: "Create Ajo Group",
    image: PublicGroup,
    color: "#FEC1BE",
    href: "/savings/ajo",
  },
  {
    title: "Create Private Group",
    image: PrivateGroup,
    color: "#C2BBFF",
    href: "/savings",
  },
];
export default function QuickAccess() {
  return (
    <motion.div
      className="mb-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-semibold">Quick Access</h2>
        <Bolt />
      </div>

      <div className="overflow-x-auto overflow-y-hidden whitespace-nowrap -mx-4 px-4">
        <div className="flex gap-3">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="rounded-[8px] flex-shrink-0 flex flex-col items-center justify-center overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index + 0.4 }}
              style={{
                background: item.color,
                border: `1px solid ${item.color}`,
              }}
            >
              <Link href={item.href}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={120}
                  height={89}
                  className="w-[120px] h-[89px]"
                />

                <p className="text-[10px] w-full text-start text-[#121212] font-medium px-2 py-3">
                  {item.title}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
