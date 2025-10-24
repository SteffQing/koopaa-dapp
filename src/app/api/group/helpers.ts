import { prisma } from "@/lib/db";
import { getProgram } from "@/lib/grid/helpers";
import { AjoGroupData } from "@/hooks/blockchain/read/classes";

async function getAjoOnchain(pda: string) {
  const program = getProgram();
  const group = await program.account.ajoGroup.fetch(pda);
  return group;
}

async function getAjoOffchain(pda: string) {
  const group = await prisma.group.findUniqueOrThrow({ where: { pda } });
  return group;
}

async function getAjoGroup(id: string) {
  const [offchain, onchain] = await Promise.all([
    getAjoOffchain(id),
    getAjoOnchain(id),
  ]);

  const group = new AjoGroupData(onchain, offchain);
  return group;
}

export { getAjoGroup, getAjoOffchain, getAjoOnchain };
