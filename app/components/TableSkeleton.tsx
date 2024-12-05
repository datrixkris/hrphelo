import React from "react";

const TableSkeleton = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table bg-base-100">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>
                {" "}
                <p className="skeleton h-4 w-20"></p>
              </th>
              <th>
                {" "}
                <p className="skeleton h-4 w-20"></p>
              </th>
              <th>
                {" "}
                <p className="skeleton h-4 w-20"></p>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {[...Array(4)].map((_, index) => (
              <tr key={index}>
                <th>
                  {" "}
                  <p className="skeleton h-4"></p>
                </th>
                <td>
                  <p className="skeleton h-4"></p>
                </td>
                <td>
                  {" "}
                  <p className="skeleton h-4"></p>
                </td>
                <td>
                  {" "}
                  <p className="skeleton h-4"></p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
