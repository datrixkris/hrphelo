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
}: {
  getIds: (ids: (number | undefined)[]) => void;
  multiple?: boolean;
}) => {
  const loading = useStaffStore((state) => state.loading);
  const fetchStaff = useStaffStore((state) => state.fetchStaff);
  const staffs = useStaffStore((state) => state.staffs);
  const [data, setData] = useState<Data[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (staffs.length === 0) {
        await fetchStaff();
        setData(() =>
          useStaffStore.getState().staffs.map((item) => ({
            name: item.name,
            id: item.id,
            selected: false,
          })),
        );
      } else {
        setData(() =>
          useStaffStore.getState().staffs.map((item) => ({
            name: item.name,
            id: item.id,
            selected: false,
          })),
        );
      }
    };

    fetchData();
  }, [fetchStaff, staffs.length]);

  //   this effect sends array of id's to the parent component
  useEffect(() => {
    getIds(
      data.map((item) => {
        console.log([item.selected, item.id]);
        if (item.selected) {
          return item.id;
        }
      }),
    );
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
    <div className="grid grid-cols-2 place-content-center gap-5">
      <SearchAndResultsInputComponent
        loading={loading}
        data={data}
        onSelected={(newItem) => changeDataState(newItem)}
      />

      <div className="avatar-group -space-x-6 rtl:space-x-reverse">
        {staffs.map((staff) => {
          if (
            data.some((item) => {
              return item.selected ? item.id === staff.id : false;
            })
          ) {
            return (
              <div key={staff.id} className="avatar">
                <div className="w-10 rounded-full">
                  <img src={staff.image} />
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default AddMembersField;
