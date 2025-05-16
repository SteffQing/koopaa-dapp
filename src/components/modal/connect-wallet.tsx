"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from "@solana/wallet-adapter-react"
import Image from "next/image"
import { motion } from "framer-motion"

export const ConnectWalletModal = () => {
  const { select, wallets, publicKey, disconnect } = useWallet()

  if (publicKey) {
    return (
      <div className="p-6 flex flex-col gap-4 items-center">
        <h2 className="text-2xl font-semibold text-center mb-2">Wallet Connected</h2>
        <div className="bg-gray-100 p-3 rounded-lg w-full overflow-hidden text-center">
          <p className="text-sm font-mono truncate">{publicKey.toBase58()}</p>
        </div>
        <Button onClick={disconnect} variant="destructive" className="w-full mt-4">
          Disconnect Wallet
        </Button>
      </div>
    )
  }

  const installedWallets = wallets.filter((wallet) => wallet.readyState === "Installed")

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center mb-2">Connect a Wallet</h2>
      <p className="text-gray-500 text-center mb-8">Get started by connecting your preferred wallet below.</p>

      <div className="space-y-4 mb-8">
        {installedWallets.length > 0 ? (
          installedWallets.map((wallet) => (
            <motion.button
              key={wallet.adapter.name}
              className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer"
              whileHover={{ y: -2, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}
              whileTap={{ y: 0 }}
              onClick={() => select(wallet.adapter.name)}
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                  {wallet.adapter.icon && (
                    <Image
                      src={wallet.adapter.icon || "/placeholder.svg"}
                      alt={wallet.adapter.name}
                      width={32}
                      height={32}
                    />
                  )}
                </div>
                <span className="font-medium">Connect with {wallet.adapter.name}</span>
              </div>
            </motion.button>
          ))
        ) : (
          <section>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-gray-500 mb-2">No wallets found</p>
            <p className="text-sm text-gray-400">Please install a Solana wallet to continue</p>
          </div>
            <motion.button
        className="w-full border border-gray-300 rounded-xl py-4 font-medium"
        whileHover={{ y: -2, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}
        whileTap={{ y: 0 }}
        onClick={() => {
          window.open("https://solana.com/ecosystem/wallets", "_blank")
        }}
      >
        Get Wallet
      </motion.button>
          </section>
        )}
      </div>

      <div className="mb-8">
        <h3 className="font-medium mb-2">What is a wallet?</h3>
        <p className="text-gray-500 text-sm">
          A wallet is a digital tool that stores and manages your private keys, allowing you to access and control your
          cryptocurrency and other assets on the Solana blockchain. It&#39;s a crucial component for interacting with
          the Solana ecosystem, including decentralized applications (dApps) and managing your digital assets.
        </p>
      </div>

      
    </div>
  )
}
