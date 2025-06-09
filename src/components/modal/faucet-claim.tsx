"use client";

import type React from "react";
import { useState } from "react";
import { Droplets, CheckCircle, AlertCircle, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/hooks/useSession";
import query from "@/lib/fetch";
import { cn } from "@/lib/utils";
import USDC from "@/assets/coins/usdc.png";
import SOL from "@/assets/coins/solana.png";
import Refresh from "@/assets/svgs/refresh.svg";
import Image from "next/image";
import { useModal } from "@/providers/modal-provider";
import useFaucetBalance from "@/hooks/blockchain/useFaucet";
import { claimSOL, claimUSDC } from "@/actions/faucet";
import { FormattedBalance } from "../savings-and-wallet/card";
import { useTransactionToast } from "@/hooks/use-transaction-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const USDCIcon = ({ cName }: { cName?: string }) => (
  <div className={cn("w-10 h-10 relative rounded-full", cName)}>
    <Image src={USDC} alt="USD Coin" className="object-contain" fill />
  </div>
);

const SOLIcon = ({ cName }: { cName?: string }) => (
  <div className={cn("w-10 h-10 relative rounded-full", cName)}>
    <Image src={SOL} alt="Solana Coin" className="object-contain" fill />
  </div>
);

interface Claim {
  claimedUSDC: boolean;
  claimedSOL: boolean;
}

