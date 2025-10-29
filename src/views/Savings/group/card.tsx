import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { formatDate } from "@/lib/date";
import { Avatar } from "@/components/avatar";
import type { GroupAndParticipants } from "@/hooks/db/useUserGroups";
import { tagOptions } from "@/lib/static";

export default function GroupCard({
  group,
}: {
  group: GroupAndParticipants[0];
}) {
  const tag = tagOptions.find((t) => t.value === group.tag)!;
  return (
    <Link key={group.pda} href={`/savings/ajo/${group.pda}`}>
      <motion.div
        className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
        whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
        transition={{ duration: 0.2 }}
      >
        <div className="h-[150px] bg-gradient-to-r from-blue-500 to-purple-600 relative">
          <Image
            src={`/group-cover/${group.cover_photo}.png`}
            alt={group.name + " Group cover"}
            width={300}
            height={150}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 text-white">
            <h3 className="font-semibold text-lg">{group.name}</h3>
            <motion.button
              type="button"
              className="px-2 py-1 rounded-full text-sm flex items-center gap-1 bg-[#ff6600] text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{tag.icon}</span>
              <span>{tag.label}</span>
            </motion.button>
          </div>
        </div>

        <div className="p-4">
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {group.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Created
              </p>
              <p className="font-semibold text-gray-900">
                {formatDate(group.created_at)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Members
              </p>
              <p className="font-semibold text-gray-900">
                {group.participants.length}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {group.participants.slice(0, 4).map((participant) => (
                  <Avatar
                    size={32}
                    number={participant.avatar}
                    key={participant.address}
                  />
                ))}
              </div>
              {group.participants.length > 4 && (
                <span className="text-sm text-gray-500 ml-3">
                  +{group.participants.length - 4} more
                </span>
              )}
            </div>

            {/* Join indicator or status */}
            {/* <div className="text-right">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div> */}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
