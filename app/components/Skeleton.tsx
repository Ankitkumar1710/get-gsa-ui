export default function Skeleton() {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4" />
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        </div>
      ))}
    </div>
  );
}
