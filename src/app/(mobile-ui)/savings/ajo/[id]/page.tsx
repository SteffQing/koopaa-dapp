"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { use, useEffect } from "react";
import NavHeader from "@/views/Navigation/nav-header";
import Container from "@/components/container";
import useGetAjoGroup from "@/hooks/blockchain/read/useFetchAjoGroup";
import AjoGroup from "@/views/AjoGroup";
import AjoError from "@/components/error";
import { useModal } from "@/providers/modal-provider";
import { EnhancedInvitationModal } from "@/components/modal/enhanced-invite";
import { useSession } from "@/hooks/useSession";
import { useWallet } from "@solana/wallet-adapter-react";
import { arrayContains } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ inviter?: string }>;
};

export default function AjoGroupPage({ params, searchParams }: Props) {
  const { id } = use(params);
  const { inviter } = use(searchParams);
  const { data, isLoading, error, refetch } = useGetAjoGroup(id);
  const { session } = useSession();
  const { publicKey } = useWallet();

  const { showModal } = useModal();

  const openInvitationModal = (name: string) => {
    if (!inviter) return;
    showModal(<EnhancedInvitationModal inviter={inviter} groupName={name} id={id} />, {
      position: "center",
      showCloseButton: true,
      closeOnClickOutside: false,
    });
  };

  useEffect(() => {
    if (data && session) {
      const { name, participants, waitingRoom } = data;
      if (
        arrayContains(waitingRoom, session) ||
        arrayContains(
          participants.map((p) => p.participant),
          session
        )
      )
        return;
      openInvitationModal(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, session, publicKey, inviter]);

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Container>
      <NavHeader path="/savings" header={data?.name ?? "Ajo Group"} />

      <motion.div variants={item} className="mb-4 rounded-xl overflow-hidden">
        <Image
          src={`/group-cover/${data?.cover_photo ?? 0}.png`}
          alt={`Cover photo for the ${data?.name} Ajo group`}
          width={400}
          height={200}
          className="w-full h-40 object-cover"
        />
      </motion.div>
      {error ? (
        <AjoError onRetry={refetch} message={error.message} />
      ) : (
        <AjoGroup id={id} data={data} loading={isLoading} />
      )}
    </Container>
  );
}
