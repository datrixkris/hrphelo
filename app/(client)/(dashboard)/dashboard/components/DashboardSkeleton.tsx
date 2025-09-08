"use client";
import React from "react";

const SkeletonBar = ({ className = "" }: { className?: string }) => (
  <div className={`skeleton ${className}`}></div>
);

const SkeletonCard = ({ children }: { children?: React.ReactNode }) => (
  <div className="rounded-md bg-base-100 p-3">
    {children ?? (
      <div className="space-y-3">
        <SkeletonBar className="h-4 w-1/3" />
        <div className="flex items-end justify-between">
          <SkeletonBar className="h-7 w-16" />
          <SkeletonBar className="h-3 w-10" />
        </div>
      </div>
    )}
  </div>
);

const SkeletonButton = () => (
  <div className="btn btn-neutral flex h-20 items-center gap-2 py-4 text-lg">
    <SkeletonBar className="h-6 w-6 rounded-full" />
    <SkeletonBar className="h-4 w-28" />
  </div>
);

const ChartSkeleton = () => (
  <SkeletonCard>
    <div className="mb-5 space-y-1">
      <SkeletonBar className="h-4 w-1/3" />
      <SkeletonBar className="h-3 w-1/2" />
    </div>
    <div className="flex gap-3">
      <div className="w-[40%] space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div className="flex items-center gap-2" key={i}>
            <SkeletonBar className="h-3 w-3 rounded-full" />
            <SkeletonBar className="h-3 w-32" />
          </div>
        ))}
      </div>
      <div className="flex w-[60%] items-center justify-center py-2">
        <div className="skeleton h-32 w-32 rounded-full" />
      </div>
    </div>
  </SkeletonCard>
);

const TableSkeleton = ({ rows = 4 }: { rows?: number }) => (
  <SkeletonCard>
    <div className="mb-5 space-y-1">
      <SkeletonBar className="h-4 w-1/3" />
      <SkeletonBar className="h-3 w-1/2" />
    </div>
    <div className="overflow-x-auto">
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-3">
          <SkeletonBar className="h-3 w-full" />
          <SkeletonBar className="h-3 w-full" />
          <SkeletonBar className="h-3 w-full" />
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div className="grid grid-cols-3 gap-3" key={i}>
            <SkeletonBar className="h-3 w-full" />
            <SkeletonBar className="h-3 w-full" />
            <SkeletonBar className="h-3 w-full" />
          </div>
        ))}
      </div>
    </div>
  </SkeletonCard>
);

const SectionHeaderSkeleton = ({
  titleWidth = "w-48",
}: {
  titleWidth?: string;
}) => (
  <div className="space-y-2">
    <SkeletonBar className={`h-6 ${titleWidth}`} />
  </div>
);

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      {/* <div>
        <SkeletonBar className="h-7 w-80" />
        <SkeletonBar className="mt-2 h-4 w-96" />
      </div> */}

      {/* Company Overview */}
      <div>
        <SectionHeaderSkeleton />

        <div className="mt-5">
          <SkeletonBar className="mb-2 h-5 w-40" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 2xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCard key={`co-kpi-${i}`} />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <SkeletonBar className="mb-2 h-5 w-40" />
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonButton key={`co-action-${i}`} />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <SkeletonBar className="mb-2 h-5 w-40" />
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <ChartSkeleton key={`co-chart-${i}`} />
            ))}
          </div>
        </div>
      </div>

      <hr />

      {/* Staff Overview */}
      <div>
        <SectionHeaderSkeleton />

        <div className="mt-5">
          <SkeletonBar className="mb-2 h-5 w-40" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={`so-kpi-${i}`} />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <SkeletonBar className="mb-2 h-5 w-40" />
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonButton key={`so-action-${i}`} />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <SkeletonBar className="mb-2 h-5 w-40" />
          <div className="grid grid-cols-2 gap-4">
            <TableSkeleton rows={5} />
            <TableSkeleton rows={5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
