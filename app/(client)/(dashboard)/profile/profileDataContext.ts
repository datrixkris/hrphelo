import { createContext, useContext } from "react";
import { StaffProfile } from "../staff/types";

interface ProfileDataTypes {
  profileData: StaffProfile | null;
  refreshData: () => void;
}

export const ProfileDataContext = createContext<ProfileDataTypes | null>(null);

export const useProfileDataContext = () => {
  if (!ProfileDataContext) {
    throw new Error(
      "ProfileDataContext is null. Ensure a Provider is wrapping the component.",
    );
  }

  return useContext(ProfileDataContext);
};
