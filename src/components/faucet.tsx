"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/providers/modal-provider";
import { FaucetModal } from "./modal/faucet-claim";
import Gift from "@/assets/svgs/gift.svg";
import { X } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Faucet() {
  const { showModal } = useModal();
  const [isVisible, setIsVisible] = useLocalStorage("faucet", true);

  const openFaucetModal = () => {
    showModal(<FaucetModal />, { position: "center" });
  };

  const shakeAnimation = {
    x: [0, -2, 2, -2, 2, 0],
    transition: {
      duration: 0.5,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 2,
      ease: "easeInOut",
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-6 items-center mx-auto max-w-[400px] w-full"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            delay: 0.9,
            stiffness: 500,
            damping: 30,
          }}
        >
          <div className="max-w-[400px] bg-transparent absolute bottom-24 right-4">
            <div className="relative group">
              <button
                onClick={() => setIsVisible(false)}
                className="absolute -top-2 -right-2 text-black rounded-full p-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 z-10"
                aria-label="Hide gift icon"
              >
                <X size={15} />
              </button>
              <motion.div animate={shakeAnimation} className="cursor-pointer">
                <Gift onClick={openFaucetModal} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
