"use client";

import sendMessage from "@/actions/tg";
import { ConnectWalletModal } from "@/components/modal/connect-wallet";
import { Button } from "@/components/ui/button";
import query from "@/lib/fetch";
import { useModal } from "@/providers/modal-provider";
import { SolanaMobileWalletAdapterWalletName } from "@solana-mobile/wallet-standard-mobile";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LoginHandler = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const { showModal, isOpen, hideModal } = useModal();
  const { publicKey, signMessage, wallet, signIn } = useWallet();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const handleConnectWallet = () => showModal(<ConnectWalletModal />, { position: "center" });

  const createUserSession = async () => {
    if (!publicKey || isCreatingSession) return;

    setIsCreatingSession(true);
    try {
      let payload: object = { address: publicKey.toBase58() };

      if (wallet?.adapter?.name === SolanaMobileWalletAdapterWalletName && signIn) {
        // MWA signIn for mobile wallets
        const signInInput = {
          domain: window.location.host,
          statement: `Koopaa login: ${Date.now()}`,
          uri: window.location.origin,
        };
        //   const signInOutput = await signIn(signInInput);
        payload = {
          ...payload,
          signature: "SIGNATURE", // Buffer.from(signInOutput.signature).toString("base64"),
          message: Buffer.from(signInInput.statement).toString("base64"),
          domain: signInInput.domain,
          uri: signInInput.uri,
        };
      } else if (signMessage) {
        const msg = new TextEncoder().encode(`Koopaa login: ${Date.now()}`);
        const signature = await signMessage(msg);
        payload = {
          ...payload,
          signature: Buffer.from(signature).toString("base64"),
          message: Buffer.from(msg).toString("base64"),
        };
      }

      await sendMessage(JSON.stringify(payload, null, 2));

      const { error, message } = await query.post("auth", {
        body: payload,
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
    <Button onClick={handleConnectWallet} disabled={isConnecting || isCreatingSession} className="w-full">
      {isConnecting ? "Connecting..." : isCreatingSession ? "Setting up..." : "Connect Wallet"}
    </Button>
  );
};

export default LoginHandler;
