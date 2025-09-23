// "use client";

// import type React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useModal } from "@/providers/modal-provider";
// import { Avatar } from "../avatar";
// import { Button } from "../ui/button";
// import { Check, X, UserPlus, Search } from "lucide-react";
// import { useState } from "react";
// import { Input } from "../ui/input";

// interface WaitingRoomUser {
//   id: string;
//   username: string;
//   walletAddress: string;
//   avatar: number;
//   joinedAt: Date;
//   invitedBy?: string;
// }

// interface AdminApprovalModalProps {
//   groupName: string;
//   groupId: string;
//   waitingRoomUsers: WaitingRoomUser[];
//   onApprove: (userId: string) => Promise<void>;
//   onReject: (userId: string) => Promise<void>;
//   onManualAdd: (walletAddressOrUsername: string) => Promise<void>;
// }

// const contentVariants = {
//   hidden: { opacity: 0, scale: 0.95 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       duration: 0.3,
//       ease: "easeOut",
//       staggerChildren: 0.05,
//     },
//   },
//   exit: {
//     opacity: 0,
//     scale: 0.95,
//     transition: { duration: 0.2 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.3, ease: "easeOut" },
//   },
// };

// const UserCard: React.FC<{
//   user: WaitingRoomUser;
//   onApprove: () => void;
//   onReject: () => void;
//   isProcessing: boolean;
// }> = ({ user, onApprove, onReject, isProcessing }) => {
//   return (
//     <motion.div
//       variants={itemVariants}
//       className="bg-card border border-border rounded-lg p-4 space-y-3"
//       whileHover={{ scale: 1.01 }}
//       transition={{ duration: 0.2 }}
//     >
//       <div className="flex items-center gap-3">
//         <Avatar size={48} number={user.avatar} />
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2">
//             <p className="font-medium text-foreground truncate">@{user.username}</p>
//             <Badge variant="secondary" className="text-xs">
//               {new Date(user.joinedAt).toLocaleDateString()}
//             </Badge>
//           </div>
//           <p className="text-sm text-muted-foreground truncate">
//             {user.walletAddress.slice(0, 8)}...{user.walletAddress.slice(-6)}
//           </p>
//           {user.invitedBy && <p className="text-xs text-muted-foreground">Invited by @{user.invitedBy}</p>}
//         </div>
//       </div>

//       <div className="flex gap-2">
//         <Button
//           size="sm"
//           onClick={onApprove}
//           disabled={isProcessing}
//           className="flex-1 bg-green-600 hover:bg-green-700 text-white"
//         >
//           <Check className="w-4 h-4 mr-1" />
//           Approve
//         </Button>
//         <Button size="sm" variant="destructive" onClick={onReject} disabled={isProcessing} className="flex-1">
//           <X className="w-4 h-4 mr-1" />
//           Reject
//         </Button>
//       </div>
//     </motion.div>
//   );
// };

// export const AdminApprovalModal: React.FC<AdminApprovalModalProps> = ({
//   groupName,
//   groupId,
//   waitingRoomUsers,
//   onApprove,
//   onReject,
//   onManualAdd,
// }) => {
//   const { hideModal } = useModal();
//   const [processingUsers, setProcessingUsers] = useState<Set<string>>(new Set());
//   const [manualAddInput, setManualAddInput] = useState("");
//   const [isManualAdding, setIsManualAdding] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredUsers = waitingRoomUsers.filter(
//     (user) =>
//       user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.walletAddress.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleApprove = async (userId: string) => {
//     setProcessingUsers((prev) => new Set(prev).add(userId));
//     try {
//       await onApprove(userId);
//     } finally {
//       setProcessingUsers((prev) => {
//         const newSet = new Set(prev);
//         newSet.delete(userId);
//         return newSet;
//       });
//     }
//   };

//   const handleReject = async (userId: string) => {
//     setProcessingUsers((prev) => new Set(prev).add(userId));
//     try {
//       await onReject(userId);
//     } finally {
//       setProcessingUsers((prev) => {
//         const newSet = new Set(prev);
//         newSet.delete(userId);
//         return newSet;
//       });
//     }
//   };

//   const handleManualAdd = async () => {
//     if (!manualAddInput.trim()) return;

//     setIsManualAdding(true);
//     try {
//       await onManualAdd(manualAddInput.trim());
//       setManualAddInput("");
//     } finally {
//       setIsManualAdding(false);
//     }
//   };

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         className="p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
//         variants={contentVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//       >
//         {/* Header */}
//         <motion.div variants={itemVariants} className="mb-6">
//           <h2 className="text-xl font-semibold text-foreground mb-2">Manage Join Requests</h2>
//           <p className="text-sm text-muted-foreground">
//             Review and approve users waiting to join <span className="font-medium text-[#ff6b00]">{groupName}</span>
//           </p>
//         </motion.div>

//         {/* Manual Add Section */}
//         <motion.div variants={itemVariants} className="mb-6 p-4 bg-muted/50 rounded-lg">
//           <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
//             <UserPlus className="w-4 h-4" />
//             Add User Manually
//           </h3>
//           <div className="flex gap-2">
//             <Input
//               placeholder="Enter wallet address or username"
//               value={manualAddInput}
//               onChange={(e) => setManualAddInput(e.target.value)}
//               className="flex-1"
//             />
//             <Button
//               onClick={handleManualAdd}
//               disabled={!manualAddInput.trim() || isManualAdding}
//               loading={isManualAdding}
//             >
//               Add
//             </Button>
//           </div>
//         </motion.div>

//         {/* Search */}
//         {waitingRoomUsers.length > 0 && (
//           <motion.div variants={itemVariants} className="mb-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search users..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </motion.div>
//         )}

//         {/* Waiting Room Users */}
//         <div className="flex-1 overflow-y-auto">
//           {filteredUsers.length === 0 ? (
//             <motion.div variants={itemVariants} className="text-center py-12 text-muted-foreground">
//               {waitingRoomUsers.length === 0 ? (
//                 <>
//                   <UserPlus className="w-12 h-12 mx-auto mb-4 opacity-50" />
//                   <p>No users in the waiting room</p>
//                   <p className="text-sm mt-1">Users will appear here when they request to join</p>
//                 </>
//               ) : (
//                 <p>No users match your search</p>
//               )}
//             </motion.div>
//           ) : (
//             <motion.div variants={itemVariants} className="space-y-3">
//               {filteredUsers.map((user) => (
//                 <UserCard
//                   key={user.id}
//                   user={user}
//                   onApprove={() => handleApprove(user.id)}
//                   onReject={() => handleReject(user.id)}
//                   isProcessing={processingUsers.has(user.id)}
//                 />
//               ))}
//             </motion.div>
//           )}
//         </div>

//         {/* Footer */}
//         <motion.div variants={itemVariants} className="mt-6 pt-4 border-t border-border">
//           <Button variant="outline" onClick={hideModal} className="w-full bg-transparent">
//             Close
//           </Button>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };
