function Skeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      {/* Header skeleton */}
      <div className="h-24 bg-gray-200 relative">
        <div className="absolute bottom-3 left-3">
          <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>
      </div>

      <div className="p-4">
        {/* Description skeleton */}
        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
            <div className="h-5 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="text-right">
            <div className="h-3 bg-gray-200 rounded w-16 mb-1 ml-auto"></div>
            <div className="h-5 bg-gray-200 rounded w-8 ml-auto"></div>
          </div>
        </div>

        {/* Participants skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white"
                ></div>
              ))}
            </div>
            <div className="h-4 bg-gray-200 rounded w-16 ml-3"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        </div>
      </div>
    </div>
  );
}

export default function GroupCardSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} />
      ))}
    </>
  );
}
