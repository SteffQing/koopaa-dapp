"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { use, useEffect } from "react";
import NavHeader from "@/views/Navigation/nav-header";
import Container from "@/components/container";
import { useModal } from "@/providers/modal-provider";
import useGetAjoGroup from "@/hooks/blockchain/read/useFetchAjoGroup";
import AjoGroup from "@/views/AjoGroup";
import { useRouter } from "next/navigation";
import { EnhancedInvitationModal } from "@/components/modal/enhanced-invite";
import { useSession } from "@/hooks/useSession";
import { useWallet } from "@solana/wallet-adapter-react";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ inviter: string }>;
};

export default function JoinAjoGroupPage({ params, searchParams }: Props) {
  const { id } = use(params);
  const { inviter } = use(searchParams);
  const router = useRouter();
  const { data, isLoading } = useGetAjoGroup(id);
  const { session } = useSession();
  const { publicKey } = useWallet();

  const { showModal, hideModal } = useModal();

  const openInvitationModal = (name: string, fee: number) => {
    showModal(
      <EnhancedInvitationModal
        inviter={inviter}
        groupName={name}
        id={id}
        fee={fee}
      />,
      {
        position: "center",
        showCloseButton: false,
        closeOnClickOutside: false,
      }
    );
  };

  useEffect(() => {
    if (!inviter) {
      hideModal();
      router.replace("/");
      return;
    }

    if (data) {
      if (data.participants.some((p) => p.participant === session)) {
        hideModal();
        router.replace("/");
        return;
      }
      openInvitationModal(data.name, data.securityDeposit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, session, publicKey]);

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

      <AjoGroup id={id} data={data} loading={isLoading} disabled />
    </Container>
  );
}
