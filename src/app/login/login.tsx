"use client";

import { ConnectWalletModal } from "@/components/modal/connect-wallet";
import { Button } from "@/components/ui/button";
import query from "@/lib/fetch";
import { useModal } from "@/providers/modal-provider";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const LoginHandler = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { showModal, isOpen, hideModal } = useModal();
  const { publicKey } = useWallet();

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const hasCreatedSession = useRef(false);
  const handleConnectWallet = () => showModal(<ConnectWalletModal />, { position: "center" });

  const createUserSession = async () => {
    if (!publicKey) return;
    setIsConnecting(true);
    try {
      const { error, message } = await query.post("auth", {
        body: { address: publicKey.toBase58() },
      });

      if (error) {
        toast.error(error);
        throw new Error(error);
      }

      toast.success(message);
      router.replace(redirectPath);
    } catch (error) {
      console.error("Session creation error:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    if (!publicKey || hasCreatedSession.current) return;
    hasCreatedSession.current = true;
    if (isOpen) hideModal();
    createUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  return (
    <Button onClick={handleConnectWallet} disabled={isConnecting} className="w-full">
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};

export default LoginHandler;
