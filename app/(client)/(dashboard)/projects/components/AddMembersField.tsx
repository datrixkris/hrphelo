import SearchAndResultsInputComponent from "@/app/components/SearchAndResultsInputComponent";
import React, { useEffect, useState } from "react";
import { useStaffStore } from "../../staff/staff-store";

interface Data {
  name: string;
  id: number;
  selected: boolean;
}

const AddMembersField = ({
  getIds,
  multiple = false,
  showAvatars = true,
  selectedIds,
}: {
  getIds: (ids: (number | undefined)[]) => void;
  multiple?: boolean;
  showAvatars?: boolean;
  selectedIds?: number[];
}) => {
  const loading = useStaffStore((state) => state.loading);
  const fetchStaff = useStaffStore((state) => state.fetchStaff);
  const staffs = useStaffStore((state) => state.staffs);
  const [data, setData] = useState<Data[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(selectedIds);
      if (staffs.length === 0) {
        await fetchStaff();
        setData(() =>
          useStaffStore.getState().staffs.map((item) => {
            // first check if some id's have already been selected
            if (selectedIds) {
              // make all selected ids true
              if (selectedIds.includes(item.id)) {
                return {
                  name: item.name,
                  id: item.id,
                  selected: true,
                };
              }
              return {
                name: item.name,
                id: item.id,
                selected: false,
              };
            }
            // if there are no selected ids
            return {
              name: item.name,
              id: item.id,
              selected: false,
            };
          }),
        );
      } else {
        setData(() =>
          useStaffStore.getState().staffs.map((item) => {
            // first check if some id's have already been selected
            if (selectedIds) {
              // make all selected ids true
              if (selectedIds.includes(item.id)) {
                return {
                  name: item.name,
                  id: item.id,
                  selected: true,
                };
              }
              return {
                name: item.name,
                id: item.id,
                selected: false,
              };
            }
            // if there are no selected ids
            return {
              name: item.name,
              id: item.id,
              selected: false,
            };
          }),
        );
      }
      // pass all selected ids in an array to the parent component
      getIds(data.filter((item) => item.selected).map((item) => item.id));
    };
    fetchData();
  }, [fetchStaff, staffs.length]);

  //   this effect sends array of id's to the parent component
  useEffect(() => {
    getIds(data.filter((item) => item.selected).map((item) => item.id));
    console.log(data);
    // console.log(data.filter((item) => item.selected).map((item) => item.id));
  }, [data]);

  function changeDataState(newItem: Data) {
    if (multiple) {
      setData((prevData) =>
        prevData.map((item) => (item.id === newItem.id ? newItem : item)),
      );
    } else {
      setData((prevData) =>
        prevData.map((item) => {
          // Set all selected to false
          item.selected = false;

          // Replace object if id matches
          if (item.id === newItem.id) {
            return newItem; // Return the new object if the id matches
          }

          return item; // Return the updated item
        }),
      );
    }

    console.log(
      data.map((item) => {
        // if (item.selected) {
        return [item.id, item.selected];
        // }
      }),
    );
  }

  return (
    <div className={`grid gap-5`}>
      <SearchAndResultsInputComponent
        loading={loading}
        data={data}
        onSelected={(newItem) => changeDataState(newItem)}
      />

      {showAvatars && (
        <div className="-space-x-4 rtl:space-x-reverse">
          {staffs.map((staff) => {
            if (
              data.some((item) => {
                return item.selected ? item.id === staff.id : false;
              })
            ) {
              return (
                <div className="tooltip" data-tip={staff.name} key={staff.id}>
                  <div className="avatar">
                    <div className="w-11 rounded-full border">
                      <img src={staff.image} alt={staff.name} />
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default AddMembersField;
