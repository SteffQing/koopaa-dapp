export default function ParticipantsListSkeleton({ count = 5 }) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, idx) => (
        <div key={idx} className="bg-white rounded-xl p-4 animate-pulse">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              {/* Avatar skeleton */}
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>

              <div>
                <div className="flex items-center">
                  {/* Name skeleton */}
                  <div className="h-5 bg-gray-200 rounded w-24"></div>

                  {/* Admin badge skeleton (randomly show/hide) */}
                  {idx % 3 === 0 && (
                    <div className="ml-2 h-4 bg-orange-100 rounded w-12"></div>
                  )}
                </div>

                <div className="flex items-center mt-1">
                  {/* Position skeleton */}
                  <div className="h-3 bg-gray-200 rounded w-6"></div>
                  <div className="h-3 bg-gray-200 rounded w-32 ml-1"></div>
                </div>
              </div>
            </div>

            {/* Status button skeleton */}
            <div className="h-7 bg-gray-200 rounded-md w-20"></div>
          </div>

          {/* Collection date skeleton */}
          <div className="h-4 bg-gray-200 rounded w-40"></div>
        </div>
      ))}
    </div>
  );
}