function FaucetBalance() {
  const { data, isLoading, refetch } = useFaucetBalance();
  const [isBalanceCollapsed, setIsBalanceCollapsed] = useState(true);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setIsBalanceCollapsed(!isBalanceCollapsed)}
          className="flex items-center gap-2 font-semibold text-gray-900 hover:text-[#ff6b00] transition-colors"
        >
          <h3>Faucet Balance</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isBalanceCollapsed ? "-rotate-90" : ""}`}
          />
        </button>
        {!isBalanceCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading}
            className="text-[#ff6b00] hover:text-[#e55a00] p-1"
          >
            <Refresh className={isLoading ? "animate-spin" : ""} />
          </Button>
        )}
      </div>
      {!isBalanceCollapsed && (
        <>
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin w-4 h-4 border-2 border-[#ff6b00] border-t-transparent rounded-full"></div>
            </div>
          ) : data ? (
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 py-1">
                <CardContent className="p-3 text-center flex items-center flex-col">
                  <SOLIcon cName="w-8 h-8" />
                  <p className="text-base font-medium text-gray-900">
                    <FormattedBalance
                      amount={data.solbalance}
                      cName="text-xs"
                    />{" "}
                    SOL
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 py-1">
                <CardContent className="p-3 text-center flex items-center flex-col">
                  <USDCIcon cName="w-8 h-8" />
                  <p className="text-base font-medium text-gray-900">
                    <FormattedBalance
                      amount={data.usdcbalance}
                      cName="text-xs"
                    />{" "}
                    USDC
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <p className="text-center text-sm text-gray-500">
              Unable to load balance
            </p>
          )}
        </>
      )}
    </div>
  );
}

export const FaucetModal = () => {
  const { session } = useSession();
  const { hideModal } = useModal();
  const transactionToast = useTransactionToast();
  const queryClient = useQueryClient();
  const [, showFaucetGiftIcon] = useLocalStorage("faucet", true);

  const [selectedTokens, setSelectedTokens] = useState<{
    usdc: boolean;
    sol: boolean;
  }>({
    usdc: false,
    sol: false,
  });
  const handleTokenSelection = (token: "usdc" | "sol", checked: boolean) => {
    setSelectedTokens((prev) => ({
      ...prev,
      [token]: checked,
    }));
  };

  const { data, isLoading } = useQuery({
    queryKey: ["faucet", session],
    queryFn: async () => query.get<Claim>("faucet"),
    select: (data) => {
      if (data.error) hideModal();
      return data.data;
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["faucet", selectedTokens.sol, selectedTokens.usdc],
    mutationFn: async (txHashes: [string | false, string | false]) =>
      query.post("faucet", {
        body: {
          claimedUSDC: Boolean(txHashes[1]),
          claimedSOL: Boolean(txHashes[0]),
        },
      }),
    onSuccess: (response, txHashes) => {
      toast.success(response.message);
      const [solHash, usdcHash] = txHashes;
      if (solHash) transactionToast(solHash);
      if (usdcHash) transactionToast(usdcHash);
    },
  });
  const [claiming, setClaiming] = useState(false);

  const handleClaim = async () => {
    const { sol, usdc } = selectedTokens;
    if (!usdc && !sol) {
      toast.error("Please select at least one token to claim");
      return;
    }
    const to = session!;
    try {
      setClaiming(true);
      const hashes = await Promise.all([
        sol && claimSOL(to, 0.01),
        usdc && claimUSDC(to, 1000),
      ]);
      await mutateAsync(hashes);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["faucet", session] }),
        queryClient.invalidateQueries({ queryKey: ["usdcBalance", to] }),
      ]);

      hideModal();
    } catch (error) {
      console.error("Error claiming tokens:", error);
      toast.error("Failed to claim tokens");
    } finally {
      setClaiming(false);
      showFaucetGiftIcon(false);
      toast.info(
        "Faucet can always be accessed from the Top up button of your Wallet and Savings card!"
      );
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-[#ff6b00] to-[#ff8533] rounded-full flex items-center justify-center mx-auto mb-4">
          <Droplets className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          KooPaa Solana Faucet
        </h2>
        <p className="text-gray-500 text-sm">
          Claim free tokens to get started on KooPaa devnet app
        </p>
      </div>
      <FaucetBalance />
      {/*  */}
      {isLoading ? (
        <div className="p-6 text-center">
          <div className="animate-spin w-6 h-6 border-2 border-[#ff6b00] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Checking claim status...</p>
        </div>
      ) : data && data.claimedSOL && data.claimedUSDC ? (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-green-800 mb-2">
              Already Claimed!
            </h3>
            <p className="text-green-600 text-sm">
              You have already claimed tokens from this faucet. Each wallet can
              only claim once.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Select tokens to claim:
            </h3>

            <CardContent
              className={cn(
                "p-4 cursor-pointer transition-all rounded-xl shadow-sm",
                selectedTokens.usdc
                  ? "ring-1 ring-[#ff6600] bg-orange-50"
                  : "hover:bg-gray-50"
              )}
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="usdc"
                  checked={selectedTokens.usdc}
                  onCheckedChange={(checked) =>
                    handleTokenSelection("usdc", checked as boolean)
                  }
                  disabled={data?.claimedUSDC}
                />
                <div className="flex items-center space-x-3 flex-1">
                  <USDCIcon />
                  <div>
                    <label
                      htmlFor="usdc"
                      className="font-medium text-gray-900 cursor-pointer"
                    >
                      1000 USDC
                    </label>
                    <p className="text-sm text-gray-500">USD Coin on Solana</p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardContent
              className={cn(
                "p-4 cursor-pointer transition-all rounded-xl shadow-sm",
                selectedTokens.sol
                  ? "ring-1 ring-[#ff6600] bg-orange-50"
                  : "hover:bg-gray-50"
              )}
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="sol"
                  checked={selectedTokens.sol}
                  onCheckedChange={(checked) =>
                    handleTokenSelection("sol", checked as boolean)
                  }
                  disabled={data?.claimedSOL}
                />
                <div className="flex items-center space-x-3 flex-1">
                  <SOLIcon />
                  <div>
                    <label
                      htmlFor="sol"
                      className="font-medium text-gray-900 cursor-pointer"
                    >
                      0.01 SOL
                    </label>
                    <p className="text-sm text-gray-500">Native Solana token</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>

          <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg text-amber-700 text-sm mb-4">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <p>
              Each wallet address can only claim either tokens, once. Make sure
              your wallet is connected to receive the tokens.
            </p>
          </div>

          <Button
            onClick={handleClaim}
            disabled={!session || (!selectedTokens.usdc && !selectedTokens.sol)}
            loading={isLoading || isPending || claiming}
            className="w-full bg-[#ff6b00] hover:bg-[#e55a00] text-white py-3 text-base font-semibold"
          >
            {`Claim ${selectedTokens.usdc ? "1000 USDC" : ""}${selectedTokens.usdc && selectedTokens.sol ? " + " : ""}${selectedTokens.sol ? "0.01 SOL" : ""}`}
          </Button>
        </>
      )}
    </div>
  );
};
