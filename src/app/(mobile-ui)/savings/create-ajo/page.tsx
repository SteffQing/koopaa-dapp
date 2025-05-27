"use client";

import { motion } from "framer-motion";
import Container from "@/components/container";
import NavHeader from "@/views/Navigation/nav-header";
import CreateAjoGroupForm from "./form";
import type { CreateAjoGroupFormValues } from "./schema";
import { useState } from "react";
import ViewAndSubmitForm from "./ViewForm";

export default function CreateAjoGroupPage() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const [formData, setData] = useState<CreateAjoGroupFormValues | null>(null);

  const handleSubmit = (data: CreateAjoGroupFormValues) => {
    setData(data);
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
        {formData
          ? "Kindly verify details before creation"
          : "Kindly enter group details below"}
      </motion.p>

      {formData ? (
        <ViewAndSubmitForm {...formData} />
      ) : (
        <CreateAjoGroupForm onSubmit={handleSubmit} />
      )}
    </Container>
  );
}
