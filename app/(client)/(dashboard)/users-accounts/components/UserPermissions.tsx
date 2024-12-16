import React, { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import TableSkeleton from "@/app/components/TableSkeleton";
import { useUserAccountStore } from "../user-account-store";
// import { UserModules } from "../types";
// import { useForm } from "react-hook-form";

const UserPermissions = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { fetchModules, loading, modules } = useUserAccountStore();

  useEffect(() => {
    const gettingModules = async () => {
      setErrorMessage("");
      if (modules.length === 0) {
        await fetchModules();
      }
      if (useUserAccountStore.getState().error) {
        setErrorMessage("Couldn't fetch modules");
      }
    };
    gettingModules();
  }, []);
  return (
    <div>
      {/* module form */}
      {loading && errorMessage === "" ? (
        <div>
          <TableSkeleton />
        </div>
      ) : errorMessage !== "" ? (
        <div className="text-center">{errorMessage}</div>
      ) : (
        <form action="">
          {/* table */}
          <div className="overflow-x-auto">
            <table className="table border">
              <tbody>
                {/* row 1 */}
                {modules &&
                  modules.map((item) => (
                    <tr key={item.id}>
                      {/* toggle */}
                      <td>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={item.name}
                            className="toggle toggle-sm"
                          />
                          <label
                            htmlFor={item.name}
                            className="text-hr font-normal"
                          >
                            {item.name}
                          </label>
                        </div>
                      </td>

                      {/* read */}
                      <td>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="read"
                            className="checkbox checkbox-sm"
                          />
                          <label htmlFor="read" className="text-hr font-normal">
                            Read
                          </label>
                        </div>
                      </td>
                      {/* create */}
                      <td>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="create"
                            className="checkbox checkbox-sm"
                          />
                          <label
                            htmlFor="create"
                            className="text-hr font-normal"
                          >
                            Create
                          </label>
                        </div>
                      </td>
                      {/* modify */}
                      <td>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="modify"
                            className="checkbox checkbox-sm"
                          />
                          <label
                            htmlFor="modify"
                            className="text-hr font-normal"
                          >
                            Modify
                          </label>
                        </div>
                      </td>
                      {/* delete */}
                      <td>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="delete"
                            className="checkbox checkbox-sm"
                          />
                          <label
                            htmlFor="delete"
                            className="text-hr font-normal"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="!mt-10">
            <Button className="mx-auto w-1/2">Save</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserPermissions;
