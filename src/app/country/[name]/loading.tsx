import { Skeleton } from "@/components/ui/skeleton";

export default function CountryDetailsSkeleton() {
  return (
    <section className="bg-dark border-mutedGray border max-w-2xl sm:rounded-xl mx-auto">
      <article>
        <header className="space-y-5 mb-5 p-2">
          {/* Flag Skeleton */}
          <Skeleton className="rounded-sm size-[100px] sm:w-56 sm:h-36 sm:rounded-xl sm:-mt-12 mx-auto" />

          {/* Country Name Skeleton */}
          <div className="text-center space-y-2">
            <Skeleton className="h-6 w-32 mx-auto" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>

          {/* Stats Skeleton */}
          <div className="flex justify-evenly text-xs flex-wrap gap-2 sm:text-base">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>
        </header>

        {/* Details List Skeleton */}
        <ul className="text-xs sm:text-base space-y-4 px-2 sm:px-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <li
              key={i}
              className="flex justify-between border-t-2 border-grayishDark py-2 sm:py-5"
            >
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
            </li>
          ))}
        </ul>

        {/* Neighboring Countries Skeleton */}
        <li className="grid border-t-2 border-grayishDark py-2 px-2 sm:px-5 sm:py-5 gap-2">
          <Skeleton className="h-4 w-40" />
          <ul className="flex gap-2 flex-wrap">
            {Array.from({ length: 3 }).map((_, i) => (
              <li key={i} className="space-y-2">
                <Skeleton className="rounded-sm size-[60px] sm:w-20 mx-auto" />
                <Skeleton className="h-4 w-20 mx-auto" />
              </li>
            ))}
          </ul>
        </li>
      </article>
    </section>
  );
}
