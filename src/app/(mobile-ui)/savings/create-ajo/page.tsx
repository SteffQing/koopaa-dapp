"use client";

import { motion } from "framer-motion";
import Container from "@/components/container";
import NavHeader from "@/views/Navigation/nav-header";
import CreateAjoGroupForm from "./form";
import type { CreateAjoGroupFormValues } from "./schema";
import useCreateAjoGroup from "@/hooks/blockchain/write/useCreateAjoGroup";

export default function CreateAjoGroupPage() {
  const { createAjoGroup, isPending, loading } = useCreateAjoGroup();

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const handleSubmit = async (data: CreateAjoGroupFormValues) => {
    await createAjoGroup(data);
  };

  return (
    <Container>
      <NavHeader path="/savings" header="Ajo Savings" />

      <motion.h1
        variants={item}
        className="text-lg font-medium text-[#ff6600] mb-1"
      >
        Let&#39;s create a public ajo group 😉
      </motion.h1>
      <motion.p
        variants={item}
        className="text-[#767676] font-normal text-[13px] mb-6"
      >
        Kindly enter group details below
      </motion.p>

      <CreateAjoGroupForm
        onSubmit={handleSubmit}
        loading={isPending || loading}
      />
    </Container>
  );
}
