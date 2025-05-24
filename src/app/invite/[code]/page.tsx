import redis from "@/lib/redis";
import { redirect } from "next/navigation";

export default async function ShortURLPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const fullUrl = await redis.get<string>(code);

  if (!fullUrl) {
    redirect("/");
  }

  redirect(fullUrl);
}
