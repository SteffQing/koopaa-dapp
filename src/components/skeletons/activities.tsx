function SkeletonActivity({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="flex flex-col gap-1">
                <div className="w-24 h-3 bg-gray-200 rounded" />
                <div className="w-16 h-2 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="w-12 h-3 bg-gray-200 rounded" />
          </div>
          {i !== count - 1 ? (
            <span className="w-full h-[1px] bg-[#E6E6E6] my-1" />
          ) : (
            <span className="mb-1" />
          )}
        </div>
      ))}
    </div>
  );
}
