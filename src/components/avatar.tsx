"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

import Avatar1 from "@/assets/avatars/1.png";
import Avatar2 from "@/assets/avatars/2.png";
import Avatar3 from "@/assets/avatars/3.png";
import Avatar4 from "@/assets/avatars/4.png";
import Avatar5 from "@/assets/avatars/5.png";
import Avatar6 from "@/assets/avatars/6.png";
import Avatar7 from "@/assets/avatars/7.png";
import Avatar8 from "@/assets/avatars/8.png";
import Avatar9 from "@/assets/avatars/9.png";
import useParticipant from "@/hooks/db/useParticipant";
import { useState } from "react";
import { useModal } from "@/providers/modal-provider";
import { Button } from "./ui/button";

const avatarImage: Record<number, StaticImageData> = {
  1: Avatar1,
  2: Avatar2,
  3: Avatar3,
  4: Avatar4,
  5: Avatar5,
  6: Avatar6,
  7: Avatar7,
  8: Avatar8,
  9: Avatar9,
};

const avatarColors: Record<number, string> = {
  1: "#71927C",
  2: "#FFB1AB",
  3: "#D4FFAB",
  4: "#D2ABFF",
  5: "#534DFF",
  6: "#DCDDDA",
  7: "#FFE95A",
  8: "#FB9A2C",
  9: "#ABFFFC",
};

const Avatar = ({ number = 1, size = 40 }) => {
  const src = avatarImage[number] || Avatar1;
  const bgColor = avatarColors[number] || "#ddd";

  return (
    <div
      className="rounded-full overflow-hidden flex items-center justify-center border-2 border-[#FCFCFC]"
      style={{ backgroundColor: bgColor, width: size, height: size }}
    >
      <Image src={src} alt={`Avatar ${number}`} />
    </div>
  );
};

interface AvatarPickerProps {
  onSelect: (n: number) => Promise<void>;
  currentAvatar?: number;
}

const AvatarPicker = ({ onSelect, currentAvatar = 1 }: AvatarPickerProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
  const [loading, setLoading] = useState(false);
  const { hideModal } = useModal();

  const handleAvatarSelect = (avatarNumber: number) => {
    setSelectedAvatar(avatarNumber);
  };

  const confirmSelectedAvatar = async () => {
    setLoading(true);
    await onSelect(selectedAvatar);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 w-full max-w-sm mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Choose Avatar
        </h2>
        <p className="text-sm text-gray-500">Select your profile picture</p>
      </div>

      {/* Large Preview Avatar */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 p-1">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              <Avatar number={selectedAvatar} size={88} />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Available Avatars
        </h3>
        <div className="flex gap-3 overflow-x-auto py-2 scrollbar-hide">
          {Array.from({ length: 9 }, (_, i) => {
            const avatarNumber = i + 1;
            const isSelected = selectedAvatar === avatarNumber;

            return (
              <button
                key={avatarNumber}
                onClick={() => handleAvatarSelect(avatarNumber)}
                className={`flex-shrink-0 w-14 h-14 rounded-full p-0.5 transition-all duration-200 ${
                  isSelected
                    ? "bg-gradient-to-br from-blue-400 to-purple-400 scale-105"
                    : "bg-gray-200 hover:bg-gray-300 hover:scale-105"
                }`}
              >
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <Avatar number={avatarNumber} size={52} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors cursor-pointer"
          onClick={hideModal}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors cursor-pointer"
          loading={loading}
          onClick={confirmSelectedAvatar}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

const randomPos = () => ({
  top: `${Math.random() * 80}%`,
  left: `${Math.random() * 80}%`,
});

export const AvatarGlob = () => {
  return (
    <div className="relative w-full h-96 bg-gray-100 overflow-hidden rounded-xl">
      {Array.from({ length: 9 }, (_, i) => {
        const style = randomPos();
        return (
          <motion.div
            key={i + 1}
            className="absolute"
            style={style}
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 2,
              ease: "easeInOut",
            }}
          >
            <Avatar number={i + 1} />
          </motion.div>
        );
      })}
    </div>
  );
};

const GetAvatar = ({
  address,
  size = 40,
}: {
  address: string;
  size: number;
}) => {
  const { data } = useParticipant(address);
  return <Avatar number={data?.data?.avatar} size={size} />;
};

export { Avatar, AvatarPicker, GetAvatar };
