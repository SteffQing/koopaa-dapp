import RecentActivities from "@/components/activities";
import { useGetUserInAjoGroupActivities } from "@/hooks/db/useActivities";

interface Props {
  pda: string;
}
export default function UserGroupActivities({ pda }: Props) {
  const { activities, loading } = useGetUserInAjoGroupActivities(pda);
  return <RecentActivities data={activities} loading={loading} />;
}
