"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { use } from "react";
import NavHeader from "@/views/Navigation/nav-header";
import Container from "@/components/container";
import useGetAjoGroup from "@/hooks/blockchain/read/useFetchAjoGroup";
import AjoGroup from "@/views/AjoGroup";

export default function AjoGroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, error } = useGetAjoGroup(id);

  console.log(isLoading, error);

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

      <AjoGroup id={id} data={data} loading={isLoading} />
    </Container>
  );
}
