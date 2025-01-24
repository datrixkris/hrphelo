import TableSkeleton from "@/app/components/TableSkeleton";
import React, { useEffect } from "react";
import DesignationTable from "./DesignationTable";
import { useDesignationStore } from "../designations-store";

const DesignationList = () => {
  const { designations, loading, fetchDesignations } = useDesignationStore();

  useEffect(() => {
    fetchDesignations();
  }, [fetchDesignations]);

  return (
    <div>
      <div className="">
        {designations.length < 1 && loading ? (
          <div className="rounded text-center">
            <TableSkeleton />
          </div>
        ) : designations.length > 0 ? (
          <DesignationTable designations={designations} />
        ) : (
          <div className="rounded py-20 text-center">No data available</div>
        )}
      </div>
    </div>
  );
};

export default DesignationList;
