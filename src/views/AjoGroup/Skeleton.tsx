import {
  Eye,
  RefreshCw,
  ArrowDown,
  ChevronRight,
  Calendar,
  Share2,
} from "lucide-react";

// Individual skeleton components
function GroupSavingsCardSkeleton() {
  return (
    <div className="bg-[#e8ffcc] rounded-xl p-4 mb-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="h-5 bg-gray-300 rounded w-32"></div>
          <Eye size={18} className="text-gray-400" />
        </div>
        <div className="flex items-center gap-1 bg-white/50 hover:bg-white/80 px-2 py-1 rounded-full text-xs font-medium text-gray-700 transition-colors disabled:opacity-50">
          <Share2 size={12} /> Invite
        </div>
      </div>

      {/* Amount display */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-baseline">
          <div className="h-4 bg-gray-300 rounded w-12 mr-1"></div>
          <div className="h-8 bg-gray-300 rounded w-20"></div>
        </div>
        <div className="flex justify-end mt-2">
          <div className="bg-white rounded-full px-2 py-1 flex items-center gap-1">
            <div className="h-3 bg-gray-200 rounded w-8"></div>
            <RefreshCw size={12} className="text-gray-300" />
          </div>
        </div>
      </div>

      {/* Goal tracker */}
      <div className="bg-white rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center mb-1">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mb-1">
          <div className="h-full bg-gray-300 rounded-full w-1/4"></div>
        </div>
        <div className="flex justify-between text-xs">
          <div className="h-3 bg-gray-200 rounded w-4"></div>
          <div className="h-3 bg-gray-200 rounded w-8"></div>
        </div>
      </div>

      {/* Contribution stats */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <div className="h-4 bg-gray-300 rounded w-28 mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-12"></div>
        </div>
        {/* <div className="text-right">
          <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
          <div className="h-5 bg-gray-300 rounded w-8"></div>
        </div> */}
      </div>

      {/* Action buttons */}
      <div className="bg-white rounded-lg p-3 flex items-center justify-center gap-2">
        <div className="h-4 bg-gray-200 rounded w-12"></div>
        <ArrowDown className="text-gray-300" size={16} />
      </div>
    </div>
  );
}

function GroupInfoSkeleton() {
  return (
    <>
      {/* First row */}
      <div className="grid grid-cols-2 gap-4 mb-4 animate-pulse">
        <div className="bg-white rounded-xl p-4 border border-[#CBD5E1]">
          <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
          <div className="h-5 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#CBD5E1]">
          <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
          <div className="h-5 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-2 gap-4 mb-4 animate-pulse">
        <div className="bg-white rounded-xl p-4 border border-[#CBD5E1]">
          <div className="h-4 bg-gray-200 rounded w-28 mb-1"></div>
          <div className="h-5 bg-gray-200 rounded w-12"></div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#CBD5E1]">
          <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
          <div className="h-5 bg-gray-200 rounded w-14"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 animate-pulse">
        <div className="bg-white rounded-xl p-4 border border-[#CBD5E1]">
          <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
          <div className="h-5 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#CBD5E1]">
          <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
          <div className="h-5 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      {/* Third row */}
      <div className="grid grid-cols-2 gap-4 mb-6 animate-pulse">
        <div className="bg-white rounded-xl p-4 border border-[#CBD5E1]">
          <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
          <div className="h-5 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="bg-white rounded-xl p-4">
          <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex items-center">
              <div className="h-3 bg-gray-200 rounded w-6 mr-1"></div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoSkeleton() {
  return (
    <div className="bg-orange-100 rounded-xl p-4 mb-6 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="bg-orange-200 rounded-full p-2">
          <div className="w-5 h-5 bg-orange-300 rounded"></div>
        </div>
        <div className="flex-1">
          <div className="h-5 bg-orange-200 rounded w-48 mb-1"></div>
          <div className="h-4 bg-orange-200 rounded w-64"></div>
        </div>
      </div>
    </div>
  );
}

function NextSavingDateSkeleton() {
  return (
    <div className="bg-blue-50 rounded-xl p-4 mb-6 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 rounded-full p-2">
          <Calendar size={20} className="text-blue-300" />
        </div>
        <div>
          <div className="h-4 bg-blue-200 rounded w-36 mb-1"></div>
          <div className="h-5 bg-blue-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}

// Main combined skeleton component
export default function GroupDetailsSkeleton({
  showInfo = true,
}: {
  showInfo?: boolean;
}) {
  return (
    <div className="space-y-0">
      <GroupSavingsCardSkeleton />
      {showInfo && <InfoSkeleton />}
      <GroupInfoSkeleton />
      <NextSavingDateSkeleton />
    </div>
  );
}

// Export individual components for granular loading
export {
  GroupSavingsCardSkeleton,
  GroupInfoSkeleton,
  InfoSkeleton,
  NextSavingDateSkeleton,
};
