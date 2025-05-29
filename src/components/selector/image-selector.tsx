"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageSelectorProps {
  images: string[];
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function ImageSelector({
  images,
  value,
  onChange,
  className,
}: ImageSelectorProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      {images.map((image, index) => (
        <motion.div
          key={index + 1}
          className={cn(
            "relative aspect-video rounded-lg overflow-hidden border-2 cursor-pointer",
            value === index + 1 ? "border-[#ff6600]" : "border-transparent"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange(index + 1)}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`Cover option ${index + 1}`}
            fill
            className="object-cover"
          />
          {value === index + 1 && (
            <div className="absolute inset-0 bg-[#ff6600]/10 flex items-center justify-center">
              <div className="w-6 h-6 bg-[#ff6600] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
