"use client";

import type React from "react";
import { Copy, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useWallet } from "@solana/wallet-adapter-react";

export const FundWalletModal: React.FC = () => {
  const { publicKey } = useWallet();

  const copyWalletAddress = () => {
    if (!publicKey) toast.error("No wallet seems to be connected");
    else {
      navigator.clipboard.writeText(publicKey.toBase58());
      toast.success("Wallet address copied to clipboard");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-center mb-2">
        Fund your wallet
      </h2>
      <p className="text-gray-500 text-center text-sm mb-6">
        Use any convenient method to funding your wallet below
      </p>

      <div className="mb-6">
        <h3 className="font-medium mb-1">USDC Deposit</h3>
        <p className="text-gray-500 text-sm mb-4">
          Deposit USDC to your wallet address from a DEX or CEX
        </p>

        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">
            Wallet address
          </label>
          <div className="flex items-center">
            <input
              type="text"
              value={publicKey?.toBase58()}
              readOnly
              className="flex-1 p-3 border border-gray-200 rounded-l-lg bg-gray-50 text-sm"
            />
            <button
              onClick={copyWalletAddress}
              className="bg-[#ff6b00] text-white p-3 rounded-r-lg cursor-pointer"
              aria-label="Copy wallet address"
            >
              <Copy size={20} />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">Network</label>
          <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mr-2">
              <span className="text-white text-xs">S</span>
            </div>
            <span className="font-medium">SOLANA(SOL)</span>
          </div>
        </div>

        <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg text-red-600 text-sm mb-6">
          <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
          <p>
            Make sure the network is SOLANA(SOL), using other network will
            result to lost of funds
          </p>
        </div>
      </div>
    </div>
  );
};
