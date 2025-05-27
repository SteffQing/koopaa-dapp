"use client";

import { ConnectWalletModal } from "@/components/modal/connect-wallet";
import { Button } from "@/components/ui/button";
import query from "@/lib/fetch";
import { useModal } from "@/providers/modal-provider";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LoginHandler = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const { showModal, isOpen, hideModal } = useModal();
  const { publicKey } = useWallet();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const handleConnectWallet = () =>
    showModal(<ConnectWalletModal />, { position: "center" });

  const createUserSession = async () => {
    if (!publicKey || isCreatingSession) return;

    setIsCreatingSession(true);
    try {
      const { error, message } = await query.post("auth", {
        body: { address: publicKey.toBase58() },
      });

      if (error) {
        toast.error(error);
        setIsConnecting(false);
        setIsCreatingSession(false);
        throw new Error(error);
      }

      toast.success(message);
      router.replace(redirectPath);
    } catch (error) {
      console.error("Session creation error:", error);
    }
  };

  useEffect(() => {
    if (!publicKey) {
      setIsConnecting(isOpen);
      return;
    }

    if (isOpen) {
      hideModal();
    }

    if (!isCreatingSession) {
      createUserSession();
    }

    setIsConnecting(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, isOpen]);

  return (
    <Button
      onClick={handleConnectWallet}
      disabled={isConnecting || isCreatingSession}
      className="w-full"
    >
      {isConnecting
        ? "Connecting..."
        : isCreatingSession
          ? "Setting up..."
          : "Connect Wallet"}
    </Button>
  );
};

export default LoginHandler;
