"use client";

import { ConnectWalletModal } from "@/components/modal/connect-wallet";
import { Button } from "@/components/ui/button";
import query from "@/lib/fetch";
import { useModal } from "@/providers/modal-provider";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LoginHandler = () => {
  const { showModal } = useModal();
  const { publicKey, connecting, signMessage } = useWallet();
  const [isSigning, setSigning] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const handleConnectWallet = () =>
    showModal(<ConnectWalletModal />, { position: "center" });

  const createUserSession = async () => {
    if (!publicKey || !signMessage) return;
    setSigning(true);

    try {
      const msg = `Sign this message to login to KooPaa: ${new Date().toISOString()}`;
      const encodedMessage = new TextEncoder().encode(msg);
      const signature = await signMessage(encodedMessage);

      const { error, message } = await query.post("auth", {
        body: {
          address: publicKey.toBase58(),
          message: msg,
          signature: Buffer.from(signature).toString("base64"),
        },
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
      setSigning(false);
    }
  };

  // useEffect(() => {
  //   if (!publicKey) return handleConnectWallet();
  //   if (isOpen) hideModal();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [publicKey]);

  return (
    <Button
      onClick={!publicKey ? handleConnectWallet : createUserSession}
      disabled={connecting || isSigning}
      loading={connecting || isSigning}
      className="w-full"
    >
      {connecting
        ? "Connecting..."
        : publicKey
          ? "Sign Message"
          : "Connect Wallet"}
    </Button>
  );
};

export default LoginHandler;
