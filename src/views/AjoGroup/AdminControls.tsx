// "use client";

// import type React from "react";

// import { Button } from "./ui/button";
// import { Users, UserCheck } from "lucide-react";
// import { useModal } from "@/providers/modal-provider";
// import { AdminApprovalModal } from "./modal/admin-approval-modal";
// import { useWaitingRoom } from "@/hooks/useWaitingRoom";
// import { useEffect } from "react";
// import { Badge } from "./ui/badge";

// interface AdminControlsProps {
//   groupId: string;
//   groupName: string;
//   isAdmin: boolean;
// }

// export const AdminControls: React.FC<AdminControlsProps> = ({ groupId, groupName, isAdmin }) => {
//   const { showModal } = useModal();
//   const { waitingRoomUsers, isLoading, approveUser, rejectUser, addUserManually, refreshWaitingRoom } =
//     useWaitingRoom(groupId);

//   useEffect(() => {
//     if (isAdmin) {
//       refreshWaitingRoom();
//     }
//   }, [isAdmin, refreshWaitingRoom]);

//   const openApprovalModal = () => {
//     showModal(
//       <AdminApprovalModal
//         groupName={groupName}
//         groupId={groupId}
//         waitingRoomUsers={waitingRoomUsers}
//         onApprove={approveUser}
//         onReject={rejectUser}
//         onManualAdd={addUserManually}
//       />,
//       {
//         position: "center",
//         showCloseButton: true,
//         closeOnClickOutside: false,
//       }
//     );
//   };

//   if (!isAdmin) return null;

//   return (
//     <div className="bg-card border border-border rounded-lg p-4 mb-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="bg-[#ff6b00]/10 rounded-full p-2">
//             <UserCheck className="w-5 h-5 text-[#ff6b00]" />
//           </div>
//           <div>
//             <h3 className="font-medium text-foreground">Admin Controls</h3>
//             <p className="text-sm text-muted-foreground">Manage join requests and group members</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           {waitingRoomUsers.length > 0 && (
//             <Badge variant="secondary" className="bg-[#ff6b00]/10 text-[#ff6b00]">
//               {waitingRoomUsers.length} pending
//             </Badge>
//           )}
//           <Button onClick={openApprovalModal} disabled={isLoading} size="sm" className="flex items-center gap-2">
//             <Users className="w-4 h-4" />
//             Manage Requests
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };
