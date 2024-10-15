import axiosInstance from "@/lib/axios-instance.ts";
import { URL_CONSTANTS } from "@/shared/constants";
import { useCallback, useEffect, useState } from "react";

import { User } from "@/shared/types";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchCurrentUser = useCallback(async () => {
    const { status, data } = await axiosInstance.get(URL_CONSTANTS.currentUser);

    if (status === 200) {
      setUser(data);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return { user };
};
