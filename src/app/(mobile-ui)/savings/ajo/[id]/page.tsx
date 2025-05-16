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

export default function AjoGroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const data = {
    contributionAmount: 50,
    contributionRounds: 4,
    contributionInterval: 7,
    numParticipants: 6,
    mccr: 2,
    payoutRound: 3,
    payoutInterval: 30,
    currentRound: 1,
  };

  const groupData = {
    id,
    name: "Funmi asoebi",
    openSlots: 4,
    nextContribution: "1st",
    collectionDate: "22nd May, 2025",
    startDate: "08 - May - 2025",
    endDate: "08 - August - 2025",
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

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Container>
      <NavHeader path="/savings" header={groupData.name} />

      <motion.div variants={item} className="mb-4 rounded-xl overflow-hidden">
        <Image
          src={`/group-cover/${groupData.coverImage}.png`}
          alt={groupData.name}
          width={400}
          height={200}
          className="w-full h-40 object-cover"
        />
      </motion.div>

      <GroupSavingsCard data={data} />

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
            <p className="font-medium text-[#ff6b00]">Fund your wallet now</p>
            <p className="text-sm text-gray-600">
              You have insufficient funds for this goal
            </p>
          </div>
        </div>
      </motion.div>

      {/* Group Info */}
      <motion.div variants={item} className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Start Date</p>
          <p className="font-medium">{groupData.startDate}</p>
        </div>
        {/* <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">End Date</p>
          <p className="font-medium">{groupData.endDate}</p>
        </div> */}
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Saving Frequency</p>
          <p className="font-medium">{groupData.savingFrequency}</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Payout interval</p>
          <p className="font-medium">{groupData.daysLeft} days</p>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Group Type</p>
          <p className="font-medium">{groupData.groupType}</p>
        </div>
        <Link href={`/savings/ajo/${id}/members`}>
          <div className="bg-white rounded-xl p-4 h-full flex flex-col justify-between">
            <p className="text-sm text-gray-500 mb-1">Group Members</p>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {Array.from({ length: groupData.memberCount }).map((_, idx) => (
                  <Avatar number={idx + 1} size={24} key={idx} />
                ))}
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-1">+{groupData.memberCount}</span>
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
            <p className="font-medium">{groupData.collectionDate}</p>
          </div>
        </div>
      </motion.div>

      {/* Recent Activities */}
      <motion.div variants={item} className="mb-20">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Recent Activities</h2>
          <button className="text-[#ff6b00] text-sm font-medium flex items-center">
            See all <ChevronRight size={16} />
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center">
          <p className="text-gray-500">Coming soon</p>
        </div>
      </motion.div>
    </Container>
  );
}
