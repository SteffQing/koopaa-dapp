"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";
import { use } from "react";
import NavHeader from "@/views/Navigation/nav-header";
import Container from "@/components/container";
import { Avatar } from "@/components/avatar";
import GroupSavingsCard from "./Card";
import {
  staticActivities,
  staticCardData,
  staticGroupData,
} from "@/lib/static";
import RecentActivities from "@/components/activities";

export default function AjoGroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Container>
      <NavHeader path="/savings" header={staticGroupData.name} />

      <motion.div variants={item} className="mb-4 rounded-xl overflow-hidden">
        <Image
          src={`/group-cover/${staticGroupData.coverImage}.png`}
          alt={staticGroupData.name}
          width={400}
          height={200}
          className="w-full h-40 object-cover"
        />
      </motion.div>

      <GroupSavingsCard data={staticCardData} />

      {/* Warning */}
      <motion.div variants={item} className="bg-orange-100 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-orange-200 rounded-full p-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z"
                stroke="#ff6b00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-[#ff6b00]">
              Pay your contribution now
            </p>
            <p className="text-sm text-gray-600">
              You are set back by 1 contribution round. Endeavour to pay!
            </p>
          </div>
        </div>
      </motion.div>

      {/* Group Info */}
      <motion.div variants={item} className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Start Date</p>
          <p className="font-medium">{staticGroupData.startDate}</p>
        </div>
        {/* <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">End Date</p>
          <p className="font-medium">{staticGroupData.endDate}</p>
        </div> */}
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Saving Frequency</p>
          <p className="font-medium">{staticGroupData.savingFrequency}</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Payout interval</p>
          <p className="font-medium">{staticGroupData.daysLeft} days</p>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Group Type</p>
          <p className="font-medium">{staticGroupData.groupType}</p>
        </div>
        <Link href={`/savings/ajo/${id}/members`}>
          <div className="bg-white rounded-xl p-4 h-full flex flex-col justify-between">
            <p className="text-sm text-gray-500 mb-1">Group Members</p>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {Array.from({ length: staticGroupData.memberCount }).map(
                  (_, idx) => (
                    <Avatar number={idx + 1} size={24} key={idx} />
                  )
                )}
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-1">
                  +{staticGroupData.memberCount}
                </span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Next Saving Date */}
      <motion.div variants={item} className="bg-blue-50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 rounded-full p-2">
            <Calendar size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Your next saving date is</p>
            <p className="font-medium">{staticGroupData.collectionDate}</p>
          </div>
        </div>
      </motion.div>

      <RecentActivities
        data={staticActivities.slice(1, -1).reverse()}
        loading={false}
      />
    </Container>
  );
}
