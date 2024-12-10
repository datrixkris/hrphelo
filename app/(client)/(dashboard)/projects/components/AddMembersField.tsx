import SearchAndResultsInputComponent from "@/app/components/SearchAndResultsInputComponent";
import React, { useEffect, useState } from "react";
import { useStaffStore } from "../../staff/staff-store";

interface Data {
  name: string;
  id: number;
  selected: boolean;
}

const AddMembersField = ({
  getIds, //function to get selected members ids in parent component
  multiple = false, //allows for selecting multiple members, defaults at false
  showAvatars = true, //allows component to show selected members avatars
  selectedIds, //all member id's that are already selected.
  // excludedIds, // ids that shouldn't be part of the data list
}: {
  getIds: (ids: number[]) => void;
  multiple?: boolean;
  showAvatars?: boolean;
  selectedIds?: number[];
  excludedIds?: number[];
}) => {
  const loading = useStaffStore((state) => state.loading);
  const fetchStaff = useStaffStore((state) => state.fetchStaff);
  const staffs = useStaffStore((state) => state.staffs);
  const [data, setData] = useState<Data[] | []>([]); //data to be used for this component

  useEffect(() => {
    const fetchData = async () => {
      console.log(selectedIds);
      // fetch staff data if staff lenght is empty and transform and set data
      if (staffs.length === 0) {
        await fetchStaff();
        setData(transformData());
      } else {
        setData(transformData());
      }
      // pass all selected ids in an array to the parent component
      getIds(data.filter((item) => item.selected).map((item) => item.id));
    };
    fetchData();
  }, [fetchStaff, staffs.length]);

  const transformData = () => {
    return useStaffStore.getState().staffs.map((item) => {
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
    });
  };

  //   this effect sends array of id's to the parent component whenever data changes
  useEffect(() => {
    getIds(data.filter((item) => item.selected).map((item) => item.id));
    console.log(data);
    // console.log(data.filter((item) => item.selected).map((item) => item.id));
  }, [data]);

  // useEffect(() => {
  //   setData((prevData) =>
  //     prevData.filter((item) => {
  //       //filter the returned data array and take out all items in the excluded array
  //       if (excludedIds) {
  //         if (!excludedIds.includes(item.id)) {
  //           return item;
  //         }
  //       }
  //     }),
  //   );
  // }, []);

  function changeDataState(newItem: Data) {
    // replace item with new item...
    if (multiple) {
      setData((prevData) =>
        prevData.map((item) => (item.id === newItem.id ? newItem : item)),
      );
    } else {
      // replace item with new item but set selected to false first
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
                  {!multiple && <p className="text-xs">{staff.name}</p>}
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
